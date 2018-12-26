import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import Count from './pages/Count.vue'
import DatePicker from './components/DatePicker.vue'
import Drawer from './components/Drawer.vue'



Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(Drawer),
})
