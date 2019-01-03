import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import VueFontAwesomeCss from 'vue-fontawesome-css'
import locale from 'element-ui/lib/locale/lang/en'

import App from './App'

import router from './router'
import store from './store'

import '@/assets/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
 
Vue.use(VueFontAwesomeCss)
Vue.use(ElementUI, {locale})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
