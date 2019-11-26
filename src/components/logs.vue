<template>
    <div class="strategy-log">
        <div class="reports" :style="{height:height + 'px'}">
            <table>
                <thead>
                <tr>
                    <th width="130px">Datetime</th>
                    <th width="20px"></th>
                    <th>Content</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import {FormatDirection, FormatOffset} from '@/utils/formatter'
  export default {
    data () {
      return {
        tbodyRoot: null
      }
    },
    props: {
      height: Number
    },
    mounted () {
      this.tbodyNode = document.querySelector('.reports table tbody')
      let self = this
      this.$tqsdk.on('rtn_data', function(){
        let user_id = self.$store.state.user_id
        if (!user_id) return
        let list = []
        let trades =self.$tqsdk.get({
          name: 'trades',
          user_id
        })
        if (!trades) return
        for(let trade_id in trades){
          if (trades[trade_id]._epoch === self.$tqsdk.dm._epoch) {
            list.push(trades[trade_id])
          }
        }
        list.sort(function (a, b) {
          return a.trade_date_time - b.trade_date_time
        })
        for (let j=0; j<list.length; j++){
          self.append_trade(list[j])
        }
      })
    },
    methods: {
      append_trade (trade) { // trade or log
        let formatdt = moment(trade.trade_date_time / 1000000).format('YYYY-MM-DD HH:mm:ss')
        let dir = FormatDirection(trade.direction)
        let offset = FormatOffset(trade.offset)
        let textcontent = `成交 ${trade.symbol} ${dir}${offset} ${trade.volume}手@${trade.price}`
        let iconClass = []
        if (trade.offset === 'OPEN') {
          iconClass = ['ivu-icon', 'ivu-icon-ios-star', 'type-' + (trade.direction === 'BUY' ? 'error' : 'success')]
        } else {
          iconClass = ['ivu-icon', 'ivu-icon-ios-star-outline', 'type-' + (trade.direction === 'BUY' ? 'success' : 'error')]
        }
        let tr = this.append_tr(formatdt, textcontent, iconClass)
        let self = this
        tr.onclick = function (event) {
          let trs = self.tbodyNode.querySelectorAll('tr')
          trs.forEach(node => node.className = '')
          tr.className = 'selected'
          self.$eventHub.$emit('selectReportId', trade)
        }
        this.tbodyNode.insertBefore(tr, this.tbodyNode.firstChild)
      },
      append_tr (formatdt, textcontent, iconClass) {
        let tr = document.createElement('tr')
        let td_dt = document.createElement('td')
        td_dt.textContent = formatdt
        tr.appendChild(td_dt)

        let td_level = document.createElement('td')
        let icon = document.createElement('i')
        icon.classList.add(...iconClass)
        td_level.appendChild(icon)
        tr.appendChild(td_level)

        let td_content = document.createElement('td')
        td_content.textContent = textcontent
        tr.appendChild(td_content)
        this.tbodyNode.insertBefore(tr, this.tbodyNode.firstChild)
        return tr
      }
    }
  }
</script>
<style lang="scss">
    $red: #F44336;
    $green: #4CAF50;
    $blue: #2196F3;

    .strategy-log {
        height: 100%;
        overflow-y: scroll;
        font-size: 12px;
    }

    .reports {
        overflow: auto;
        width: 100%;
        background-color: var(--vscode-editor-background, #fff);

        table {
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
        }

        table, th, td {
            border-bottom: 1px solid var(--vscode-editorGroup-border, lightgrey);
        }
        th {
            background-color: var(--vscode-activityBar-background, lightgrey);
            color: var(--vscode-activityBar-foreground, #333333);
            position: sticky;
            top: 0;
        }
        td {
            background-color: var(--vscode-editor-background, #fff);
            color: var(--vscode-editor-foreground, #000000);
        }
        th, td {
            padding: 4px;
            text-align: left;
        }
        tbody {
            tr:hover td {
                background-color: var(--vscode-editorHoverWidget-background, #f5f5f5);
            }
            tr.selected td {
                background-color: var(--vscode-list-inactiveSelectionBackground, #90CAF9);
                color: var(--vscode-list-inactiveSelectionForeground, #000000);
            }
        }

        .ivu-icon {
            font-size: 16px;
            &.type-success { color: $green; }
            &.type-error { color: $red; }
            &.type-info { color: $blue; }
        }
    }

    .strategy-log .ivu-table-cell{
        padding-left: 4px;
        padding-right: 4px;
    }

    .ivu-table,
    .ivu-table td{
        background-color: var(--vscode-editor-background, #fff);
        color: var(--vscode-editor-foreground, #000000);
    }

    .ivu-table th{
        background-color: var(--vscode-activityBar-background, lightgrey);
        color: var(--vscode-editor-foreground, #333333);
    }

</style>
