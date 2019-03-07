import Vue from 'vue';
import Vuex from 'vuex';

// root
import * as getters from './getters.js';
import * as actions from './actions.js';
import { state, mutations } from './mutations.js';
// modules
import login from './modules/login';
import count from './modules/count';
import queue from './modules/queue';
import reservationList from './modules/reservationList';
import consultation from './modules/consultation';
import patientList from './modules/patientList';



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
    queue,
    reservationList,
    consultation,
    patientList
  },

  strict: true
});