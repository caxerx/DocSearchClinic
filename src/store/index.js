import Vue from 'vue';
import Vuex from 'vuex';

// root
import * as getters from './getters.js';
import * as actions from './actions.js';
import { state, mutations } from './mutations.js';
// modules
import login from './modules/login';
import reservation from './modules/reservation';
import count from './modules/count';
import queue from './modules/queue';
import reservationList from './modules/reservationList';




Vue.use( Vuex );

export default new Vuex.Store({
  // root
  state,
  mutations,
  getters,
  actions,

  modules: {
    login,
    count,
    reservation,
    queue,
    reservationList
  },

  strict: true
});