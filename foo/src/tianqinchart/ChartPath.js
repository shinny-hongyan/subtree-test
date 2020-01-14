import * as d3 from 'd3'
import { UpDown, UpDownEqual, UpDownEqualKeys, UpDownKeys } from '../Utils'

class BasePath {
  constructor ({ id, xScale, yScale, bar } = {}) {
    this.id = id || (new Date().getTime())
    this.bar = bar
    this.xScale = xScale
    this.yScale = yScale
    this.paths = []
  }
}

class Candle extends BasePath {
  constructor ({ id, xScale, yScale, bar } = {}) {
    super({ id, xScale, yScale, bar })
    UpDownEqualKeys.forEach(k => this.paths.push([this.id, 'candle', 'line', k].join('.')))
    UpDownEqualKeys.forEach(k => this.paths.push([this.id, 'candle', 'body', k].join('.')))
  }

  getYDomain (leftId, rightId, data) {
    const list = data.slice(leftId, rightId + 1)
    let [min, max] = [d3.min(list, d => d && d.low), d3.max(list, d => d && d.high)]
    min -= (max - min) * 0.2
    max += (max - min) * 0.2
    return [min, max]
  }

  calcPaths (leftId, rightId, data) {
    if (!this.yScale || !this.xScale || !this.bar) return
    const _path = {}
    this.paths.forEach(function (k) { _path[k] = '' })
    for (let i = leftId; i <= rightId; i++) {
      // if (this.id === 'kline') console.info(i, data, data[i])
      if (!data[i]) continue
      UpDownEqualKeys.forEach(key => {
        if (UpDownEqual[key](data[i])) {
          const diff = key === 'up' ? 0.5 : 0
          _path[[this.id, 'candle', 'body', key].join('.')] += this._bodyPath(data[i], i, diff)
          _path[[this.id, 'candle', 'line', key].join('.')] += this._linePath(data[i], i)
        }
      })
    }
    return _path
  }

  _bodyPath (d, id, diff) {
    const o = Math.round(this.yScale(d.open)) + diff
    const c = Math.round(this.yScale(d.close)) + diff
    const x = this.xScale(id) + this.bar.barPadding
    if (Number.isNaN(o) || Number.isNaN(c) || Number.isNaN(x)) return ''
    const width = this.bar.barWidth - this.bar.barPadding * 2
    if (o !== c) {
      return `M${x + diff} ${o} L${x + width - diff} ${o} L${x + width - diff} ${c} L${x + diff} ${c} L${x + diff} ${o}`
    } else {
      return `M${x} ${o + 0.5} L${x + width} ${o + 0.5}`
    }
  }

  _linePath (d, id) {
    const h = Math.round(this.yScale(d.high))
    const l = Math.round(this.yScale(d.low))
    const x = this.xScale(id) + this.bar.barWidth / 2
    if (Number.isNaN(h) || Number.isNaN(l) || Number.isNaN(x)) return ''
    return `M ${x} ${h} L ${x} ${l}`
  }
}

class Volume extends BasePath {
  constructor ({ id, xScale, yScale, bar } = {}) {
    super({ id, xScale, yScale, bar })
    UpDownKeys.forEach(k => this.paths.push([this.id, 'body', k].join('.')))
  }

  getYDomain (leftId, rightId, data) {
    const list = data.slice(leftId, rightId + 1)
    return [0, d3.max(list, d => d && d.volume) * 1.2]
  }

  calcPaths (leftId, rightId, data) {
    if (!this.yScale || !this.xScale || !this.bar) return
    const _path = {}
    this.paths.forEach(function (k) { _path[k] = '' })
    for (let i = leftId; i <= rightId; i++) {
      if (!data[i]) continue
      UpDownKeys.forEach(key => {
        if (UpDown[key](data[i])) {
          // _path[[this.id, 'body', key].join('.')] += this.bodyPath(data[i], i, 0) // 实心矩形
          _path[[this.id, 'body', key].join('.')] += this.bodyPath(data[i], i, key === 'up' ? 0.5 : 0) // 空心矩形需要+0.5
        }
      })
    }
    return _path
  }

  bodyPath (d, id, diff) {
    const max = Math.ceil(this.yScale(0)) + (diff === 0 ? 1 : diff)
    const vol = Math.min(Math.round(max - this.yScale(d.volume)), max - diff)
    const x = this.xScale(id) + this.bar.barPadding
    const width = this.bar.barWidth - this.bar.barPadding * 2
    const path = `M${x + diff} ${max}L${x + width - diff} ${max}L ${x + width - diff} ${max - vol}L${x + diff} ${max - vol}L${x + diff} ${max}`
    return path
  }
}

class Oi extends BasePath {
  constructor ({ id, xScale, yScale, bar } = {}) {
    super({ id, xScale, yScale, bar })
    this.paths = ['oi']
  }

  getYDomain (leftId, rightId, data) {
    const list = data.slice(leftId, rightId + 1)
    let [min, max] = [d3.min(list, d => d && d.close_oi), d3.max(list, d => d && d.close_oi)]
    min -= (max - min) * 0.2
    max += (max - min) * 0.2
    return [min, max]
  }

  calcPaths (leftId, rightId, data) {
    if (!this.yScale || !this.xScale || !this.bar) return
    let _path = ''
    for (let i = leftId; i <= rightId; i++) {
      if (!data[i]) continue
      const oi = this.yScale(data[i].close_oi)
      const x = this.xScale(i) + this.bar.barWidth / 2
      _path += _path === '' ? 'M' : 'L'
      _path += `${x} ${oi} `
    }
    return { oi: _path }
  }
}

class Line extends BasePath {
  constructor ({ id, xScale, yScale, bar, propName, min, max } = {}) {
    super({ id, xScale, yScale, bar })
    this.min = min
    this.max = max
    this.propName = propName || 'value'
    this.paths = ['value']
  }

  getYDomain (leftId, rightId, data) {
    if (Number.isFinite(this.min) && Number.isFinite(this.max)) {
      return [this.min, this.max]
    } else {
      const list = data.slice(leftId, rightId + 1)
      return [d3.min(list, d => d && d[this.propName]), d3.max(list, d => d && d[this.propName])]
    }
  }

  calcPaths (leftId, rightId, data) {
    if (!this.yScale || !this.xScale || !this.bar) return
    let _path = 'M'
    for (let i = leftId; i <= rightId; i++) {
      if (!data[i]) {
        if (!_path.endsWith('M')) _path += 'M'
        continue
      }
      const val = this.yScale(data[i][this.propName])
      const x = this.xScale(i) + this.bar.barWidth / 2
      if (val === undefined || Number.isNaN(val) || Number.isNaN(x)) {
        if (!_path.endsWith('M')) _path += 'M'
      } else {
        _path += _path.endsWith('M') ? '' : 'L'
        _path += `${x} ${val}`
      }
    }
    return { value: _path.replace(/[LM]$/, '') }
  }
}

class Bar extends BasePath {
  constructor ({ id, xScale, yScale, bar, propName, isHollow, min, max } = {}) {
    super({ id, xScale, yScale, bar })
    this.isHollow = isHollow || false // 是否空心
    this.min = min
    this.max = max
    this.propName = propName || 'value'
    this.paths = ['value']
  }

  getYDomain (leftId, rightId, data) {
    if (Number.isFinite(this.min) && Number.isFinite(this.max)) {
      return [this.min, this.max]
    } else {
      const list = data.slice(leftId, rightId + 1)
      return [0, d3.max(list, d => d && d[this.propName])]
    }
  }

  calcPaths (leftId, rightId, data) {
    if (!this.yScale || !this.xScale || !this.bar) return
    let _path = ''
    for (let i = leftId; i <= rightId; i++) {
      if (!data[i]) continue
      _path += this.bodyPath(data[i], i, this.isHollow ? 0.5 : 0) // 空心矩形需要+0.5
    }
    return { value: _path }
  }

  bodyPath (d, id, diff) {
    const max = Math.floor(this.yScale(0))
    const val = Math.round(max - this.yScale(d[this.propName]))
    const x = this.xScale(id) + this.bar.barPadding
    if (Number.isNaN(val) || Number.isNaN(x)) return ''
    const width = this.bar.barWidth - this.bar.barPadding * 2
    return `M ${x + diff} ${max - diff} L ${x + width - diff} ${max - diff} L ${x + width - diff} ${max - val + diff} L ${x + diff} ${max - val + diff} L ${x + diff} ${max - diff}`
  }
}

class Dot extends BasePath {
  constructor ({ id, xScale, yScale, bar, propName, min, max } = {}) {
    super({ id, xScale, yScale, bar })
    this.min = min
    this.max = max
    this.propName = propName || 'value'
    this.paths = ['value']
  }

  getYDomain (leftId, rightId, data) {
    if (Number.isFinite(this.min) && Number.isFinite(this.max)) {
      return [this.min, this.max]
    } else {
      const list = data.slice(leftId, rightId + 1)
      return [d3.min(list, d => d && d[this.propName]), d3.max(list, d => d && d[this.propName])]
    }
  }

  calcPaths (leftId, rightId, data) {
    if (!this.yScale || !this.xScale || !this.bar) return
    let _path = ''
    for (let i = leftId; i <= rightId; i++) {
      if (!data[i]) continue
      const cy = this.yScale(data[i][this.propName])
      const cx = this.xScale(i) + this.bar.barWidth / 2
      if (Number.isNaN(cy) || Number.isNaN(cx)) continue
      const r = 3 // Math.min(this.bar.barWidth, 5)
      _path += `M ${cx - r} ${cy} a ${r}, ${r} 0 1,0 ${r * 2},0 a ${r}, ${r} 0 1,0 ${-r * 2},0 `
    }
    return { value: _path }
  }
}

export {
  Candle,
  Volume,
  Oi,
  Line,
  Bar,
  Dot
}
