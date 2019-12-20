<template>
    <div class="replay-control">
        复盘日期： {{formatDt($store.state.replay_dt)}} ({{this.currentSpeed | toFixed(1)}})
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
        currentSpeed: 1
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
          this.setSpeed(this.currentSpeed)
        } else if (action === "pause") {
          this.setSpeed(0)
        } else if (action === "rewind") {
          if (Math.abs(this.currentSpeed - 1.1) < 0.00001) this.currentSpeed = Math.max(0.1, this.currentSpeed - 0.1)
          else if (Math.abs(this.currentSpeed - 2.1) < 0.00001) this.currentSpeed -= 0.2
          else if (Math.abs(this.currentSpeed - 5.1) < 0.00001) this.currentSpeed -= 0.5
          else if (Math.abs(this.currentSpeed - 11.1) < 0.00001) this.currentSpeed -= 1.0
          else this.currentSpeed = 10.0
          this.setSpeed(this.currentSpeed)
        } else if (action === "fastforward") {
          if (Math.abs(this.currentSpeed - 1.0) < 0.00001) this.currentSpeed += 0.1
          else if (Math.abs(this.currentSpeed - 2.0) < 0.00001) this.currentSpeed += 0.2
          else if (Math.abs(this.currentSpeed - 5.0) < 0.00001) this.currentSpeed += 0.5
          else if (Math.abs(this.currentSpeed - 10.0) < 0.00001) this.currentSpeed += 1.0
          else this.currentSpeed = 100
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
