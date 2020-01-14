/***
 * 标志一个点的位置可以有几种形式
 * -----------------------------------------------------
 * X 轴  优先级排列        Y 轴 优先级排列
 * -----------------------------------------------------
 * 1 xPos 坐标轴px      | 1 yPos 坐标轴px值
 * 2 x    柱子在id      | 2 y    y值,在k线图上就是价格
 * -----------------------------------------------------
 *
 * -----------------------------------------------------
 * 矩形 优先级
 * -----------------------------------------------------
 * 1 (x1,y1) + (width, height)
 * 2 (x1,y1) + (x2, y2)
 * -----------------------------------------------------
 * 支持 3 种类型 line  rect  arrow
 ***/

/**
 * ChartMark 两大类
 * a. 一个点决定位置 Text Arrow
 * b. 两个点决定位置 line rect
 */

class ChartMark {
  constructor ({
    id,
    chart,
    board,
    boardId,
    parentG,
    type,
    yAlign,
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    strokeOpacity,
    strokeDasharray
  } = {}) {
    this.id = id || (new Date().getTime())
    this.chart = chart
    this.boardId = boardId || 'main'
    this.board = board || this.chart.boards[this.boardId]
    this.parentG = parentG
    if (parentG) {
      this.g = parentG.append('g').attr('class', this.boardId + ' mark ' + type + ' ' + this.id)
    } else {
      this.g = this.board.markG.append('g').attr('class', this.boardId + ' mark ' + type + ' ' + this.id)
    }
    this.yAlign = yAlign || 'right'
    this.type = type
    this.fill = fill || 'none'
    this.fillOpacity = fillOpacity || 0.5
    this.stroke = stroke || '#bbbbbb'
    this.strokeWidth = strokeWidth || 1
    this.strokeOpacity = strokeOpacity || 0.5
    this.strokeDasharray = strokeDasharray || '0'
    this._show = true
  }

  update (opts) {
    this.xPos1 = opts.xPos1 === undefined ? this.xPos1 : opts.xPos1
    this.x1 = opts.x1 === undefined ? this.x1 : opts.x1
    this.dt1 = opts.dt1 === undefined ? this.dt1 : opts.dt1
    this.yPos1 = opts.yPos1 === undefined ? this.yPos1 : opts.yPos1
    this.y1 = opts.y1 === undefined ? this.y1 : opts.y1
    this.xPos2 = opts.xPos2 === undefined ? this.xPos2 : opts.xPos2
    this.x2 = opts.x2 === undefined ? this.x2 : opts.x2
    this.dt2 = opts.dt2 === undefined ? this.dt2 : opts.dt2
    this.yPos2 = opts.yPos2 === undefined ? this.yPos2 : opts.yPos2
    this.y2 = opts.y2 === undefined ? this.y2 : opts.y2
  }

  show () {
    if (this.g && !this._show) {
      this._show = true
      this.g.attr('visibility', 'visible')
    }
  }

  hide () {
    if (this.g && this._show) {
      this._show = false
      this.g.attr('visibility', 'hidden')
    }
  }

  remove () {
    this.g.remove()
  }

  revertSomeToPos (sequenceNumber) {
    // sequenceNumber is 1 or 2
    const point = { x: null, y: null }
    if (Number.isFinite(this['xPos' + sequenceNumber])) {
      point.x = this['xPos' + sequenceNumber]
    } else if (Number.isFinite(this['x' + sequenceNumber])) {
      point.x = this.revertIdToPos(this['x' + sequenceNumber])
    } else if (Number.isFinite(this['dt' + sequenceNumber])) {
      point.x = this.revertIdToPos(this.revertDtToId(this['dt' + sequenceNumber]))
    }
    if (Number.isFinite(this['yPos' + sequenceNumber])) {
      point.y = this['yPos' + sequenceNumber]
    } else if (Number.isFinite(this['y' + sequenceNumber])) {
      point.y = this.revertValueToYPos(this['y' + sequenceNumber])
    }
    return point
  }

  revertDtToId (dt) {
    const klines = this.chart.mainSeries
    const [l, r] = [this.chart.range.leftId, this.chart.range.rightId]
    if (!klines || !klines.data || !klines.data[l] || dt < klines.data[l].datetime) return null
    // 可能整个图的right_id 大于 klines.last_id， 造成 klines.data[r].datetime 是 undefined
    const rightId = klines.data[r] ? r : klines.last_id
    if (dt <= klines.data[rightId].datetime) {
      for (let i = l; i < rightId + 1; i++) {
        if (dt - klines.data[i].datetime <= 0) return i
      }
    }
    return null
  }

  revertIdToPos (id) {
    return Math.round(this.chart.xAxis.xScale(id)) + Math.floor(this.chart.bar.barWidth / 2)
  }

  revertValueToYPos (val) {
    return val && this.board[this.yAlign + 'YAxis'] ? Math.round(this.board[this.yAlign + 'YAxis'].yScale(val)) : null
  }

  isPointInChart (point) {
    const { x, y } = point
    if (x >= 0 && x <= this.chart.innerWidth && y >= 0 && y <= this.chart.innerHeight) return true
    return false
  }
}

class ChartMarkText extends ChartMark {
  constructor (opts) {
    super(opts)
    this.type = 'text'
    this.xPos1 = opts.xPos1
    this.x1 = opts.x1
    this.dt1 = opts.dt1
    this.yPos1 = opts.yPos1
    this.y1 = opts.y1
    this.text = opts.text
    this.size = opts.size

    this.textG = this.g.append('text').style('font-size', this.size)
      .style('fill', this.fill)
  }

  update (opts) {
    super.update(opts)
    this.text = opts.text === undefined ? this.text : opts.text
  }

  draw () {
    const start = this.revertSomeToPos('1')
    if (Number.isFinite(start.x) && Number.isFinite(start.y) && this.text) {
      this.show()
      this.textG.attr('x', start.x).attr('y', start.y).text(this.text)
      return
    }
    this.hide()
  }
}

class ChartMarkLine extends ChartMark {
  constructor (opts) {
    super(opts)
    this.type = 'line'
    this.lineG = this.g.append('line')
    this.lineG.style('fill', 'none')
      .attr('stroke', this.stroke)
      .attr('stroke-width', this.strokeWidth)
      .attr('stroke-opacity', this.strokeOpacity)
      .attr('stroke-dasharray', this.strokeDasharray)
    this.xPos1 = opts.xPos1
    this.x1 = opts.x1
    this.dt1 = opts.dt1
    this.yPos1 = opts.yPos1
    this.y1 = opts.y1
    this.xPos2 = opts.xPos2
    this.x2 = opts.x2
    this.dt2 = opts.dt2
    this.yPos2 = opts.yPos2
    this.y2 = opts.y2
    this.text = opts.text
    this.clamp = opts.clamp
  }

  update (opts) {
    super.update(opts)
    this.x1 = opts.x1 || this.x1
    this.y1 = opts.y1 || this.y1
    this.text = opts.text === undefined ? this.text : opts.text
    this.clamp = opts.clamp === undefined ? this.clamp : opts.clamp
  }

  draw () {
    const start = this.revertSomeToPos('1')
    const end = this.revertSomeToPos('2')
    if (Number.isFinite(start.x) && Number.isFinite(start.y) && Number.isFinite(end.x) && Number.isFinite(end.y)) {
      if (this.clamp && start.y - end.y < 0.000001) {
        if (start.y < 0 || end.y < 0) start.y = end.y = 0
        else if (start.y > this.chart.innerHeight || end.y > this.chart.innerHeight) start.y = end.y = this.chart.innerHeight
      }
      this.lineG.attr('x1', start.x).attr('y1', start.y).attr('x2', end.x).attr('y2', end.y)
      this.show()
      if (this.text) {
        this.textG = this.textG || this.g.append('text')
        this.textG.attr('x', start.x).attr('y', start.y)
          .attr('dy', start.y < 15 ? '12px' : '-2px').text(this.text)
      }
    }
    // this.hide()
  }
}

class ChartMarkRect extends ChartMark {
  constructor (opts) {
    super(opts)
    this.type = 'rect'
    this.rectG = this.g.append('rect')
    this.rectG.style('fill', this.fill)
      .attr('fill-opacity', this.fillOpacity)
      .attr('stroke', this.stroke)
      .attr('stroke-width', this.strokeWidth)
      .attr('stroke-opacity', this.strokeOpacity)
      .attr('stroke-dasharray', this.strokeDasharray)
    this.xPos1 = opts.xPos1
    this.x1 = opts.x1
    this.dt1 = opts.dt1
    this.yPos1 = opts.yPos1
    this.y1 = opts.y1
    this.xPos2 = opts.xPos2
    this.x2 = opts.x2
    this.dt2 = opts.dt2
    this.yPos2 = opts.yPos2
    this.y2 = opts.y2
    this.width = opts.width
    this.height = opts.height
  }

  update (opts) {
    super.update(opts)
    this.width = opts.width === undefined ? this.width : opts.width
    this.height = opts.height === undefined ? this.height : opts.height
  }

  draw () {
    const start = this.revertSomeToPos('1')
    let diff = 0.5
    if (this.rectG.attr('stroke') === 'none') diff = 0
    if (Number.isFinite(start.x) && Number.isFinite(start.y)) {
      if (Number.isFinite(this.width) && Number.isFinite(this.height)) {
        this.rectG.attr('x', start.x + diff).attr('y', start.y + diff).attr('width', this.width).attr('height', this.height)
        this.show()
        return
      }
      const end = this.revertSomeToPos('2')
      if (Number.isFinite(end.x) && Number.isFinite(end.y)) {
        this.rectG.attr('x', start.x + diff).attr('y', start.y + diff).attr('width', Math.abs(end.x - start.x)).attr('height', Math.abs(end.y - start.y))
        this.show()
        return
      }
    }
    this.hide()
  }
}

class ChartMarkArrow extends ChartMark {
  constructor (opts) {
    super(opts)
    this.type = 'arrow'
    this.arrowG = this.g.append('path')
    this.arrowG.style('fill', this.fill)
      .attr('stroke', this.stroke)
      .attr('stroke-width', this.strokeWidth)
      .attr('stroke-opacity', this.strokeOpacity)
      .attr('stroke-dasharray', this.strokeDasharray)
    this.xPos1 = opts.xPos1
    this.x1 = opts.x1
    this.dt1 = opts.dt1
    this.yPos1 = opts.yPos1
    this.y1 = opts.y1
    this.xPos2 = opts.xPos2
    this.x2 = opts.x2
    this.dt2 = opts.dt2
    this.yPos2 = opts.yPos2
    this.y2 = opts.y2
    this.width = opts.width
    this.height = opts.height
    this.direction = opts.direction
  }

  update (opts) {
    super.update(opts)
    this.width = opts.width === undefined ? this.width : opts.width
    this.height = opts.height === undefined ? this.height : opts.height
    this.direction = opts.direction === undefined ? this.direction : opts.direction
  }

  draw () {
    const start = this.revertSomeToPos('1')
    const w = this.width || this.chart.bar.barWidth
    const h = this.height || this.chart.bar.barWidth
    const neg = this.direction === 'up' ? 1 : -1
    const diff = this.stroke === 'none' ? 0 : 0.5
    if (Number.isFinite(start.x) && Number.isFinite(start.y) && this.isPointInChart(start)) {
      const w3 = Math.round(w / 3)
      const path = `M ${start.x + w / 2} ${start.y} l ${-w / 2} ${neg * h / 2} l ${w3 - diff} 0 l 0 ${neg * h / 2} l ${w3} 0 l 0 ${-1 * neg * h / 2} l ${w3} 0 z`
      this.arrowG.attr('d', path)
      this.show()
    } else {
      this.hide()
    }
  }
}

export {
  ChartMarkLine,
  ChartMarkRect,
  ChartMarkArrow,
  ChartMarkText
}
