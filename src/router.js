import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import About from './pages/About.vue'

import ReservationList from './pages/ReservationList'
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
import DocumentPrint from './pages/printing/DocumentPrint'
import DocumentTemplate from './pages/printing/DocumentTemplate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        breadcrumb: [
          {
            text: 'Home',
            disabled: false,
          }
        ]
      }
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        breadcrumb: [{
          text: 'Home',
          href: '/',
          disabled: false,
        },
        {
          text: 'Test',
          disabled: true,
          href:'/test'
        }]
      }
    },
    {
      path: '/patientList',
      name: 'patientList',
      component: PatientList,
      meta: {
        breadcrumb: [{
          text: 'Home',
          href: '/',
          disabled: false,
        },
        {
          text: 'patientList',
          disabled: true,
          href:'/patientList'
          
        }]
      }

    },
    {
      path: '/reservationList',
      name: 'reservationList',
      component: ReservationList,
      meta: {
        breadcrumb: [{
          text: 'Home',
          href: '/',
          disabled: false,
        },
        {
          text: 'reservationList',
          disabled: true,
          href:'/reservationList'
          
        }]
      }
    },
    {
      path: '/clincQueueList',
      name: 'clincQueueList',
      component: ClincQueueList,
      meta: {
        breadcrumb: [{
          text: 'Home',
          href: '/',
          disabled: false,
        },
        {
          text: 'clincQueueList',
          disabled: true,
          href:'/clincQueueList'
          
        }]
      }
    },
    {
      path: '/sickLeave',
      name: 'sickLeave',
      component: SickLeave,
      meta: {
        breadcrumb: [{
          text: 'Home',
          href: '/',
          disabled: false,
        },
        {
          text: 'sickLeave',
          disabled: true,
          href:'/sickLeave'
          
        }]
      }
    },
    {
      path: '/referralLetter',
      name: 'referralLetter',
      component: ReferralLetter,
      meta: {
        breadcrumb: [{
          text: 'Home',
          href: '/',
          disabled: false,
        },
        {
          text: 'referralLetter',
          disabled: true,
          href:'/referralLetter'
          
        }]
      }
    },
    {
      path: '/consultation',
      name: 'consultation',
      component: Consultation,
      meta: {
        breadcrumb: [
        ]
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        breadcrumb: [{
          text: 'Home',
          href: '/',
          disabled: false,
        },
        {
          text: 'login',
          disabled: true,
          href:'/login'
          
        }]
      }
    },
    {
      path: '/feedBack',
      name: 'feedBack',
      component: FeedBack,
      meta: {
        breadcrumb: [{
          text: 'Home',
          href: '/',
          disabled: false,
        },
        {
          text: 'feedBack',
          disabled: true,
          href:'/feedBack'
          
        }]
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        breadcrumb: [{
          text: 'Home',
          href: '/',
          disabled: false,
        },
        {
          text: 'about',
          disabled: true,
          href:'/about'
          
        }]
      }

    },
    {
      path: '/ViewDoctorInfo',
      name: 'ViewDoctorInfo',
      component: ViewDoctorInfo,
      meta: {
        breadcrumb: [{
          text: 'Home',
          href: '/',
          disabled: false,
        },
        {
          text: 'ViewDoctorInfo',
          disabled: true,
          href:'/ViewDoctorInfo'
          
        }]
      }
    },
    {
      path: '/DocumentTemplate',
      name: 'DocumentTemplate',
      component: DocumentTemplate,
      meta: {
        breadcrumb: [{
          text: 'Home',
          href: '/',
          disabled: false,
        },
        {
          text: 'DocumentTemplate',
          disabled: true,
          href:'/DocumentTemplate'
          
        }]
      }
    },
    {
      path: '/DocumentPrint',
      name: 'DocumentPrint',
      component: DocumentPrint,
      meta: {
        breadcrumb: [{
          text: 'Home',
          href: '/',
          disabled: false,
        },
        {
          text: 'DocumentPrint',
          disabled: true,
          href:'/DocumentPrint'
          
        }]
      }
    }
  ]
})
