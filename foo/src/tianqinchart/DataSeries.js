import EventEmitter from 'eventemitter3'
class DataSeries extends EventEmitter {
  constructor (symbol, duration, klines) {
    super()
    this.symbol = symbol
    this.duration = duration
    this.klines = null // klines 对象 有属性 data:Array  属性 last_id
    this.datas = null // 数据序列 数组
    if (klines.last_id && klines.data && Array.isArray(klines.data)) {
      this.klines = klines
    } else if (Array.isArray(klines)) {
      this.datas = klines
    }
  }

  // update (symbol, duration, klines) {
  //   this.emit('update', leftId, rightId)
  // }
}
export default DataSeries
