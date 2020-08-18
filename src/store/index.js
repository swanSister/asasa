import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    me: localStorage.me ? JSON.parse(localStorage.me):{},
    viewList: localStorage.viewList ? JSON.parse(localStorage.viewList):[],
    likeList: localStorage.likeList ? JSON.parse(localStorage.likeList):[],
    bookmarkList: localStorage.bookmarkList ? JSON.parse(localStorage.bookmarkList):[],
  },
  mutations: {
    me (state, value) {
      localStorage.setItem('me',JSON.stringify(value)) 
      state.me = value
    },
    viewList (state, value) {
      localStorage.setItem('viewList',JSON.stringify(value)) 
      state.viewList = value
    },
    likeList (state, value) {
      localStorage.setItem('viewList',JSON.stringify(value)) 
      state.likeList = value
    },
    bookmarkList (state, value) {
      localStorage.setItem('bookmarkList',JSON.stringify(value)) 
      state.bookmarkList = value
    },
    
  }
})

export default store
