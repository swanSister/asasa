import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'
import Login from '@/pages/login'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/',
      name: 'login',
      component: Login
    }
  ]
})
