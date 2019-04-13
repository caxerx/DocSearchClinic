

const state = {
  isLoginSuccess:false,
  login:null,
  
}


const getters = {
  getLogin: state => state.login,
  getLoginIsSuccess: state =>state.isLoginSuccess
}


const actions = {
  actionSetLogin({commit},val){
    commit("setLogin",val);
  },

  actionLogout({commit}){
    commit("logout");
  },
  actionSetLoginSuccess({commit},val){
    commit("setLoginSuccess",val);

  }

}
// mutations
const mutations = {

  ["logout"](state) {
    state.isLoginSuccess = false;
    state.login = null;

  },
  ["setLogin"](state,val){
    state.login = val;
    
  },

  ["setLoginSuccess"](state,val){
    state.isLoginSuccess = val;
    console.log(state.isLoginSuccess)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}