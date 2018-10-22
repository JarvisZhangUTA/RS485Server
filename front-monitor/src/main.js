import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'

import App from './App'

import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})