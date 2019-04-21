import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './plugins/vue-apollo'

Vue.config.productionTip = false

router.beforeEach((to, _, next) => {
  document.title = to.meta.title + " | DocSearch Clinic System";
  next();
});

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
