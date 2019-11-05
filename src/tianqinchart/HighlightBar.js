class HighlightBar {
  constructor (tqchart, id, klineId) {
    this.tqchart = tqchart
    this.id = id
    this.klineId = klineId
  }

  update (klineId) {
    this.klineId = klineId
  }

  resize () {
    this.g.attr('width', this.tqchart.bar.barWidth)
      .attr('height', this.tqchart.innerHeight)
  }

  draw () {
    if (!this.g) {
      this.g = this.tqchart.bgShapesG.append('rect')
        .attr('class', 'highlight')
        .attr('width', this.tqchart.bar.barWidth)
        .attr('height', this.tqchart.innerHeight)
    }
    const leftPx = this.tqchart.chartController.revertIdToPx(this.klineId)
    this.g.attr('transform', `translate(${leftPx},0)`)
  }

  clear () {
    this.g.remove()
  }
}

export default HighlightBar
