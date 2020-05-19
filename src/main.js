import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './api/api'
import store from './store'
import eventBus from './eventBus'

Vue.config.productionTip = false
Vue.prototype.$eventBus = eventBus
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.use(api,{
  store
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')

