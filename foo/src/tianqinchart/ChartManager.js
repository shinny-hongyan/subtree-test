import HighlightBar from './HighlightBar'

/**
 * 这些被管理类需要实现：
 * new XXX(tqchart, id, ...args)
 * update(...args)
 * clear()
 * ************
 * draw()
 * **************
 * hide()
 * show()
 */
const Classes = { HighlightBar }

class ChartManager {
  constructor (tqchart, managerId, typeClass) {
    this.tqchart = tqchart
    this.managerId = managerId
    this.typeClass = typeClass
    this.contents = {}
  }

  add (key, ...args) {
    if (this.contents[key]) {
      this.contents[key].update(...args)
    } else {
      this.contents[key] = new Classes[this.typeClass](this.tqchart, key, ...args)
    }
    return this.contents[key]
  }

  each (funcName, filterFunc, ...args) {
    for (const key in this.contents) {
      if (this.contents[key]) {
        const element = this.contents[key]
        element[funcName](filterFunc, ...args)
      }
    }
  }

  get (key) {
    return this.contents[key] || null
  }

  remove (key) {
    this.contents[key].clear()
    delete this.contents[key]
  }

  removeAll () {
    for (const key in this.contents) {
      this.contents[key].clear()
      delete this.contents[key]
    }
  }
}

export default ChartManager
