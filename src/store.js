import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: -1,
    role: '',
    workplace: -1,
    selectedDoctor: -1
  },
  mutations: {
    loggedInAs(state, payload) {
      state.userId = payload.userId;
      state.role = payload.role;
      state.workplace = payload.workplace;
      state.selectedDoctor = payload.selectedDoctor;
    }
  },
  actions: {

  }
})
