import * as d3 from 'd3'
const formatMillisecond = d3.timeFormat('.%L')
const formatSecond = d3.timeFormat(':%S')
const formatMinute = d3.timeFormat('%H:%M')
const formatHour = d3.timeFormat('%H:%M')
const formatDay = d3.timeFormat('%m%d')
const formatMonth = d3.timeFormat('%m%d')
const formatYear = d3.timeFormat('%y')

function MultiFormat (date) {
  return (d3.timeSecond(date) < date ? formatMillisecond
    : d3.timeMinute(date) < date ? formatSecond
      : d3.timeHour(date) < date ? formatMinute
        : d3.timeDay(date) < date ? formatHour
          : d3.timeMonth(date) < date ? formatDay
            : d3.timeYear(date) < date ? formatMonth
              : formatYear)(date)
}

class XAxis {
  constructor (chart) {
    this.chart = chart
    this.xScale = d3.scaleLinear()
    this.xAxis = d3.axisBottom().scale(this.xScale)
    this._init()
  }

  _init () {
    this.rootG = this.chart.rootG.append('g').attr('class', 'x axis')
    this.resetPosition()
  }

  // 柱子宽度 柱子个数 图表高度改变的时候调用
  resetPosition () {
    this.rootG.attr('transform', 'translate(' + Math.floor(this.chart.bar.barWidth / 2) + ',' + (this.chart.innerHeight + 1) + ')')
    this.xScale.rangeRound([0, this.chart.bar.barNumbers * this.chart.bar.barWidth - this.chart.bar.barWidth])
  }

  draw (leftId, rightId, data) {
    this.xScale.domain([leftId, rightId])
    this.xAxis.tickFormat((x, i) => {
      return data[x] && data[x].datetime ? MultiFormat(data[x].datetime / 1e6) : ''
    })
    this.rootG.call(this.xAxis)
  }
}

export default XAxis
