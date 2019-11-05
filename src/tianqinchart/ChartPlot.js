import { Bar, Candle, Line, Oi, Volume, Dot } from '../tianqinchart/ChartPath'

class ChartPlot {
  constructor ({
    chart,
    boardId,
    plotId = '',
    yAlign = 'right',
    type = 'candle',
    color = 'red',
    width = 2,
    dash = false,
    data
  } = {}) {
    this.chart = chart
    this.boardId = boardId
    this.plotId = plotId
    this.yAlign = yAlign
    this.board = this.chart.boards[boardId]
    // TODO data 属性放在 Plot 里面
    this.data = data

    this.type = type
    this.color = color
    this.width = Number.isFinite(width) ? Math.round(width) : 2
    this.dash = dash

    this.g = this.board.plotG
      .append('g')
      .attr('class', `plot ${this.boardId} ${this.plotId}`)

    this.path = null
    this._initPath()
  }

  _initPath () {
    switch (this.type) {
      case 'candle':
        this.path = new Candle({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        })
        break
      case 'volume':
        this.path = new Volume({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        })
        break
      case 'oi':
        this.path = new Oi({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        })
        break
      case 'dash':
        this.path = new Line({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        })
        break
      case 'line':
        this.path = new Line({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        })
        break
      case 'bar':
        this.path = new Bar({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        })
        break
      case 'dot':
        this.path = new Dot({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        })
        break
    }

    // append 相应的 paths 到 plot
    for (let i = 0; i < this.path.paths.length; i++) {
      this._appendPlotTypePath(this.path.paths[i])
    }
  }

  // classNames ['hij', 'foo']
  _appendPlotTypePath (classNames) {
    if (!Array.isArray(classNames)) classNames = classNames.split('.')
    this.g.selectAll(`path.${classNames.join('.')}`)
      .data(d => [d])
      .enter()
      .append('path')
      .attr('class', classNames.join(' '))
    if (this.type === 'line' || this.type === 'dash') {
      const color = typeof this.color === 'string' ? this.color : ''
      this.g.selectAll(`path.${classNames.join('.')}`)
        .style('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', this.width + 'px')
        .attr('stroke-dasharray', this.dash ? '4 4' : '0')
    } else if (this.type === 'bar') {
      this.g.selectAll(`path.${classNames.join('.')}`)
        .style('fill', this.color)
        .attr('stroke', 'none')
    } else if (this.type === 'dot') {
      this.g.selectAll(`path.${classNames.join('.')}`)
        .style('fill', this.color)
        .attr('stroke', 'none')
    }
  }

  getYDomain (l, r, data) {
    return this.path.getYDomain(l, r, data)
  }

  draw (l, r, data) {
    const paths = this.path.calcPaths(l, r, data)
    for (const key in paths) {
      try {
        this.g.select(`path.${key}`).attr('d', paths[key])
      } catch (error) {
        this.chart.tqChartConsole.error(error)
      }
    }
  }

  remove () {
    this.g.remove()
  }
}

export default ChartPlot
