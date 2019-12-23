<template>
    <div class="replay-control">
        复盘日期： {{formatDt($store.state.replay_dt)}} ({{this.currentSpeed}})
        <ButtonGroup size="small">
            <Button @click="ctrl('play')">
                <Icon type="ios-play"></Icon>
            </Button>
            <Button @click="ctrl('pause')">
                <Icon type="ios-pause"></Icon>
            </Button>
            <Button @click="ctrl('rewind')">
                <Icon type="ios-rewind" />
            </Button>
            <Button @click="ctrl('fastforward')">
                <Icon type="ios-fastforward" />
            </Button>
        </ButtonGroup>
    </div>
</template>
<script>
  import moment from 'moment'
  import store from '../store'
  export default {
    name: "tq-replay-control",
    data: function () {
      return {
        // todo: 初始值目前无法获取，等服务器添加接口后，改成获取当前复盘速度
        currentSpeed: '-'
      }
    },
    props: {
      width: Number
    },
    computed: {
      replayUrl () {
        return this.$store.state.ctrl_url
      }
    },
    methods: {
      setSpeed(speed) {
        fetch(this.replayUrl, {
          method: 'POST',
          body: JSON.stringify({aid: "ratio", "speed": speed}) // body data type must match "Content-Type" header
        }).then(function(response){
          console.log(response)
        });
      },
      ctrl(action) {
        if (action === "play") {
          if (this.currentSpeed === '-') {
            this.currentSpeed = 1
          }
          this.setSpeed(this.currentSpeed)
        } else if (action === "pause") {
          this.setSpeed(0)
        } else if (action === "rewind") {
          if (this.currentSpeed === '-') {
            this.currentSpeed = 1
          } else if (this.currentSpeed <= 5) {
            this.currentSpeed = Math.max(1, this.currentSpeed - 1)
          } else if (this.currentSpeed <= 40){
            this.currentSpeed -= 5
          } else if (this.currentSpeed <= 100) {
            this.currentSpeed -= 10
          }
          this.setSpeed(this.currentSpeed)
        } else if (action === "fastforward") {
          if (this.currentSpeed === '-') {
            this.currentSpeed = 2
          } else if (this.currentSpeed < 5) {
            this.currentSpeed += 1
          } else if (this.currentSpeed < 40){
            this.currentSpeed += 5
          } else if (this.currentSpeed < 100) {
            this.currentSpeed += 10
          } else {
            this.currentSpeed = 100
          }
          this.setSpeed(this.currentSpeed)
        }
      },
      formatDt(dt, format='YYYY-MM-DD') {
        return moment(dt / 1e6).format(format)
      }
    }
  }
</script>
<style lang="scss">
    .replay-control {

    }
</style>
