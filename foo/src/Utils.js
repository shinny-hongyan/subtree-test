import * as d3 from 'd3'
import moment from 'moment'

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

const ParseDuartionToString = function (duration) {
  let parseString = ''
  if (duration && duration >= 1e9) {
    const dur = moment.duration(duration / 1e9, 'seconds')
    if (dur.years() > 0) parseString += dur.years() + 'Y'
    if (dur.months() > 0) parseString += dur.months() + 'M'
    if (dur.days() > 0) parseString += dur.days() + 'D'
    if (dur.hours() > 0) parseString += dur.hours() + 'h'
    if (dur.minutes() > 0) parseString += dur.minutes() + 'm'
    if (dur.seconds() > 0) parseString += dur.seconds() + 's'
  }
  return parseString
}

const UpDown = {
  up: (d) => d.open <= d.close,
  down: (d) => d.open > d.close
}
const UpDownKeys = Object.keys(UpDown)

const UpDownEqual = {
  up: (d) => d.open < d.close,
  down: (d) => d.open > d.close,
  equal: (d) => d.open === d.close
}
const UpDownEqualKeys = Object.keys(UpDownEqual)

const createLog = function (style, title, titleColor) {
  return function () {
    const args = Array.from(arguments).join(' ')
    const titleStyle = `color: white; background-color: ${titleColor};`
    console.log.apply(this, ['%c ' + title + ' %c ' + args, titleStyle, style])
  }
}
const CreateConsole = function (title = 'TqChart', titleColor = 'plum') {
  return {
    log: createLog('color: green;', title, titleColor),
    info: createLog('color: blue;', title, titleColor),
    debug: createLog('color: pink;', title, titleColor),
    warn: createLog('color: orange;', title, titleColor),
    error: createLog('color: red;', title, titleColor)
  }
}

const isInteger = v => Number.isInteger(Number(v))
const isNumber = v => Number.isFinite(Number(v))
const RevertColor = function (originColor) {
  let color = typeof originColor === 'string' ? originColor : '' // rgba rgb 34
  if (isInteger(originColor)) {
    const colorStr = originColor.toString(16).padStart(8, 'F') // argb
    const a = parseInt(colorStr.slice(0, 2), 16) / 255
    const r = parseInt(colorStr.slice(2, 4), 16)
    const g = parseInt(colorStr.slice(4, 6), 16)
    const b = parseInt(colorStr.slice(6), 16)
    color = `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return color
}

export {
  UpDown,
  UpDownKeys,
  UpDownEqual,
  UpDownEqualKeys,
  MultiFormat,
  CreateConsole,
  ParseDuartionToString,
  isInteger,
  isNumber,
  RevertColor
}
