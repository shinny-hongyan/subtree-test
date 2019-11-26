import Vue from 'vue'
import VueRouter from 'vue-router'
import TianqinTwo from '../views/TianqinTwo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tianqin',
    component: TianqinTwo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
