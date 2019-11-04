import Vue from 'vue'
import App from './App.vue'
import './plugins/iview'
import './registerServiceWorker'
import router from './router'
import store from './store'


Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue(); // Global event bus

const RootData = {
  name: 'tianqin-web',
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth
}

const RootApp = new Vue({
  data: RootData,
  router,
  store,
  render: h => h(App),
  methods: {
    handlerResize: function () {
      RootData.windowHeight = window.innerHeight
      RootData.windowWidth = window.innerWidth
      this.$eventHub.$emit('window_resize', {
        width: RootData.windowWidth,
        height: RootData.windowHeight
      })
    }
  },
  created: function () {
    // https://developer.mozilla.org/en-US/docs/Web/Events/resize
    window.addEventListener('resize', resizeThrottler, false)
    let resizeTimeout
    function resizeThrottler () {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null
          RootApp.handlerResize()
        }, 200)
      }
    }
  },
  errorCaptured: (err, vm, info) => {
    console.error('App.errorCaptured', err, vm, info)
    return false
  }
}).$mount('#app')
