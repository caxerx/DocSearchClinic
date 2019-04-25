import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./page/AppBase.vue'),
      meta: { title: "Home" },
      children: [
        {
          path: '/queue',
          name: 'Queue',
          component: () => import(/* webpackChunkName: "queue" */'./page/Queue.vue'),
          meta: { title: "Queue" },
        },
        {
          path: '/patient',
          name: 'Patient',
          component: () => import(/* webpackChunkName: "patient" */'./page/Patient.vue'),
          meta: { title: "Patient" },
        },
        {
          path: '/patient/:patientId',
          name: 'Patient Profile',
          meta: { title: "Patient" },
          component: () => import(/* webpackChunkName: "patient" */'./page/Patient.vue'),
          props: true
        },
        {
          path: '/reservation',
          name: 'Reservation',
          component: () => import(/* webpackChunkName: "reservation" */'./page/Reservation.vue'),
          meta: { title: "Reservation" },
        },
        {
          path: '/consultation/:consultationId',
          name: 'Consultation',
          component: () => import(/* webpackChunkName: "consultation" */'./page/Consultation.vue'),
          meta: { title: "Consultation" },
          props: true
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./page/Login.vue'),
      meta: { title: "Login" },
    }
  ]
})
