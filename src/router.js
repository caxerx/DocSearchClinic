import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import About from './pages/About.vue'
import CreateReservation from './pages/reservation/CreateReservation.vue'
import ViewReservation from './pages/reservation/ViewReservation.vue'
import SettingReservation from './pages/reservation/SettingReservation.vue'
import WaitingList from './pages/queue/WaitingList'
import App from './App.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/createReservation',
      name: 'createReservation',
      component: CreateReservation
    },
    {
      path: '/settingReservation',
      name: 'settingeservation',
      component: SettingReservation
    },
    {
      path: '/viewReservation',
      name: 'viewReservation',
      component: ViewReservation
    },
    {
      path: '/waitingList',
      name: 'waitingList',
      component: WaitingList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component:About
      
    }
  ]
})
