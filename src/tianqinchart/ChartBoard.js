import YAxis from './YAxis' // 图表中间间隔

import ChartBackground from './ChartBackground'
const PLOT_PADDING = 2
class ChartBoard {
  constructor (chart, boardId, top, height, hasLeftYAxis) {
    this.tqchart = chart
    this.boardId = boardId
    this.top = top
    this.height = height
    this.width = this.tqchart.innerWidth

    // 当前 board 的根结点
    //    包含 plotG --- 放置主要图形
    //    包含 markG --- 放置标识层
    //    包含 leftYAxis / rightYAxis
    // 拖动图表时，* 不足以移动一根柱子时 --> 只移动 plotG markG
    //           * 需要移动柱子时 --> 移动 plotG markG && YAxis 缩放

    this.rootG = this.tqchart.rootG
      .append('g')
      .attr('class', this.boardId)
      .attr('transform', 'translate(0,' + this.top + ')')

    this.background = new ChartBackground(this.tqchart, this.rootG, 'horizontal', this)

    this.plotG = this.rootG
      .append('g')
      .attr('class', this.boardId + ' plots')

    // 当前 board 放置标志的层
    this.maskG = this.rootG.append('mask').attr('id', 'mask-' + this.boardId)
      .append('rect')
      .attr('x', '0').attr('y', '0')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('fill', '#FFFFFF')
      .attr('stroke', 'none')
    this.markG = this.rootG
      .append('g')
      .attr('mask', 'url(#' + 'mask-' + this.boardId + ')')
      .attr('class', this.boardId + ' marks')

    // 初始化 Y 轴
    this.leftYAxis = new YAxis(this, 'left')
    this.rightYAxis = new YAxis(this, 'right')
  }

  // board 位置 大小 改变的时候调用
  resetPosition ({ top = this.top, height = this.height } = {}) {
    // top 改变
    this.top = top
    this.rootG.attr('transform', 'translate(0,' + this.top + ')')
    // height width 改变的时候
    this.height = height
    this.width = this.tqchart.innerWidth
    this.maskG.attr('width', this.width).attr('height', this.height)
    this.background.resize()
    if (this.leftYAxis) this.leftYAxis.resetPosition()
    this.rightYAxis.resetPosition()
  }

  setDomain (domain, align = 'right') {
    this[align + 'Domain'] = domain
  }

  draw (l, r, data) {
    this.leftYAxis.draw(this.leftDomain)
    this.rightYAxis.draw(this.rightDomain)
    this.background.draw()
  }

  remove () {
    this.rootG.remove()
  }

  static GetMutilPlotsHeight (plotsNumber, height) {
    // 根据总高度和图表间隔返回每个部分的高度
    const avalibleHeight = height - PLOT_PADDING * (plotsNumber - 1)
    const avg = 1 / plotsNumber

    const othersHeight = Math.ceil(avalibleHeight * avg * 0.7)
    const firstHeight = avalibleHeight - othersHeight * (plotsNumber - 1)

    const positions = [{
      top: 0,
      height: firstHeight
    }]
    for (let i = 1; i < plotsNumber; i++) {
      positions[i] = {
        height: othersHeight,
        top: positions[i - 1].top + positions[i - 1].height + PLOT_PADDING
      }
    }
    return positions
  }
}

export default ChartBoard
