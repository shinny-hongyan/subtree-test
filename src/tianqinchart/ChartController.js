class ChartBar {
  /**
     * @param {number} fullWidth 整个图表的宽度
     */
  constructor (fullWidth) {
    this.fullWidth = fullWidth
    this.barWidth = ChartBar.BAR_WIDTH // 柱子宽度包含 padding
    this.barPadding = this._getBarPadding()
    this.barNumbers = this._getBarNumbers()
  }

  _getBarPadding () {
    return this.barWidth <= 3 ? 0 : this.barWidth <= 17 ? 1 : 2
  }

  _getBarNumbers () {
    return Math.floor(this.fullWidth / this.barWidth)
  }

  /**
   * 柱子缩放
   * @param {number} x 正数放大柱子，负数缩小柱子
   */
  zoom (x) {
    if (x === 0) return
    const zoom = x / Math.abs(x)
    const w = this.barWidth + zoom * 2
    if (w < ChartBar.BAR_WIDTH_MIN || w > ChartBar.BAR_WIDTH_MAX || w === this.barWidth) return
    this.barWidth = w
    this.barPadding = this._getBarPadding()
    this.barNumbers = this._getBarNumbers()
  }

  setFullWidth (w) {
    this.fullWidth = w
    this.barNumbers = this._getBarNumbers()
  }
}

ChartBar.BAR_WIDTH = 9
ChartBar.BAR_WIDTH_MAX = 35
ChartBar.BAR_WIDTH_MIN = 1

class ChartDataRange {
  constructor (leftId, rightId) {
    this.leftId = Number.isInteger(leftId) ? leftId : -1
    this.rightId = Number.isInteger(rightId) ? rightId : -1
  }

  reset (leftId, rightId) {
    if (this.isInvalid() || leftId !== this.leftId || rightId !== this.rightId) {
      this.leftId = Number.isInteger(leftId) ? leftId : -1
      this.rightId = Number.isInteger(rightId) ? rightId : -1
      return true
    }
    return false
  }

  isInvalid () {
    return this.leftId === -1 || this.rightId === -1
  }

  isEqual (range) {
    return range.leftId === this.leftId && range.rightId === this.rightId
  }

  copy (range) {
    if (range instanceof ChartDataRange) {
      this.leftId = range.leftId
      this.rightId = range.rightId
    }
  }
}

class ChartController {
  constructor (tqchart) {
    this.tqchart = tqchart
    this.range = new ChartDataRange()
  }

  _initRange () {
    let [leftId, rightId] = [-1, -1]
    if (this.tqchart.mainSeries && this.tqchart.mainSeries.last_id !== -1) {
      rightId = this.tqchart.mainSeries.last_id
      leftId = rightId - this.tqchart.bar.barNumbers + 1
    }
    this.range.reset(leftId, rightId)
  }

  getRange () {
    if (this.range.isInvalid()) this._initRange()
    return this.range
  }

  init () {
    this._initRange()
  }

  setRange (leftId, rightId) {
    if (leftId >= 0 && rightId >= leftId) {
      this.range.reset(leftId, rightId)
    } else {
      this.tqchart.tqChartConsole.warn('setRange 不传入数据，表示指定移动到最后端')
      this.range.reset(-1, -1)
    }
  }

  /**
   * 移动图表调用
   * @param {Integer} m 移动 m 个柱子 正数向右 负数向左
   * @return {range | false}
   */
  move (m) {
    if (this.getRange().isInvalid()) {
      this.tqchart.tqChartConsole.warn('move 拖动图表的时候，图表范围还未确定')
      return false
    }
    let _tempLeftId = this.range.leftId - m
    let _tempRightId = _tempLeftId + this.tqchart.bar.barNumbers - 1
    if (_tempLeftId >= 0 && _tempLeftId <= this.tqchart.mainSeries.last_id - this.tqchart.bar.barNumbers + 10) {
      return this.range.reset(_tempLeftId, _tempRightId)
    } else if (_tempLeftId < 0) {
      if (this.range.leftId === 0) return false
      _tempLeftId = 0
      _tempRightId = _tempLeftId + this.tqchart.bar.barNumbers - 1
      return this.range.reset(_tempLeftId, _tempRightId)
    }
    return false
  }

  /**
   * 调整柱子宽度 && 重新计算 leftId rightId
   * @return {Boolean} false 没有缩放；true 有缩放
   */
  zoom () {
    // 优先 resetByRight
    let [tempLeftId, tempRightId] = [-1, -1]
    if (this.range.rightId > this.tqchart.mainSeries.last_id) {
      tempLeftId = this.tqchart.mainSeries.last_id - this.tqchart.bar.barNumbers + 1
    } else {
      tempLeftId = this.range.rightId - this.tqchart.bar.barNumbers + 1
    }
    tempLeftId = tempLeftId < 0 ? 0 : tempLeftId
    tempRightId = tempLeftId + this.tqchart.bar.barNumbers - 1
    this.range.reset(tempLeftId, tempRightId)
    return true
  }

  revertIdToPx (id) {
    return Math.round(this.tqchart.xAxis.xScale(id))
  }

  revertDtToId (dt, leftId, rightId) {
    const klines = this.tqchart.mainSeries
    if (!klines || !klines.data || this.range.isInvalid()) return null
    // 如果用户指定 leftId, rightId 那么只查找此范围内
    let isCustomRange = false
    if (leftId >= 0 && rightId > leftId) {
      isCustomRange = true
    } else {
      leftId = this.range.leftId
      rightId = this.range.rightId
    }
    // 几种情况 dt 介于 [leftId, rightId]
    let [l, r] = [leftId, rightId]
    r = r <= klines.last_id ? r : klines.last_id // 可能整个图的right_id 大于 klines.last_id， 这个时候就改用 last_id 判断
    if (!klines.data[l] || !klines.data[r]) {
      // 如果没有 l, r 都没有数据直接返回 null，klines 在 leftId, rightId 这两个点没有数据
      return null
    }
    // 如果落在最后一根柱子，直接返回
    if (dt >= klines.data[r].datetime && dt < klines.data[r].datetime + this.tqchart.duration) {
      return r
    }
    if (dt >= klines.data[l].datetime && dt <= klines.data[r].datetime) {
      for (let i = l; i < r + 1 && klines.data[i]; i++) {
        if (dt - klines.data[i].datetime <= 0) return i >= 1 ? i - 1 : i
      }
      return null
    }
    if (isCustomRange) return null
    // dt 大于 rightId
    if (dt > klines.data[r].datetime) {
      if (r === klines.last_id) return null
      for (let i = r; i < klines.last_id && klines.data[i] && klines.data[i]; i++) {
        if (dt - klines.data[i].datetime <= 0) return i >= 1 ? i - 1 : i
      }
      return null
    }
    // dt 小于 leftId
    if (dt < klines.data[l].datetime) {
      if (l === 0) return null
      for (let i = l; i >= 0 && klines.data[i]; i--) {
        if (dt - klines.data[i].datetime >= 0) return i
      }
      return null
    }
  }
}

export {
  ChartBar,
  ChartController,
  ChartDataRange
}
