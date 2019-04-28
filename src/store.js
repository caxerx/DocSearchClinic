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
    drawerSize: 300
  },
  mutations: {
    saveRoute(state, route) {
      state.lastRoute = route;
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
    }
  },
  actions: {

  }
})
