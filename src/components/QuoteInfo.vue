<template>
    <div class="quote-info-container" :style="{height:height + 'px'}">
        <div>{{symbol}}</div>
        <div>最新价 {{quote.last_price}}</div>
    </div>
</template>
<script>
    const initQuote = {
      last_price: '-'
    }
  export default {
    data () {
      return {
        quote: Object.assign({}, initQuote)
      }
    },
    props: {
      symbol: String,
      height: Number
    },
    watch: {
      symbol () {
        this.$tqsdk.subscribe_quote(this.symbol)
        let quote = this.$tqsdk.get_quote(this.symbol)
        updateObject(this.quote, quote)
      }
    },
    created () {
      let self = this
      this.$tqsdk.on('rtn_data', function() {
        let quote = self.$tqsdk.get_quote(self.symbol)
        updateObject(self.quote, quote)
      })
    }
  }
  function updateObject(target, source) {
      Object.keys(initQuote).forEach(function(val, ind, arr){
        if (target[val] !== source[val]) target[val] = source[val]
      })
  }
</script>
<style lang="scss">
    .quote-info-container {
        display: flex;

    }
</style>
