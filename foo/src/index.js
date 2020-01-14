import * as d3 from 'd3'
import EventEmitter from 'eventemitter3'
import XAxis from './tianqinchart/XAxis'
import ChartCrosshair from './tianqinchart/ChartCrosshair'
import ChartBoard from './tianqinchart/ChartBoard'
import ChartPlot from './tianqinchart/ChartPlot'
import ChartManager from './tianqinchart/ChartManager'
import ChartMarkManager from './tianqinchart/ChartMarkManager'
import TradeArrowManager from './tianqinchart/TradeArrowManager'
import PositionManager from './tianqinchart/PositionManager'
import { ChartBar, ChartDataRange, ChartController } from './tianqinchart/ChartController'
import { CreateConsole, ParseDuartionToString, RevertColor } from './Utils'

const ChartMouseStatus = {
  default: 0, // 默认，箭头
  cross: 1, // 十字
  paused: 2 // 不监听鼠标状态
}
/**
 * free 可以指定 leftId / rightId
 * fixed 必须指定 leftId / rightId
 */
class TqChart extends EventEmitter {
  constructor (opts) {
    super()
    this.divDomId = opts.id
    this.outerWidth = opts.width
    this.outerHeight = opts.height
    this.margin = opts.margin ? opts.margin : { top: 15, right: 50, bottom: 20, left: 80 }
    this.innerWidth = this.outerWidth - this.margin.left - this.margin.right
    this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom
    this.mode = 'free' // free / fixed
    this.customRange = new ChartDataRange() // 记录用户指定的 leftId / rightId
    this.mainType = 'candle' //  candle / close
    this.bar = new ChartBar(this.innerWidth) // 全局柱子配置
    this.range = new ChartDataRange() // 实际绘制的 Id 范围

    this.symbol = opts.symbol || opts.instrumentId
    this.duration = opts.duration || 60 * 1e9 // 默认一分钟线
    this.price_decs = opts.price_decs || 2 // 价格保留小数位数
    this.price_ticks = opts.price_ticks // 一跳价格
    this.mainSeries = opts.mainSeries
    this.chartController = new ChartController(this)

    this.highlightManager = new ChartManager(this, 'highlight', 'HighlightBar')
    this.tradeArrowManager = new TradeArrowManager(this) // 交易标记
    this.positionManager = new PositionManager(this) // 持仓块

    this.tqChartConsole = CreateConsole('TqChart', 'plum')
  }

  // 主要接口列表
  setMode (mode, leftId, rightId) {
    if (mode === 'free') {
      // 可以自由拖拽
      this.mode = 'free'
      if (leftId >= 0 && rightId >= leftId) {
        this.customRange.reset(leftId, rightId)
      } else {
        this.customRange.reset()
      }
    } else if (mode === 'fixed') {
      // 不可以自由拖拽，固定范围
      if (leftId >= 0 && rightId >= leftId) {
        this.mode = 'fixed'
        this.customRange.reset(leftId, rightId)
      } else {
        this.tqChartConsole.error('mode:fixed 必须指定 leftId rightId')
      }
    } else {
      this.tqChartConsole.error(`不支持 mode:${mode}， 只支持 mode:[free|fixed]`)
    }
  }

  setRange (leftId, rightId) {
    this.chartController.setRange(leftId, rightId)
    this.draw()
  }

  setMainType (type) {
    if (type === 'candle' || type === 'close') {
      this.mainType = type
    } else {
      this.tqChartConsole.error('mainType 只支持 [candle|close] => [K线图|收盘价线]')
    }
  }

  setMainSeries (symbol, duration, klines) {
    if (symbol && duration && klines) {
      this.symbol = symbol
      this.duration = duration
      this.mainSeries = klines
      this.backgroundText.text(`${this.symbol} ${ParseDuartionToString(this.duration)}`).attr('dy', '-2')
      this.chartController.init()
      this.marksManager.removeMarkAll()
      this.tradeArrowManager.removeAll()
      this.positionManager.removeAll()
      this._resetBoards()
      this.draw()
    } else {
      this.tqChartConsole.error('setMainSeries 必须同时指定 symbol, duration, klines')
    }
  }

  addHighlightBar (id, klineId) {
    this.highlightManager.add(id, klineId)
  }

  addTradeArrow (id, trade) {
    this.tradeArrowManager.add(id, trade)
  }

  addPositionRecord (dt, position) {
    this.positionManager.add(dt, position)
  }

  init () {
    this._initSvgNode()
    this._initEventListenners()

    // 全局 XAxis
    this.xAxis = new XAxis(this)

    // init boards 目前只有两个 boards
    const positions = ChartBoard.GetMutilPlotsHeight(2, this.innerHeight)
    this.boards = {
      main: new ChartBoard(this, 'main', positions[0].top, positions[0].height, false),
      sub: new ChartBoard(this, 'sub', positions[1].top, positions[1].height, true)
    }

    // init plots
    // [mainkline volume oi]
    this.plots = {
      mainkline: new ChartPlot({
        chart: this,
        boardId: 'main',
        plotId: 'candle',
        yAlign: 'right',
        type: 'candle'
      }),
      volume: new ChartPlot({
        chart: this,
        boardId: 'sub',
        plotId: 'volume',
        yAlign: 'right',
        type: 'volume'
      }),
      oi: new ChartPlot({
        chart: this,
        boardId: 'sub',
        plotId: 'oi',
        yAlign: 'left',
        type: 'oi'
      })
    }

    // 管理图上标识
    this.marksManager = new ChartMarkManager(this)
    // init crosshair
    this.crosshair = new ChartCrosshair(this)
    this.chartController.init()
  }

  _initSvgNode () {
    // 初始化 svg ，整个图表的根结点
    this.svg = d3
      .select('#' + this.divDomId)
      .append('svg')
      .attr('class', 'tqchart')
      .attr('width', this.outerWidth)
      .attr('height', this.outerHeight)
    this.defs = this.svg.append('defs')
    const maskId = 'mask-global'
    this.maskGlobal = TqChart.AppendMask(this.defs, maskId, this.innerWidth, this.innerHeight, 0, 0)

    // 按顺序生成一批全局节点
    const [left, top] = [this.margin.left, this.margin.top]
    // 整个背景
    this.backgroundG = TqChart.AppendG(this.svg, 'background global', left, top)
    // board background
    this.boardBackgroundG = TqChart.AppendG(this.svg, 'boardBackground global', left, top)
    // this.bgShapesG = TqChart.AppendG(this.svg, 'bgShapes global', left, top, maskId)
    this.rootG = TqChart.AppendG(this.svg, 'root global', left, top)
    this.crosshairG = TqChart.AppendG(this.svg, 'crosshair global', left, top)
    this.loadingG = TqChart.AppendG(this.svg, 'loading global', left, top)
    this.bgShapesG = TqChart.AppendG(this.svg, 'bgShapes global', left, top, maskId)

    // 背景格子 竖线
    this.backgroundText = this.backgroundG.append('g').append('text')
    this.backgroundText.text(`${this.symbol} ${ParseDuartionToString(this.duration)}`).attr('dy', '-2')
    this.markG = this.rootG.append('g')
  }

  _debounce (fn, delay) {
    // 维护一个 timer
    let timer = null
    return function () {
      // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
      const context = this
      const args = arguments
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }

  _initEventListenners () {
    const _this = this
    // 鼠标悬停
    this.svg.on('mousemove', function () {
      const [x, y] = d3.mouse(this)
      if (x > _this.margin.left && x < _this.margin.left + _this.innerWidth && y > _this.margin.top && y < _this.margin.top + _this.innerHeight) {
        _this.crosshair.update(x - _this.margin.left, y - _this.margin.top)
      }
    })
    this.svg.on('mouseover', function () {
      if (initX === null) _this.crosshair.show()
    })
    this.svg.on('mouseleave', function () {
      _this.crosshair.hide()
    })

    // 处理拖动事件  使用 rootG 要设置长宽
    let initX = null
    const dragOnMove = d3.drag()
      .on('start', function () {
        // 记下起始位置
        initX = d3.event.x
        // 拖动开始的时候 隐藏十字光标层
        _this.crosshair.hide()
        _this.crosshair.drag(true)
      }).on('drag', function () {
        const moves = Math.round((d3.event.x - initX) / _this.bar.barWidth)
        this.bar = new ChartBar(this.innerWidth)
        if (Math.abs(moves) > 0) {
          initX = d3.event.x
          // _this.chartController.move(moves)
          _this.move(moves) // 移动 moves 柱子
        }
      }).on('end', function () {
        // 拖动结束
        initX = null
        // 显示十字光标层
        _this.crosshair.show()
        _this.crosshair.drag(false)
      })
    this.svg.call(dragOnMove)

    // 处理缩放事件
    const zoom = d3.zoom()
      .on('zoom', function () {
        const deltaY = d3.event.sourceEvent.deltaY
        if (Math.abs(deltaY) > 0) {
          _this._debounce(_this.zoom, 200).bind(_this)(deltaY > 0 ? -2 : 2)
        }
      })
    this.svg.call(zoom).on('dblclick.zoom', null)
  }

  // 根据 y 坐标位置，返回对应 board , crosshair 根据这个计算出显示的值
  getBoardByYPosition (y) {
    for (const key in this.boards) {
      if (y >= this.boards[key].top && y <= this.boards[key].top + this.boards[key].height) {
        return this.boards[key]
      }
    }
  }

  resize ({ height, width } = {}) {
    this.tqChartConsole.log('onresize', width)
    this.outerWidth = width
    this.outerHeight = height
    this.innerWidth = this.outerWidth - this.margin.left - this.margin.right
    this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom
    this.svg.attr('width', this.outerWidth).attr('height', this.outerHeight)
    this.bar.setFullWidth(this.innerWidth)

    // 调整位置
    this.xAxis.resetPosition()
    // 调整范围 leftId rightId
    this.chartController.zoom()

    const positions = ChartBoard.GetMutilPlotsHeight(Object.keys(this.boards).length, this.innerHeight)
    let index = 0
    for (const key in this.boards) {
      this.boards[key].resetPosition(positions[index++])
    }

    // 调整 crosshair 位置
    this.crosshair.resize()

    // 重新绘制
    this.draw()
  }

  _resetBoards () {
    for (const k in this.boards) {
      if (k !== 'main' && k !== 'sub') {
        this.boards[k].remove()
        delete this.boards[k]
      }
    }
    const positions = ChartBoard.GetMutilPlotsHeight(2, this.innerHeight)
    this.boards.main.resetPosition(positions[0])
    this.boards.sub.resetPosition(positions[1])

    for (const k in this.plots) {
      if (k !== 'mainkline' && k !== 'volume' && k !== 'oi') {
        this.plots[k].remove()
        delete this.plots[k]
      }
    }
  }

  _updateBoards () {
    const positions = ChartBoard.GetMutilPlotsHeight(Object.keys(this.boards).length, this.innerHeight)
    let index = 0
    for (const key in this.boards) {
      this.boards[key].resetPosition(positions[index++])
    }
  }

  // 接口列表
  addSeries (serialId, serial) {
    this.tqChartConsole.log('addSeries', serialId, serial)
    const boardName = serial.board ? serial.board.toLowerCase() : 'main'
    if (!this.boards[boardName]) {
      this.boards[boardName] = new ChartBoard(this, boardName, this.innerHeight, 0, true)
      this._updateBoards()
    }

    if ((serial.type === 'KSERIAL' || serial.type === 'SERIAL') && !this.plots[serialId]) {
      if (serial.type === 'KSERIAL') {
        this.plots[serialId] = new ChartPlot({
          chart: this,
          boardId: boardName,
          plotId: serialId,
          yAlign: serial.yAlign,
          type: 'candle',
          data: serial.data
        })
      } else if (serial.type === 'SERIAL') {
        this.plots[serialId] = new ChartPlot({
          chart: this,
          boardId: boardName,
          plotId: serialId,
          yAlign: serial.yAlign,
          type: serial.style.toLowerCase(),
          data: serial.data,
          color: RevertColor(serial.color),
          width: serial.width,
          dash: serial.style.toLowerCase() === 'dash'
        })
      }
    }

    if (serial.type === 'TEXT') {
      this.addMark({
        id: serialId,
        boardId: serial.board.toLowerCase(),
        type: 'text',
        x1: serial.x1,
        y1: serial.y1,
        fill: RevertColor(serial.color),
        size: serial.size,
        text: serial.text
      })
    } else if (serial.type === 'LINE' || serial.type === 'SEG' || serial.type === 'RAY') {
      this.addMark({
        id: serialId,
        boardId: serial.board.toLowerCase(),
        type: 'line',
        x1: serial.x1,
        x2: serial.x2,
        y1: serial.y1,
        y2: serial.y2,
        stroke: RevertColor(serial.color),
        strokeWidth: serial.width,
        text: '',
        clamp: false
      })
    } else if (serial.type === 'BOX') {
      this.addMark({
        id: serialId,
        boardId: serial.board.toLowerCase(),
        type: 'rect',
        x1: serial.x1,
        x2: serial.x2,
        y1: serial.y1,
        y2: serial.y2,
        fill: RevertColor(serial.bg_color),
        stroke: RevertColor(serial.color),
        strokeWidth: serial.width || 1
      })
    }
    this.draw()
  }

  // ======= about marks =======
  addMark (opts) {
    this.marksManager.addMark(opts)
  }

  removeMark (id) {
    this.marksManager.removeMark(id)
  }

  removeMarkAll () {
    this.marksManager.removeMarkAll()
  }

  showMark (id) {
    this.marksManager.showMark(id)
  }

  hideMark (id) {
    this.marksManager.hideMark(id)
  }

  // ======= about marks =======
  move (x) {
    if (this.mode === 'fixed') return
    if (this.chartController.move(x)) {
      this.draw()
    }
  }

  zoom (n) {
    if (this.mode === 'fixed') return
    // n 正数放大/负数缩小 n 根柱子
    const oldBarWidth = this.bar.barWidth
    this.bar.zoom(n)
    if (oldBarWidth === this.bar.barWidth) return
    // 缩放后宽度确实有变化才更新
    this.highlightManager.each('resize')
    this.chartController.zoom() // 重新计算了 leftId rightId

    this.xAxis.resetPosition()
    this.draw()
  }

  readyToDraw () {
    return this.dm.readyToDraw()
  }

  draw () {
    if (this.mainSeries.last_id === -1) return
    if (this.mainSeries.last_id - this.range.rightId === 1) {
      this.chartController.setRange(this.mainSeries.last_id - this.bar.barNumbers + 1, this.mainSeries.last_id)
    }
    const { leftId, rightId } = this.chartController.getRange()

    this.xAxis.draw(leftId, rightId, this.mainSeries.data)
    // this._drawBackground(leftId, rightId, this.mainSeries.data)

    // 根据 plots 计算出每个 board 的 YAxis 的 domain
    const boardesDomains = {}
    for (const plotId in this.plots) {
      const domain = this.plots[plotId].getYDomain(leftId, rightId, this.plots[plotId].data || this.mainSeries.data)
      if (Number.isFinite(domain[0]) || Number.isFinite(domain[1])) {
        const boardId = this.plots[plotId].boardId
        const yAlign = this.plots[plotId].yAlign
        boardesDomains[boardId] = boardesDomains[boardId] || {
          left: [Infinity, -Infinity],
          right: [Infinity, -Infinity]
        }
        boardesDomains[boardId][yAlign][0] = Math.min(boardesDomains[boardId][yAlign][0], domain[0])
        boardesDomains[boardId][yAlign][1] = Math.max(boardesDomains[boardId][yAlign][1], domain[1])
      }
    }

    // boards draw
    for (const boardId in this.boards) {
      const domain = boardesDomains[boardId]
      if (!domain) continue
      this.boards[boardId].setDomain(domain.left, 'left') // domain
      this.boards[boardId].setDomain(domain.right, 'right') // domain
      this.boards[boardId].draw(leftId, rightId, this.mainSeries.data) // drawYAxis
    }

    // plots draw
    for (const plotId in this.plots) {
      this.plots[plotId].draw(leftId, rightId, this.plots[plotId].data || this.mainSeries.data)
    }

    this.marksManager.draw()
    this.highlightManager.each('draw')
    this.tradeArrowManager.draw()
    this.positionManager.draw()

    if (!this.chartController.range.isEqual(this.range)) {
      this.range.copy(this.chartController.range)
      this.emit('showRangeChanged', this.range)
    }
  }

  _drawBackground (l, r, data) {
    const quote = this.tqsdk.get_quote(this.symbol)
    if (quote && quote.trading_time) {
      const x = []
      const _getTime = d3.timeFormat('%H:%M:%S')
      const _getDay = d3.timeFormat('%d')
      if (this.duration <= 60 * 1e9) {
        const times = []
        for (const i in quote.trading_time.day) times.push(quote.trading_time.day[i][0])
        if (quote.trading_time.night && quote.trading_time.night.length > 0) {
          for (const i in quote.trading_time.night) times.push(quote.trading_time.night[i][0])
        }
        for (let i = l; i <= r; i++) {
          if (data[i] && times.indexOf(_getTime(data[i].datetime / 1e6)) > -1) {
            x.push((i - l) * this.bar.barWidth + this.bar.barWidth / 2)
          }
        }
      } else if (this.duration < 60 * 60 * 24 * 1e9) {
        const times = []
        const tradingStart = quote.trading_time.night ? 'night' : 'day'
        times.push(quote.trading_time[tradingStart][0][0])
        for (let i = l; i <= r; i++) {
          if (data[i] && times.indexOf(_getTime(data[i].datetime / 1e6)) > -1) {
            x.push((i - l) * this.bar.barWidth + this.bar.barWidth / 2)
          }
        }
      } else if (this.duration <= 5 * 60 * 60 * 24 * 1e9) {
        for (let i = l; i <= r; i++) {
          if (data[i] && data[i - 1]) {
            if (_getDay(data[i].datetime / 1e6) < _getDay(data[i - 1].datetime / 1e6)) {
              x.push((i - l) * this.bar.barWidth + this.bar.barWidth / 2)
            }
          }
        }
      }
      const selections = this.backgroundG.selectAll('line').data(x)
      selections.enter()
        .append('line')
        .attr('y1', 0)
        .attr('y2', this.innerHeight)
        .attr('stroke', '#E6E6E6')
        .attr('stroke-dasharray', '12 6')
        .attr('x1', (d) => d)
        .attr('x2', (d) => d)
      selections.merge(selections)
        .attr('x1', (d) => d)
        .attr('x2', (d) => d)
      selections.exit().remove()
    }
  }
}

TqChart.AppendG = function (parent, className, left = 0, top = 0, maskId = '') {
  const g = parent.append('g').attr('class', className)
  if (left !== 0 || top !== 0) {
    g.attr('transform', `translate(${left},${top})`)
  }
  if (maskId) {
    g.attr('mask', `url(#${maskId})`)
  }
  return g
}

TqChart.AppendMask = function (parent, id, width = 100, height = 100, x = 0, y = 0) {
  return parent.append('mask').attr('id', id)
    .append('rect')
    .attr('x', x).attr('y', y)
    .attr('width', width)
    .attr('height', height)
    .style('fill', '#FFFFFF')
    .attr('stroke', 'none')
}

export default TqChart
