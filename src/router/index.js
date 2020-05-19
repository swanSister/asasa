import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'
import Login from '@/pages/login'
import PostDetail from '@/pages/postDetail'
import postWriting from '@/pages/postWriting'
import address from '@/pages/address'
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
      component: postWriting
    },
    {
      path: '/address',
      name: 'address',
      component: address
    }
  ]
})
