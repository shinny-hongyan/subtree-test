import * as d3 from 'd3'

class YAxis {
  constructor (board, align) {
    this.board = board
    this.align = align

    this.yScale = d3.scaleLinear().range([this.board.height, 0])
    this.yAxis = align === 'left' ? d3.axisLeft() : d3.axisRight()
    this.yAxis.scale(this.yScale)
    this._init()
  }

  _init () {
    this.rootG = this.board.rootG.append('g').attr('class', 'y axis ' + this.align)
    this.resetPosition()
  }

  // 图表宽度 = board宽度 改变的时候调用
  // 图表高度 = board高度 改变的时候调用
  resetPosition () {
    this.yScale.range([this.board.height, 0])
    if (this.align === 'right') {
      this.rootG.attr('transform', 'translate(' + this.board.width + ',0)')
    }
  }

  getTicks () {
    const result = []
    const that = this
    this.rootG.selectAll('.tick').each(function (data) {
      result.push(Math.round(that.yScale(data)))
    })
    return result
  }

  // board draw 用来绘制 YAxis
  draw (domain) { // 绘制Y轴的范围
    this.yScale.domain(domain)
    this.yAxis.ticks(this.board.boardId === 'main' ? 6 : 3)
    this.rootG.call(this.yAxis)
  }
}

export default YAxis
