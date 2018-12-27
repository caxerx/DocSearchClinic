import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import About from './pages/About.vue'
import CreateReservation from './pages/reservation/CreateReservation.vue'
import ViewReservation from './pages/reservation/ViewReservation.vue'
import SettingReservation from './pages/reservation/SettingReservation.vue'
import ReservationList from './pages/ReservationList'
import OnlineQueueList from './pages/queue/OnlineQueueList'
import ClincQueueList from './pages/queue/ClincQueueList'
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
      path: '/reservationList',
      name: 'reservationList',
      component: ReservationList
    },
    {
      path: '/onlineQueueList',
      name: 'onlineQueueList',
      component: OnlineQueueList
    },
    {
      path: '/clincQueueList',
      name: 'clincQueueList',
      component: ClincQueueList
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
