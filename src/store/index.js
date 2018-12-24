import Vue from 'vue';
import Vuex from 'vuex';
// root

// modules
import login from './modules/login';
import reservation from './modules/reservation';
import count from './modules/count';
import queue from './modules/queue';




Vue.use( Vuex );

export default new Vuex.Store({
  // root

  // 將整理好的 modules 放到 vuex 中組合
  modules: {
    login,
    count,
    reservation,
    queue
  },
  // 嚴格模式，禁止直接修改 state
  strict: true
});