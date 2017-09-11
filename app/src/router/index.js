import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import NewLeaguePage from '@/pages/NewLeaguePage'
import LeaguePage from '@/pages/LeaguePage'
import EditLeaguePage from '@/pages/EditLeaguePage'

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
    },
    {
      path: '/leagues/:id',
      name: 'LeaguePage',
      component: LeaguePage
    },
    {
      path: '/leagues/:id/edit',
      name: 'EditLeaguePage',
      component: EditLeaguePage
    }
  ]
})
