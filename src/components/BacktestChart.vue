<template>
  <div class="backtest-report">
      <!-- 回测资金曲线 -->
      <e-chart ref="echart" height="240px" :width="width+'px'" :path-option="defaultOption">
      </e-chart>
  </div>
</template>

<script>
  import moment from 'moment'
  import EChart from '@/components/charts/echart'
  import { FormatPrice } from '@/utils/formatter'
  export default {
    components: {
      EChart
    },
    data () {
      return {

        daily_yield: [],
        defaultOption: [
          ['grid.top', '16px'],
          ['grid.left', '10px'],
          ['grid.bottom', '0px'],
          ['grid.right', '16px'],
          ['series[0]', {
            type: 'line',
            encode: {
              x: 'datetime',
              y: ['balance']
            },
            smooth: false,
            showAllSymbol: true,
            areaStyle: {}
          }],
          ['yAxis.show', true],
          ['yAxis.type', 'value'],
          ['yAxis.axisLabel', {
            show: true,
            formatter: function (value, index) {
              return value.toFixed(2)
            },
            color: '#333333'
          }],
          ['yAxis.splitLine', {
            show: true
          }],
          ['xAxis.show', true],
          ['xAxis.type', 'time'],
          ['xAxis.axisLabel', {
            show: true,
            color: '#333333'
          }],
          ['xAxis.splitLine', {
            show: true
          }],
          ['xAxis.boundaryGap', false],
          ['tooltip', {
            trigger: 'axis',
            triggerOn: 'mousemove|click'
          }]
        ]
      }
    },
    props: {
      height: Number,
      width: Number
    },
    methods: {
    },
    mounted () {
      let self = this
      this.$tqsdk.on('rtn_data', function() {
        let snapshots = self.$tqsdk.get_by_path(['snapshots'])
        let chartData = []
        for (let dt in snapshots) {
          if (dt > self.$store.state.end_dt) continue
          chartData.push([Number.parseInt(dt / 1e6), snapshots[dt].accounts.CNY.balance])
        }
        self.$refs.echart.update({
              dataset: {
                source: chartData
              }
            })
        console.log(chartData)
      })
//      this.$store.subscribe((mutation, state) => {
//        if (mutation.type === 'mutation_clear_reports') {
//          self.chartData = []
//          self.init_balance = 0
//          self.last_balance = 0
//          self.max_balance = 0
//          self.max_drawdown = 0
//          self.max_drawdown_percent = 0
//          self.daily_yield = []
//        } else if (mutation.type === 'mutation_append_reports') {
//          let id = self.$root.remoteDM.selectedReportsDefaultReportId
//          self.selectReportObj = self.$root.remoteDM.selectedReportsMap[id]
//          if (mutation.payload.aid === 'snapshot' && self.current_report_type === 'BACKTEST') {
//            if (mutation.payload.datetime === 631123200000000000) {
//              self.init_balance = mutation.payload.accounts.CNY.balance
//              self.max_balance = mutation.payload.accounts.CNY.balance
//              return
//            }
//            let datatime = Number.parseInt(mutation.payload.datetime / 1e6)
//            let balance = mutation.payload.accounts.CNY.balance
//            self.chartData.push([datatime, balance])
//            self.$refs.echart.update({
//              dataset: {
//                source: self.chartData
//              }
//            })
//            // 计算账户 收益率 最大回撤
//            self.last_balance = balance
//            if (balance > self.max_balance) {
//              self.max_balance = balance
//            }
//            let drawdown = self.max_balance - balance
//            let drawdown_percent = (self.max_balance - balance) / self.max_balance
//            if (drawdown > self.max_drawdown) {
//              self.max_drawdown = drawdown
//            }
//            if (drawdown_percent > self.max_drawdown_percent) {
//              self.max_drawdown_percent = drawdown_percent
//            }
//            self.daily_yield.push(balance / mutation.payload.accounts.CNY.pre_balance - 1)
//            let mean = math.mean(self.daily_yield)
//            let rf = 0.0001
//            let stddev = math.std(self.daily_yield)
//            self.sharpe_ratio = stddev ? (250 ** (1 / 2) * (mean - rf) / stddev) : Number.POSITIVE_INFINITY
//            let ror = balance / self.init_balance
//            self.annual_yield = ror ** (250 / self.chartData.length)
//          }
//        }
//      })
    }
  }
</script>

<style lang="scss">
  .backtest-report {
    padding-left: 5px;
  }
</style>
