import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import About from './pages/About.vue'
import SettingReservation from './pages/reservation/SettingReservation.vue'
import ReservationList from './pages/ReservationList'
import MedicineRecordList from './pages/MedicineRecordList.vue'
import Consultation from './pages/Consultation.vue'
import FeedBack from './pages/FeedBack'
import OnlineQueueList from './pages/queue/OnlineQueueList'
import ClincQueueList from './pages/queue/ClincQueueList'
import SickLeave from './pages/printing/SickLeave'
import ReferralLetter from './pages/printing/ReferralLetter'
import ViewDoctorInfo from './pages/DoctorInfo/ViewDoctorInfo'
import PatientList from './pages/PatientList'
import Test from './pages/Test'
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
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/patientList',
      name: 'patientList',
      component: PatientList
    },
    {
      path: '/settingReservation',
      name: 'settingeservation',
      component: SettingReservation
    },
    {
      path: '/medicineRecordList',
      name: 'medicineRecordList',
      component: MedicineRecordList
    },
    {
      path: '/reservationList',
      name: 'reservationList',
      component: ReservationList
    },
    {
      path: '/clincQueueList',
      name: 'clincQueueList',
      component: ClincQueueList
    },
    {
      path: '/sickLeave',
      name: 'sickLeave',
      component: SickLeave
    },
    {
      path: '/referralLetter',
      name: 'referralLetter',
      component: ReferralLetter
    },
    {
      path: '/consultation',
      name: 'consultation',
      component: Consultation
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/feedBack',
      name: 'feedBack',
      component: FeedBack
    },
    {
      path: '/about',
      name: 'about',
      component:About
      
    },
    {
      path: '/ViewDoctorInfo', 
      name: 'ViewDoctorInfo', 
      component:ViewDoctorInfo
    }
  ]
})
