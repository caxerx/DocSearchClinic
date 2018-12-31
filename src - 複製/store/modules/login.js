

const state = {
  isSuccess: false
}


const getters = {
  getIsSuccess: state => state.isSuccess
}


const actions = {

  actionLogin({ commit }, loginSuccess) {
    console.log("state " + loginSuccess + " commit " + commit);
    if (loginSuccess) {
      commit("success");
    } else {
      commit("fail");
    }
  },
  actionLogout({ commit }){
    commit("logout");
  },

}
// mutations
const mutations = {
  ["success"](state) {
    state.isSuccess = true;
    console.log("state ", state.isSuccess);

  },
  ["fail"](state) {

    state.isSuccess = false;
    console.log("state ", state.isSuccess);

  },
  ["logout"](state) {

    state.isSuccess = false;
    console.log("state ", state.isSuccess);

  },
}

export default {
  state,
  getters,
  actions,
  mutations
}