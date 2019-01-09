import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
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



Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(Drawer),
})
