import Vue from 'vue'
import Vuex from 'vuex'
import locale from 'element-ui/lib/locale/lang/en'
import ElementUI from 'element-ui'

import App from './App'

import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI, {locale})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
