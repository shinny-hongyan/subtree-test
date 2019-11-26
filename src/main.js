import Vue from 'vue'
import App from './App.vue'
import TQSDK from 'tqsdk'
import './plugins/iview'
import router from './router'
import store from './store'


Vue.config.productionTip = false
Vue.$eventHub = new Vue(); // Global event bus
Vue.prototype.$eventHub = Vue.$eventHub;

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
  },
  destroyed: () => {}
})

GetTqsdkUrl().then(function(urlJson){
  let ins_url = urlJson['ins_url']
  let md_url = urlJson['md_url']
  let ws_url = urlJson['ws_url']
  Vue.$tqsdk = new TQSDK({
    symbolsServerUrl: ins_url,
    wsQuoteUrl: md_url,
    wsTradeUrl: ws_url
  })
  Vue.prototype.$tqsdk = Vue.$tqsdk
  RootApp.$mount('#app')
})
