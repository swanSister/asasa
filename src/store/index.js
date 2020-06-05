import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    me: localStorage.me ? JSON.parse(localStorage.me):{},
  },
  mutations: {
    me (state, value) {
      localStorage.setItem('me',JSON.stringify(value)) 
      state.me = value
    },
  }
})

export default store
