<template>
    <div class="account-info" :style="{height:height + 'px'}">
        <div> 账户权益: {{balance}} </div>
        <div> 浮动盈亏: {{float_profit}} </div>
        <div> 保证金占用: {{margin}} </div>
        <div> 日内手续费: {{commission}} </div>
        <div> 可用资金: {{available}} </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        available: '-', // 可用资金
        balance: '-', // 账户权益
        commission: '-', //手续费
        float_profit: '-', // 浮动盈亏
        margin: '-', // 占用资金
      }
    },
    props: {
      height: Number
    },
    mounted () {
      let self = this
      this.$tqsdk.on('rtn_data', function() {
        let account_id = self.$store.state.account_id
        if (!account_id) return
        let account = self.$tqsdk.get({
          name: 'account',
          user_id: account_id,
          currency: 'CNY'
        })
        if (account._epoch === self.$tqsdk.dm._epoch) {
          self.available = account.available
          self.balance = account.balance
          self.commission = account.commission
          self.float_profit = account.float_profit
          self.margin = account.margin
        }
      })
    }
  }
</script>
<style lang="scss">
    .account-info {
        padding: 3px 6px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #e6f7ff;
        font-size: 14px;
        color: black;
        div {
            display: inline-flex;
            width: 20%;
        }
    }
</style>
