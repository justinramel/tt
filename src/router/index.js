import Vue from 'vue'
import Router from 'vue-router'
import RaceSelector from '@/components/RaceSelector'
import ClubSelector from '@/components/ClubSelector'
import RaceTitle from '@/components/RaceTitle'
import Tabs from '@/components/Tabs'
import Leaderboard from '@/components/Leaderboard'
import Tables from '@/components/Tables'
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
    { path: '/', name: 'root', component: RaceSelector },
    {
      path: '/race/:worksheet',
      components: {
        default: RaceSelector,
        club: ClubSelector,
        raceTitle: RaceTitle,
        tabs: Tabs,
        leaderboard: Leaderboard,
        tables: Tables
      },
      props: {
        default: true,
        club: true
      },
      children: [
        { path: 'startsheet', name: 'startsheet', component: Startsheet },
        { path: 'pb10', name: 'pb10', component: PB10 },
        { path: 'pb25', name: 'pb25', component: PB25 },
        { path: 'pb50', name: 'pb50', component: PB50 },
        { path: 'pb100', name: 'pb100', component: PB100 },
        { path: 'result', name: 'result', component: Result }
      ]
    },
    {
      path: '/race/:worksheet/club/:name',
      components: {
        default: RaceSelector,
        club: ClubSelector,
        raceTitle: RaceTitle,
        tabs: Tabs,
        leaderboard: Leaderboard,
        tables: Tables
      },
      props: {
        default: true,
        club: true
      },
      children: [
        { path: 'startsheet', name: 'club-startsheet', component: Startsheet },
        { path: 'pb10', name: 'club-pb10', component: PB10 },
        { path: 'pb25', name: 'club-pb25', component: PB25 },
        { path: 'pb50', name: 'club-pb50', component: PB50 },
        { path: 'pb100', name: 'club-pb100', component: PB100 },
        { path: 'result', name: 'club-result', component: Result }
      ]
    }
  ]
})
