class PositionManager {
  constructor (tqchart) {
    this.tqchart = tqchart
    this._board = null
    this._g = null
    this.datetimeKeys = []
    this.positions = {} // 记录持仓序列 datetime: {datetime, volume_long, volume_short, volume, direction, offset}
  }

  get board () {
    if (this._board === null) {
      this._board = this.tqchart.boards.main ? this.tqchart.boards.main : null
    }
    return this._board
  }

  get g () {
    if (this._g === null) {
      this._g = this.board.markG.append('g').attr('class', 'posrect')
    }
    return this._g
  }

  add (dt, position) {
    if (!this.positions[dt]) {
      this.positions[dt] = position
      position.datetime = dt
      position.volume_net = position.volume_long - position.volume_short
      position.klineId = this.tqchart.chartController.revertDtToId(dt)
      this.datetimeKeys = Object.keys(this.positions).sort()
    }
  }

  removeAll () {
    this.g.select('rect').remove()
    for (const k in this.positions) {
      delete this.positions[k]
    }
  }

  getPostionKlineId (position) {
    if (position.klineId) return position.klineId
    position.klineId = this.tqchart.chartController.revertDtToId(position.datetime)
    return position.klineId
  }

  revertValueToYPos (val) {
    return val && this.board.rightYAxis ? Math.round(this.board.rightYAxis.yScale(val)) : null
  }

  draw () {
    const klines = this.tqchart.mainSeries
    let [l, r] = [this.tqchart.range.leftId, this.tqchart.range.rightId]
    r = klines.data[r] ? r : klines.last_id
    if (!klines.data[l] || !klines.data[r]) return
    const [leftDt, rightDt] = [klines.data[l].datetime, klines.data[r].datetime]
    const positionsRect = [] // 需要绘制的矩形
    for (let i = 1; i < this.datetimeKeys.length; i++) {
      const preDt = this.datetimeKeys[i - 1]
      const curDt = this.datetimeKeys[i]
      if (curDt < leftDt) continue
      if (leftDt > rightDt) break
      const prePos = this.positions[preDt]
      const curPos = this.positions[curDt]
      const preId = this.getPostionKlineId(prePos)
      const curId = this.getPostionKlineId(curPos)
      if (preId === null || curId === null) continue
      if (curId - preId > 1 && prePos.volume_net !== 0) {
        const priceDiff = klines.data[curId].close - klines.data[preId].open
        if (prePos.volume_net !== 0 && priceDiff !== 0) {
          const min = Math.min(klines.data[preId].low, klines.data[curId].low)
          const max = Math.max(klines.data[preId].high, klines.data[curId].high)
          const className = prePos.volume_net * priceDiff > 0 ? 'profit' : 'loss' // 矩形颜色，净持仓和价格变化的符号相同，那么red，否则green
          positionsRect.push({
            id: 'rect' + preId,
            x1: preId,
            y1: max,
            x2: curId + 1,
            y2: min,
            className: className,
            stroke: 'none'
          })
        }
      }
    }
    this.drawPosRect(positionsRect)
  }

  drawPosRect (_rects) {
    const selections = this.g.selectAll('rect').data(_rects)
    selections.enter()
      .append('rect')
      .attr('class', d => d.className)
      .attr('x', d => this.tqchart.chartController.revertIdToPx(d.x1))
      .attr('y', d => this.revertValueToYPos(d.y1))
      .attr('width', d => (d.x2 - d.x1) * this.tqchart.bar.barWidth)
      .attr('height', d => this.revertValueToYPos(d.y2) - this.revertValueToYPos(d.y1))
    selections.merge(selections)
      .attr('class', d => d.className)
      .attr('x', d => this.tqchart.chartController.revertIdToPx(d.x1))
      .attr('y', d => this.revertValueToYPos(d.y1))
      .attr('width', d => (d.x2 - d.x1) * this.tqchart.bar.barWidth)
      .attr('height', d => this.revertValueToYPos(d.y2) - this.revertValueToYPos(d.y1))
    selections.exit().remove()
  }
}
export default PositionManager
