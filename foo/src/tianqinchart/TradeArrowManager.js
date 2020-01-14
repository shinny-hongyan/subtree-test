class TradeArrowManager {
  constructor (tqchart) {
    this.tqchart = tqchart
    this._board = null
    this._g = null
    this.trades = {} // 记录全部交易记录 trade_id: {trade_id, trade_date_time, volume, direction, offset}
  }

  get board () {
    if (this._board === null) {
      this._board = this.tqchart.boards.main ? this.tqchart.boards.main : null
    }
    return this._board
  }

  get g () {
    if (this._g === null) {
      this._g = this.board.markG.append('g').attr('class', 'tradearrow')
    }
    return this._g
  }

  add (id, trade) {
    if (!this.trades[id]) {
      this.trades[id] = trade
    }
  }

  removeAll () {
    this.g.select('path').remove()
    for (const k in this.trades) {
      delete this.trades[k]
    }
  }

  revertValueToYPos (val) {
    return val && this.board.rightYAxis ? Math.round(this.board.rightYAxis.yScale(val)) : null
  }

  draw () {
    const _arrows = [] // 需要标记箭头的数组
    // 每个方向的箭头只标记一次， 这里记录已经标记过的id
    const upKlineIds = {}
    const downKlineIds = {}
    const klines = this.tqchart.mainSeries
    let [l, r] = [this.tqchart.range.leftId, this.tqchart.range.rightId]
    r = klines.data[r] ? r : klines.last_id
    if (!klines.data[l] || !klines.data[r]) return
    const [leftDt, rightDt] = [klines.data[l].datetime, klines.data[r].datetime]
    for (const tradeId in this.trades) {
      const trade = this.trades[tradeId]
      if (trade.trade_date_time >= leftDt && trade.trade_date_time <= rightDt + this.tqchart.duration) {
        const klineId = this.tqchart.chartController.revertDtToId(trade.trade_date_time, l, r)
        if (!klineId) continue
        // 略过已经标记过有箭头的 id
        if (trade.direction === 'BUY') {
          if (upKlineIds[klineId]) {
            upKlineIds[klineId].volume += trade.volume
          } else {
            const arr = {
              x: this.tqchart.chartController.revertIdToPx(klineId),
              y: this.revertValueToYPos(klines.data[klineId].low),
              dir: 'up',
              diff: trade.offset === 'OPEN' ? 0 : 0.5,
              width: this.tqchart.bar.barWidth,
              volume: trade.volume
            }
            upKlineIds[klineId] = arr
            _arrows.push(arr)
          }
        } else if (trade.direction === 'SELL') {
          if (downKlineIds[klineId]) {
            downKlineIds[klineId].volume += trade.volume
          } else {
            const arr = {
              x: this.tqchart.chartController.revertIdToPx(klineId),
              y: this.revertValueToYPos(klines.data[klineId].high),
              dir: 'down',
              diff: trade.offset === 'OPEN' ? 0 : 0.5,
              width: this.tqchart.bar.barWidth,
              volume: trade.volume
            }
            downKlineIds[klineId] = arr
            _arrows.push(arr)
          }
        }
      }
    }
    this.drawArrows(_arrows)
  }

  drawArrows (_arrows) {
    const selections = this.g.selectAll('path').data(_arrows)
    selections.enter()
      .append('path')
      .attr('class', d => d.dir)
      .attr('d', this.getArrowPath)
    selections.merge(selections)
      .attr('class', d => d.dir)
      .attr('d', this.getArrowPath)
    selections.exit().remove()
  }

  getArrowPath (d) {
    const neg = d.dir === 'up' ? 1 : -1
    const h = d.width
    const w = d.width
    const w3 = Math.round(w / 3)
    return `M ${d.x + w / 2} ${d.y} l ${-w / 2} ${neg * h / 2} l ${w3 - d.diff} 0 l 0 ${neg * h / 2} l ${w3} 0 l 0 ${-1 * neg * h / 2} l ${w3} 0 z`
  }
}
export default TradeArrowManager
