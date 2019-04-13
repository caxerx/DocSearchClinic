


const state = {
    selectDoctor: {
        id:"",
        name:"",
    },
    workplace:{

    },
    refreshNow:false,
}


const getters = {
    getSelectDoctor: state => state.selectDoctor,
    getWorkPlace:state =>state.workplace,
    getRefreshNow:state=>state.refreshNow,

}


const actions = {
    actionSetSelectDoctor({commit},doctor){
        commit("setSelectDoctor",doctor)
    },
    actionSetWorkPlaceForDrawer({commit},workplace){
        commit("setWorkplaceForDrawer",workplace)
    },
    actionSetRefreshNow({commit},val){
        commit("setRefreshNow",val);
    }
    
}
// mutations
const mutations = {
    ["setSelectDoctor"](state,doctor){
        state.selectDoctor = doctor;
    },
    ["setWorkplaceForDrawer"](state,workplace){
        state.workplace = workplace;
        console.log(state.workplace);
    },
    ["setRefreshNow"](state,val){
        state.refreshNow = val;
    }
 
}




export default {
    state,
    getters,
    actions,
    mutations
}

