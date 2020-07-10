import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'
import Login from '@/pages/login'
import Auth from '@/pages/auth'
import ReAuth from '@/pages/reAuth'
import PostWriting from '@/pages/postWriting'
import PostDetail from '@/pages/postDetail'
import Search from '@/pages/search'
import Chat from '@/pages/chat'
import Alarm from '@/pages/alarm'
import User from '@/pages/user/index'
import UserMine from '@/pages/user/mine'
import UserBookmark from '@/pages/user/bookmark'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta:{
        keepAlive:true,
      }
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
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
    },
    {
      path: '/reAuth',
      name: 'reAuth',
      component: ReAuth
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    },
    {
      path: '/alarm',
      name: 'alarm',
      component: Alarm
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/user/mine',
      name: 'user/mine',
      component: UserMine
    },
    {
      path: '/user/bookmark',
      name: 'user/bookmark',
      component: UserBookmark
    }
  ]
})
