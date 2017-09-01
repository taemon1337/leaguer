import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import NewLeaguePage from '@/pages/NewLeaguePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/leagues/new',
      name: 'NewLeaguePage',
      component: NewLeaguePage
    }
  ]
})
