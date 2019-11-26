<template>
    <div>
        <RadioGroup v-model="selectedPeriod" type="button" size="small">
            <Radio v-for="item in periods" :label="item" :key="item"></Radio>
        </RadioGroup>
    </div>
</template>

<script>
  const Periods = {
    '1m': 60 * 1e9,
    '5m': 60 * 5 * 1e9,
    '15m': 60 * 15 * 1e9,
    '30m': 60 * 30 * 1e9,
    '1h': 60 * 60 * 1e9,
    '1d': 60 * 60 * 24 * 1e9
  }
  export default {
    data: function () {
      return {
        periods: Object.keys(Periods),
        selectedPeriod: '1m',
        selectedDuration: Periods['1m'],

        instrumentId: 'KQ.m@CFFEX.IF',
        symbolDurationList: [],
        windowInnerHeight: window.innerHeight,
        chartHeight: 400,
        paneHeight: 400,
      }
    },
    watch: {
      selectedPeriod () {
        document.querySelectorAll('input[type=radio]').forEach(item => item.blur())
        this.selectedDuration = Periods[this.selectedPeriod]
      },
      selectedDuration (newVal, oldVal) {
        let periods_index = Object.values(Periods).indexOf(this.selectedDuration)
        if (periods_index > -1) this.selectedPeriod = this.periods[periods_index]
        this.$emit('onChange', { dur_nano: newVal })
      },
      selectReportObj (newVal, oldVal) {
        if (newVal && newVal.report_id) {
          this.$root.remoteDM.selectReportId(newVal.report_id)
          this.$emit('global:selectReport', newVal)
        } else if (newVal === undefined) {
          this.$root.remoteDM.selectReportId('')
          this.$emit('global:selectReport', '')
        }
      }
    },
    beforeDestroy () {
      document.removeEventListener('keyup', this.keyUpHandler, true)
    },
    mounted () {
      document.addEventListener('keyup', this.keyUpHandler, true)
      let that = this
      this.$root.remoteDM.on('checkout_filepath', function () {
        that.reportsList = Object.values(that.$root.remoteDM.selectedReportsMap)
        if (that.$root.remoteDM.selectedReportsDefaultReportId) {
          let id = that.$root.remoteDM.selectedReportsDefaultReportId
          that.selectReportObj = that.$root.remoteDM.selectedReportsMap[id]
        } else if (that.reportsList.length > 0) {
          that.selectReportObj = that.reportsList[0]
        } else {
          that.selectReportObj = undefined
        }
      })
      this.$root.remoteDM.on('subscribed_symbols', function () {
        that.symbolDurationList = that.$root.remoteDM.symbolDurationList
        let defaultSymbol = that.symbolDurationList[0]
        if (defaultSymbol) {
          if (that.instrumentId !== defaultSymbol.symbol) {
            that.instrumentId = defaultSymbol.symbol
            if (defaultSymbol.dur_nano) {
              that.selectedDuration = defaultSymbol.dur_nano
              that.$emit('onChange', { symbol: that.instrumentId, dur_nano: that.selectedDuration })
            } else {
              that.$emit('onChange', { symbol: that.instrumentId })
            }
          }
        }
      })
    },
    methods: {
      keyUpHandler (key) {
        if (key.code === 'ArrowUp' && this.symbolDurationList.length > 1) { // PageUp键
          this.changeSelectSymbol(-1)
        } else if (key.code === 'ArrowDown' && this.symbolDurationList.length > 1) { // PageDown键
          this.changeSelectSymbol(1)
        }
      },
      changeSelectSymbol (dir) {
        if (this.symbolDurationList.length < 1) return
        let old_index = -1
        for (let i = 0; i < this.symbolDurationList.length; i++) {
          let symbol_dur = this.symbolDurationList[i]
          if (symbol_dur.symbol === this.instrumentId && symbol_dur.dur_nano === this.selectedDuration) {
            old_index = i
            break
          } else if (symbol_dur.symbol === this.instrumentId) {
            old_index = i
          }
        }
        let new_index = old_index + dir * 1
        if (old_index === -1) {
          // 没有在列表中找到当前的合约、周期，选用列表最后一个元素
          new_index = this.symbolDurationList.length - 1
        } else {
          if (new_index === -1) {
            new_index = this.symbolDurationList.length - 1
          } else if (new_index === this.symbolDurationList.length) {
            new_index = 0
          }
        }
        let symbol_dur_nano = this.symbolDurationList[new_index]
        this.instrumentId = symbol_dur_nano.symbol
        this.selectedDuration = symbol_dur_nano.dur_nano || this.selectedDuration
        this.$emit('onChange', { symbol: this.instrumentId, dur_nano: this.selectedDuration })
      }
    }
  }
</script>
<style lang="scss">
    .ivu-row.toolsbar {
        background-color: var(--vscode-editor-background, #fff);
        color: var(--vscode-editor-foreground, #000);
    }
</style>
