import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./page/AppBase.vue'),
      meta: { title: 'Home' },
      children: [
        {
          path: '/queue',
          name: 'Queue',
          component: () =>
            import(/* webpackChunkName: "queue" */ './page/Queue.vue'),
          meta: { title: 'Queue' }
        },
        {
          path: '/patient',
          name: 'Patient',
          component: () =>
            import(/* webpackChunkName: "patient" */ './page/Patient.vue'),
          meta: { title: 'Patient' }
        },
        {
          path: '/patient/:patientId',
          name: 'Patient Profile',
          meta: { title: 'Patient' },
          component: () =>
            import(/* webpackChunkName: "patient" */ './page/Patient.vue'),
          props: true
        },
        {
          path: '/reservation',
          name: 'Reservation',
          component: () =>
            import(/* webpackChunkName: "reservation" */ './page/Reservation.vue'),
          meta: { title: 'Reservation' }
        },
        {
          path: '/consultation/:consultationId',
          name: 'Consultation',
          component: () =>
            import(/* webpackChunkName: "consultation" */ './page/Consultation.vue'),
          meta: { title: 'Consultation' },
          props: true
        },
        {
          path: '/profile',
          name: 'Profile',
          component: () =>
            import(/* webpackChunkName: "profile" */ './page/Profile.vue'),
          meta: { title: 'Profile' }
        },
        {
          path: '/calendar',
          name: 'Calendar Setting',
          component: () =>
            import(/* webpackChunkName: "calendar" */ './page/CalendarSetting.vue'),
          meta: { title: 'Calendar Setting' }
        },
        {
          path: '/feedback',
          name: 'Feedback',
          component: () =>
            import(/* webpackChunkName: "feedback" */ './page/Feedback.vue'),
          meta: { title: 'Feedback' }
        },
        {
          path: '/template',
          name: 'Template',
          component: () =>
            import(/* webpackChunkName: "template" */ './page/Template.vue'),
          meta: { title: 'Template' }
        },
        {
          path: '/print',
          name: 'Print',
          component: () =>
            import(/* webpackChunkName: "print" */ './page/Print.vue'),
          meta: { title: 'Print' }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () =>
        import(/* webpackChunkName: "login" */ './page/Login.vue'),
      meta: { title: 'Login' }
    }
  ]
});
