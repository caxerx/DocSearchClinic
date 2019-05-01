import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: -1,
    role: '',
    workplace: -1,
    selectedDoctor: -1,
    avatar: "",
    avatarBase: "https://dsapi.1lo.li/assets/avatars/",
    removeMainDrawer: false,
    lastRoute: null,
    drawerSize: 300,
    inConsultation: false
  },
  mutations: {
    setConsultation(state, consultation) {
      state.inConsultation = consultation
    },
    saveRoute(state, route) {
      state.lastRoute = route;
    },
    logout(state) {
      localStorage.removeItem('userId')
      localStorage.removeItem('role')
      localStorage.removeItem('workplace')
      localStorage.removeItem('selectedDoctor')
      localStorage.removeItem('avatar')
      
      state.userId = -1;
      state.role = '';
      state.workplace = -1;
      state.selectedDoctor = -1;
      state.avatar = ""
    },
    loggedInAs(state, payload) {
      state.userId = payload.userId;
      state.role = payload.role;
      state.workplace = payload.workplace;
      state.selectedDoctor = payload.selectedDoctor;
      state.avatar = payload.avatar
    },
    hideDrawer(state) {
      state.removeMainDrawer = true
    },
    showDrawer(state) {
      state.removeMainDrawer = false
    },
    setDrawerSize(state, size) {
      state.drawerSize = size;
    },
    switchDoctor(state, id) {
      state.selectedDoctor = id;
      localStorage.setItem('selectedDoctor', id)
    }
  },
  actions: {

  }
})
