import * as d3 from 'd3'
// import { FormatPrice } from '@/plugins/utils'
function FormatPrice (price, priceDecs = 2) {
  const n = Number(price)
  const decs = Number.isInteger(priceDecs) ? priceDecs : 2
  return Number.isFinite(n) ? n.toFixed(decs) : price
}

class Crosshair {
  constructor (chart) {
    this.tqchart = chart

    // 覆盖整个 chart.svg
    this.svgG = this.tqchart.svg
      .append('g')
      .attr('class', 'crosshair-container')
      .attr('visibility', 'hidden')

    // 覆盖 chart.rootG
    this.rootG = this.svgG
      .append('g')
      .attr('class', 'crosshair-content')
      .attr('transform', 'translate(' + this.tqchart.margin.left + ',' + this.tqchart.margin.top + ')')

    // 矩形框，鼠标样式在此矩形框上面改变
    this.rectG = this.rootG
      .append('rect')
      .attr('class', 'crosshair-cursor')
      .attr('width', this.tqchart.innerWidth)
      .attr('height', this.tqchart.innerHeight)

    // K线信息 kline panel
    this.klinePanel = this.svgG.append('g').attr('class', 'kline panel')
    this.klinePanelWidth = 100
    this.klinePanelHeight = 144
    this.klinePanelDefaultColor = '#333333'
    this.klinePanel.append('rect')
      .attr('x', 0.5)
      .attr('y', 0.5)
      .attr('width', this.klinePanelWidth)
      .attr('height', this.klinePanelHeight)
      .attr('stroke', '#DDDDDD')
    this.klinePanel.append('text')
      .attr('x', 0)
      .attr('y', 0)
    this._initCrosshairline()
    this._initAxisannotation()
  }

  _initCrosshairline () {
    this.rootG.append('g')
      .attr('class', 'crosshair horizontal')
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', this.tqchart.innerWidth)
      .attr('y2', 0)
      .attr('stroke', '#aaaaaa')
      .attr('stroke-dasharray', '2')
    this.rootG.append('g')
      .attr('class', 'crosshair vertical')
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', this.tqchart.innerHeight)
      .attr('stroke', '#aaaaaa')
      .attr('stroke-dasharray', '2')
  }

  _initAxisannotation () {
    this.rootG.append('g')
      .attr('class', 'axisannotation x')
      .attr('transform', 'translate(0,' + (this.tqchart.innerHeight + 2) + ')')
    this.rootG.append('g')
      .attr('class', 'axisannotation y left')
      .attr('transform', 'translate(-' + (this.tqchart.margin.left - 1) + ',0)')
    this.rootG.append('g')
      .attr('class', 'axisannotation y right')
      .attr('transform', 'translate(' + (this.tqchart.innerWidth + 1) + ',0)')

    this.rootG.select('g.axisannotation.x')
      .append('rect')
      .style('fill', '#eeeeee')
      .attr('opacity', '0.8')
      .attr('width', '120px')
      .attr('height', '14px')
    this.rootG.select('g.axisannotation.x')
      .append('text')
      .attr('x', 1)
      .attr('y', 12)

    this.rootG.select('g.axisannotation.y.left')
      .append('rect')
      .style('fill', '#FAFAFA')
      .attr('opacity', '0.9')
      .attr('width', this.tqchart.margin.left - 2)
      .attr('height', '16px')
    this.rootG.select('g.axisannotation.y.left')
      .append('text')
      .attr('x', this.tqchart.margin.left - 2)
      .attr('y', 13)
      .attr('text-anchor', 'end')

    this.rootG.select('g.axisannotation.y.right')
      .append('rect')
      .style('fill', '#FAFAFA')
      .attr('opacity', '0.9')
      .attr('width', this.tqchart.margin.right - 2)
      .attr('height', '16px')
    this.rootG.select('g.axisannotation.y.right')
      .append('text')
      .attr('x', 2)
      .attr('y', 13)
  }

  // 整个图表放大缩小的时候调用
  resize () {
    this.rectG.attr('width', this.tqchart.innerWidth)
      .attr('height', this.tqchart.innerHeight)
    this.rootG.select('g.crosshair.horizontal line')
      .attr('x2', this.tqchart.innerWidth)
    this.rootG.select('g.crosshair.vertical line')
      .attr('y2', this.tqchart.innerHeight)
    this.rootG.select('g.axisannotation.x')
      .attr('transform', 'translate(0,' + this.tqchart.innerHeight + ')')
    this.rootG.select('g.axisannotation.y.right')
      .attr('transform', 'translate(' + (this.tqchart.innerWidth + 1) + ',0)')
  }

  update (x, y) {
    // x y 相对于 rootG 的位置
    const xBarsNum = Math.floor(x / this.tqchart.bar.barWidth)
    const xAlign = xBarsNum * this.tqchart.bar.barWidth + this.tqchart.bar.barWidth / 2
    // 更新 水平线 垂直线
    this.rootG.select('g.crosshair.horizontal line').attr('y1', y + 0.5).attr('y2', y + 0.5)
    this.rootG.select('g.crosshair.vertical line').attr('x1', xAlign).attr('x2', xAlign)

    const mainSeries = this.tqchart.mainSeries
    if (mainSeries && mainSeries.last_id > -1 && mainSeries.data && this.tqchart.range.leftId > -1) {
      const id = this.tqchart.range.leftId + xBarsNum // 当前指向 id
      const data = mainSeries.data[id] // 当前指向 kline
      const preData = mainSeries.data[id - 1]
      if (!data) return
      this._updateKlinePanel(xAlign, data, preData) // 更新kline面板
      this._updateXAxisannotation(xAlign, data.datetime) // 更新 axisannotation x
      const board = this.tqchart.getBoardByYPosition(y)
      if (board) this._updateYAxisannotation(y, board) // 更新 axisannotation y
    }
  }

  _updateKlinePanel (x, data, preData) {
    const strs = [
      d3.timeFormat('%Y-%m-%d (%w)')(data.datetime / 1e6), // 0
      d3.timeFormat('%H:%M:%S')(data.datetime / 1e6), // 1
      '开盘', // 2
      FormatPrice(data.open, this.tqchart.price_decs), // 3
      '最高', // 4
      FormatPrice(data.high, this.tqchart.price_decs), // 5
      '最低', // 6
      FormatPrice(data.low, this.tqchart.price_decs), // 7
      '收盘', // 8
      FormatPrice(data.close, this.tqchart.price_decs), // 9
      '成交量', // 10
      data.volume, // 11
      '持仓量', // 12
      data.close_oi // 13
    ]
    let change = null
    if (preData && preData.close) {
      change = FormatPrice(data.close - preData.close, this.tqchart.price_decs)
      strs.push('涨跌') // 14
      strs.push(change) // 15
      strs.push('涨跌幅') // 16
      strs.push(FormatPrice(change / preData.close * 100, 2) + '%') // 17
    }
    const selections = this.klinePanel.select('text').selectAll('tspan').data(strs)
    selections.enter()
      .append('tspan')
      .merge(selections)
      .attr('x', (d, i) => (i > 1 && i % 2 === 1) ? this.klinePanelWidth - 1 : 1)
      .attr('dy', (d, i) => (i > 1 && i % 2 === 1) ? '0px' : '14px')
      .attr('text-anchor', (d, i) => (i > 1 && i % 2 === 1) ? 'end' : 'start')
      .attr('class', (d, i) => {
        if (i === 15 || i === 17) {
          if (change > 0) return 'up'
          if (change < 0) return 'down'
        }
        return ''
      })
      .text((d) => d)
      .exit().remove()

    let leftPadding = 2
    if (x < this.klinePanelWidth - this.tqchart.margin.left) {
      leftPadding = this.tqchart.outerWidth - 2 - this.klinePanelWidth
    }
    this.klinePanel.attr('transform', 'translate(' + leftPadding + ',0)')
  }

  _updateXAxisannotation (x, datetime) {
    this.rootG.select('g.axisannotation.x rect').attr('x', x - 40)
    this.rootG.select('g.axisannotation.x text')
      .text(d3.timeFormat('%Y-%m-%d %H:%M:%S')(datetime / 1e6))
      .attr('x', x - 38)
  }

  _updateYAxisannotation (y, board) {
    for (const align of ['left', 'right']) {
      const yAxis = board[align + 'YAxis']
      const selector = ['g', 'axisannotation', 'y', align].join('.')
      if (yAxis) {
        const val = FormatPrice(yAxis.yScale.invert(y - board.top), (board.boardId === 'main' && align === 'right' && this.tqchart.price_decs) ? this.tqchart.price_decs : 0)
        if (!Number.isNaN(val)) {
          this.rootG.select(selector).attr('visibility', 'visible')
          this.rootG.select(selector + ' rect').attr('y', y - 10)
          this.rootG.select(selector + ' text').text(val).attr('y', y + 2)
          continue
        }
      }
      this.rootG.select('g.axisannotation.y.left').attr('visibility', 'hidden')
    }
  }

  show () {
    this.svgG.attr('visibility', 'visible')
  }

  hide () {
    this.svgG.attr('visibility', 'hidden')
    this.rootG.selectAll('g.axisannotation.y').attr('visibility', 'hidden')
  }

  drag (draging) {
    if (draging) {
      this.rectG.attr('class', 'crosshair-cursor drag')
    } else {
      this.rectG.attr('class', 'crosshair-cursor')
    }
  }
}

export default Crosshair
