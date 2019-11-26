import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { FormatDirection, FormatOffset, ObjectToArray } from '@/plugins/utils'
Vue.use(Vuex)

const MutationAppend = {
  log: function(state, payload) {
    payload.formatDatetime = moment(payload.datetime / 1000000).format('YYYY-MM-DD HH:mm:ss')
    payload.level = payload.level.toLowerCase()
    state.reports.push(payload)
  },
  trade: function(state, payload) {
    let trade = payload.trade
    let symbol = trade.exchange_id + '.' + trade.instrument_id
    let dir = FormatDirection(trade.direction)
    let offset = FormatOffset(trade.offset)
    payload.formatDatetime = moment(trade.trade_date_time / 1000000).format('YYYY-MM-DD HH:mm:ss')
    payload.level = 'success'
    payload.content = `成交 ${symbol} ${dir}${offset} ${trade.volume}手@${trade.price}`
    state.reports.push(payload)
    state.trades.push(payload)
  },
  order: function(state, payload) {
    let order = payload.order
    let symbol = order.exchange_id + '.' + order.instrument_id
    let dir = FormatDirection(order.direction)
    let offset = FormatOffset(order.offset)
    payload.formatDatetime = moment(order.insert_date_time / 1000000).format('YYYY-MM-DD HH:mm:ss')
    payload.level = 'success'
    payload.content = `下单 ${symbol} ${dir}${offset} ${order.volume_orign}手@${order.limit_price}`
    state.reports.push(payload)
    state.orders.push(payload)
  },
  snapshot: function(state, payload) {
    payload.formatDatetime = moment(payload.datetime / 1000000).format('YYYY-MM-DD HH:mm:ss')
    state.snapshots.push(payload)
  },
}

const store = new Vuex.Store({
  state: {
    user_id: ''
  },
  mutations: {
    set_user_id(state, payload){
      state.user_id = payload.user_id
    }
  },
  actions: {
  }
})

export default store
