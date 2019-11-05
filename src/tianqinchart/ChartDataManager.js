const CHART_ID = 'web_kline_chart'

// 管理 tqsdk 里面 set_chart 数据
// 计算 left_id right_id
class ChartDataManager {
  constructor (chart) {
    this.chart = chart
    this.tqsdk = chart.tqsdk
    this.left_id = -1 // 真实绘图 left_id
    this.right_id = -1 // 真实绘图 right_id
    this.sendToServer()
  }

  // 随行情更新时调用
  update () {
    const klines_last_id = this.get_klines_last_id()
    if (klines_last_id > -1) { // 已经接受到数据
      if (this.left_id === -1 || this.right_id === -1) {
        // 初始化情况
        const chart_right_id = this.get_chart('right_id')
        if (chart_right_id && chart_right_id > -1) {
          this.right_id = chart_right_id
          this.left_id = this.right_id - this.chart.bar.barNumbers + 1
        }
      } else {
        // 更新
        if (this.right_id >= klines_last_id - 1) {
          this.right_id = (this.right_id + 1 === klines_last_id) ? this.right_id + 1 : this.right_id
          this.left_id = this.right_id - this.chart.bar.barNumbers + 1
        }
      }
    }
  }

  // 切换合约、周期调用
  reset () {
    this.left_id = -1 // 真实绘图 left_id
    this.right_id = -1 // 真实绘图 right_id
    this.sendToServer()
  }

  // 柱子个数改变的时候调用
  // 滚轮缩放（柱子宽度改变） 图表宽度改变
  resetByRight () {
    if (this.right_id > this.get_klines_last_id()) {
      // 本身图表右侧有空白
      // 以左边为准重新计算
      this.right_id = this.left_id + this.chart.bar.barNumbers - 1
      this.sendToServer()
    } else {
      // 以右边为准重新计算 _left_id _right_id
      const temp_left_id = this.right_id - this.chart.bar.barNumbers + 1
      this.left_id = temp_left_id < 0 ? 0 : temp_left_id
      this.right_id = this.left_id + this.chart.bar.barNumbers - 1
      this.sendToServer()
    }
  }

  // 移动图表调用
  // moves 个柱子 正数向右 负数向左
  moves (moves) {
    if (this.left_id === -1 || this.right_id === -1) return
    const temp_left_kline_id = this.left_id - moves
    const temp_right_kline_id = temp_left_kline_id + this.chart.bar.barNumbers - 1
    if (temp_left_kline_id >= 0 && temp_left_kline_id <= this.get_klines_last_id()) {
      [this.left_id, this.right_id] = [temp_left_kline_id, temp_right_kline_id]
      this.sendToServer()
      return true
    }
    return false
  }

  moveTo (dt) {
    this.left_id = -1 // 真实绘图 left_id
    this.right_id = -1 // 真实绘图 right_id
    this.tqsdk.set_chart({
      chart_id: CHART_ID,
      symbol: this.chart.symbol,
      duration: this.chart.duration,
      view_width: this.chart.bar.barNumbers * 3,
      focus_datetime: dt, // 日线及以上周期是交易日，其他周期是时间，UnixNano 北京时间
      focus_position: Math.floor(this.chart.bar.barNumbers * 3 / 6 * 5) // 指定K线位于屏幕的相对位置,0 表示位于最左端
    })
  }

  getKlines () {
    return (this.chart.symbol && this.chart.duration) ? this.tqsdk.get({ name: 'klines', symbol: this.chart.symbol, duration: this.chart.duration })
      : null
  }

  // get_chart()
  // get_chart(left_id)
  // get_chart(right_id)
  get_chart (key) {
    const chart = this.tqsdk.get_by_path('charts/' + CHART_ID)
    if (chart &&
      chart.state &&
      chart.state.duration === this.chart.duration &&
      chart.state.ins_list === this.chart.symbol) {
      switch (key) {
        case 'left_id':
          return chart.left_id ? chart.left_id : -1
        case 'right_id':
          return chart.right_id ? chart.right_id : -1
        default:
          return chart
      }
    } else {
      return null
    }
  }

  get_klines_last_id () {
    // const klines = this.getKlines()
    // return (klines && klines.last_id) ? klines.last_id : -1
  }

  readyToDraw () {
    const mdhis_more_data = this.tqsdk.get_by_path(['mdhis_more_data'])
    const chart = this.tqsdk.get_by_path(['charts', CHART_ID])
    return !!(mdhis_more_data === false &&
      chart &&
      chart.state &&
      chart.state.duration === this.chart.duration &&
      chart.state.ins_list === this.chart.symbol)
  }

  revertDtToId (dt) {
    const klines = this.getKlines()
    if (!klines || !klines.data || this.left_id === -1 || this.right_id === -1) return null
    // 几种情况 dt 介于 [this.left_id, this.right_id]
    let [l, r] = [this.left_id, this.right_id]
    if (!klines.data[l] || !klines.data[r]) return null
    // 可能整个图的right_id 大于 klines.last_id， 这个时候就改用 last_id 判断
    r = r <= klines.last_id ? r : klines.last_id
    if (dt >= klines.data[l].datetime && dt <= klines.data[r].datetime) {
      for (let i = l; i < r + 1 && klines.data[i]; i++) {
        if (dt - klines.data[i].datetime <= 0) return i >= 1 ? i - 1 : i
      }
      return null
    }
    // dt 大于 this.right_id
    if (dt > klines.data[r].datetime) {
      if (r === klines.last_id) return null
      for (let i = r; i < klines.last_id && klines.data[i] && klines.data[i]; i++) {
        if (dt - klines.data[i].datetime <= 0) return i >= 1 ? i - 1 : i
      }
      return null
    }

    // dt 小于 this.left_id
    if (dt < klines.data[l].datetime) {
      if (l === 0) return null
      for (let i = l; i >= 0 && klines.data[i]; i--) {
        if (dt - klines.data[i].datetime >= 0) return i
      }
      return null
    }
  }

  sendToServer () {
    // if (!this.chart.symbol || !this.chart.duration) return
    // if (this.right_id > -1 && this.right_id !== this.get_klines_last_id()) {
    //   this.tqsdk.set_chart({
    //     chart_id: CHART_ID,
    //     symbol: this.chart.symbol,
    //     duration: this.chart.duration,
    //     view_width: this.chart.bar.barNumbers * 3,
    //     left_kline_id: this.left_id - this.chart.bar.barNumbers
    //   })
    // } else {
    //   this.tqsdk.set_chart({
    //     chart_id: CHART_ID,
    //     symbol: this.chart.symbol,
    //     duration: this.chart.duration,
    //     view_width: this.chart.bar.barNumbers * 3
    //   })
    // }
  }
}

export default ChartDataManager
