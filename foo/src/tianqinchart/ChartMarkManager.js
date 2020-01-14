import {
  ChartMarkLine,
  ChartMarkRect,
  ChartMarkArrow,
  ChartMarkText
} from './ChartMark'

class ChartMarkManager {
  constructor (chart) {
    this.chart = chart
    this.marks = {}
  }

  addMark (opts) {
    opts.id = opts.id || (new Date().getTime())
    if (this.marks[opts.id]) {
      this.marks[opts.id].update(opts)
    } else {
      opts.chart = opts.chart || this.chart
      opts.boardId = opts.boardId || 'main'
      opts.board = opts.board || this.chart.boards[opts.boardId]
      opts.yAlign = opts.yAlign || 'right'
      if (opts.type === 'line') {
        this.marks[opts.id] = new ChartMarkLine(opts)
      } else if (opts.type === 'rect') {
        this.marks[opts.id] = new ChartMarkRect(opts)
      } else if (opts.type === 'arrow') {
        this.marks[opts.id] = new ChartMarkArrow(opts)
      } else if (opts.type === 'text') {
        this.marks[opts.id] = new ChartMarkText(opts)
      } else {
        this.chart.tqChartConsole.error(`未支持 ${opts.type} 类型标记，[line|rect|arrow|text]`)
      }
    }
    return this.marks[opts.id]
  }

  removeMarkAll () {
    for (const key in this.marks) {
      this.marks[key].remove()
      delete this.marks[key]
    }
  }

  removeMark (id) {
    if (this.marks[id]) this.marks[id].remove()
    delete this.marks[id]
  }

  showMark (id) {
    this.marks[id].show()
  }

  hideMark (id) {
    this.marks[id].hide()
  }

  draw () {
    const klines = this.chart.mainSeries
    let [l, r] = [this.chart.range.leftId, this.chart.range.rightId]
    r = klines.data[r] ? r : klines.last_id
    if (klines.data[l] && klines.data[r]) {
      const leftDt = klines.data[l].datetime
      const rightDt = klines.data[r].datetime
      for (const key in this.marks) {
        const mark = this.marks[key]
        if (mark.type === 'arrow') {
          if (mark.dt1 >= leftDt && mark.dt1 <= rightDt) {
            const klineId = this.marks[key].revertDtToId(mark.dt1)
            this.marks[key].x1 = klineId
            this.marks[key].y1 = this.marks[key].direction === 'up' ? klines.data[klineId].low : klines.data[klineId].high
            this.marks[key].draw()
          } else {
            this.marks[key].hide()
          }
        } else {
          this.marks[key].draw()
        }
      }
    }
  }
}

export default ChartMarkManager
