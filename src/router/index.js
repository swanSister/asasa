import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'
import Login from '@/pages/login'
import Auth from '@/pages/auth'
import PostDetail from '@/pages/postDetail'
import PostWriting from '@/pages/postWriting'
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
    },
    {
      path: '/postDetail',
      name: 'postDetail',
      component: PostDetail
    },
    {
      path: '/postWriting',
      name: 'postWriting',
      component: PostWriting
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})
