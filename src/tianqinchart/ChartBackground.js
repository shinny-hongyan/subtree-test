class ChartBackground {
  constructor (tqchart, parentSvg, direction = 'vertical', board) {
    // 背景格子 竖线
    this.tqchart = tqchart
    this.parentSvg = parentSvg
    this.board = board
    this.rootG = this.parentSvg.append('g').attr('class', 'background')
    this.direction = direction //  vertical | horizontal
    if (this.direction === 'horizontal') {
      this.rootG.append('line')
        .attr('class', 'border')
        .attr('x1', -this.tqchart.margin.left)
        .attr('y1', -0.5)
        .attr('x2', this.tqchart.innerWidth + this.tqchart.margin.right)
        .attr('y2', -0.5)
    }
  }

  clear () {
    this.rootG.selectAll('line').remove()
  }

  draw () {
    if (this.direction === 'vertical') {
      const ticks = this.tqchart.xAxis.getTicks()
      this._drawVerticalLines(ticks)
    } else if (this.direction === 'horizontal') {
      const ticks = this.board.rightYAxis.getTicks()
      this._drawHorizontalLines(ticks)
    }
  }

  resize () {
    if (this.direction === 'vertical') {
      this.rootG.selectAll('line').attr('y2', this.tqchart.innerHeight)
    } else if (this.direction === 'horizontal') {
      this.rootG.selectAll('line').attr('x2', this.tqchart.innerWidth)
    }
  }

  _drawVerticalLines (data) {
    const height = this.tqchart.innerHeight
    const selections = this.rootG.selectAll('line.bgline').data(data)
    selections
      .enter()
      .append('line')
      .attr('class', 'bgline')
      .attr('y1', 0)
      .attr('y2', height)
      .merge(selections)
      .attr('x1', (d) => d)
      .attr('x2', (d) => d)
    selections.exit().remove()
  }

  _drawHorizontalLines (data) {
    const width = this.tqchart.innerWidth
    const selections = this.rootG.selectAll('line.bgline').data(data)
    selections
      .enter()
      .append('line')
      .attr('class', 'bgline')
      .attr('x1', 0)
      .attr('x2', width)
      .merge(selections)
      .attr('y1', (d) => d + 0.5)
      .attr('y2', (d) => d + 0.5)
    selections.exit().remove()
  }
}

export default ChartBackground
