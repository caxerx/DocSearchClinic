import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import './plugins/vuetify'

import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import Count from './pages/Count.vue'
import SickLeave from './pages/printing/SickLeave.vue'
import Drawer from './components/Drawer.vue'
import Logo from './components/Logo.vue'
import Test from './pages/Test.vue'
import Print from '@/plugins/print'


import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.lightBlue.darken4,
    secondary: colors.blue.darken1,
    accent: colors.indigo.base, 
  }
})

Vue.use(Print);
Vue.use(require('vue-moment'));



Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(Drawer),
})
