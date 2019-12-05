<template>
    <div class="backtest-info" :style="{height:height + 'px'}">
        起始资金 {{init_balance| toFixed(2)}}
        结束资金 {{balance | toFixed(2)}}
        总收益 {{balance - init_balance | toFixed(2)}}
        总收益率 {{ror | toFixed(2)}}
        年化收益率 {{annual_yield | toFixed(2)}}
        最大回撤 {{max_drawdown| toFixed(2)}}
        总手续费 {{commission| toFixed(2)}}
        年化夏普率 {{sharpe_ratio| toFixed(2)}}
    </div>
</template>
<script>
  import { FormatPrice } from '@/utils/formatter'
  export default {
    data () {
      return {
        init_balance: '-',
        balance: '-',
        ror: '-',
        annual_yield: '-',
        max_drawdown: '-',
        sharpe_ratio: '-',
        commission: '-'
      }
    },
    props: {
      height: Number,
      width: Number
    },
    methods: {
      getMsg: function (n) {
        if (n <= -100) {
          return '幸好是模拟账户，不然你就亏完啦'
        } else if (n <= -50) {
          return '触底反弹,与其执迷修改参数，不如改变策略思路去天勤官网策略库进修'
        } else if (n <= -20) {
          return '越挫越勇，不如去天勤量化官网策略库进修'
        } else if (n <= 0) {
          return '不要灰心，少侠重新来过'
        } else if (n <= 20) {
          return '策略看来小有所成'
        } else if (n <= 50) {
          return '策略看来的得心应手'
        } else if (n <= 100) {
          return '策略看来春风得意，堪比当代索罗斯'
        } else {
          return '策略看来独孤求败，小心过拟合噢'
        }
      }
    },
    mounted () {
      let self = this
      this.$tqsdk.on('rtn_data', function() {
        let account_id = self.$store.state.account_id
        console.log(account_id, 'd account_id')
        if (!account_id) return
        let account = self.$tqsdk.get({
          name: 'account',
          user_id: account_id,
          currency: 'CNY'
        })
        if (account && account._tqsdk_stat) {
          self.init_balance = account._tqsdk_stat.init_balance
          self.balance = account._tqsdk_stat.balance
          self.max_drawdown = account._tqsdk_stat.max_drawdown
          self.annual_yield = account._tqsdk_stat.annual_yield
          self.ror = account._tqsdk_stat.ror
          self.sharpe_ratio = account._tqsdk_stat.sharpe_ratio
          let trades = self.$tqsdk.get({
            name: 'trades',
            user_id: account_id
          })
          let commission = 0
          for (let id in trades) commission += trades[id].commission
          self.commission = commission
        }
      })
    }
  }
</script>
<style lang="scss">
    .backtest-info {
    }
</style>
