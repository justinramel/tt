import Vue from 'vue'
import Router from 'vue-router'
import Startsheet from '@/components/Startsheet'
import PB10 from '@/components/PB10'
import PB25 from '@/components/PB25'
import PB50 from '@/components/PB50'
import PB100 from '@/components/PB100'
import Result from '@/components/Result'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'is-active',
  routes: [
    { path: '/', name: 'Startsheet', component: Startsheet },
    { path: '/pb10', name: 'PB10', component: PB10 },
    { path: '/pb25', name: 'PB25', component: PB25 },
    { path: '/pb50', name: 'PB50', component: PB50 },
    { path: '/pb100', name: 'PB100', component: PB100 },
    { path: '/result', name: 'Result', component: Result }
  ]
})
