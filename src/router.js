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
          component: () => import(/* webpackChunkName: "patient" */'./page/Reservation.vue'),
          meta: { title: "Reservation" },
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ './page/Login.vue'),
      meta: { title: "Login" },
    }
  ]
})
