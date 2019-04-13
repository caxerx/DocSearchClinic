


const state = {
    selectDoctor: {
        id:"",
        name:"",
    },
    workplace:{

    }
}


const getters = {
    getSelectDoctor: state => state.selectDoctor,
    getWorkPlace:state =>state.workplace,

}


const actions = {
    actionSetSelectDoctor({commit},doctor){
        commit("setSelectDoctor",doctor)
    },
    actionSetWorkPlaceForDrawer({commit},workplace){
        commit("setWorkplaceForDrawer",workplace)
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
    }
 
}




export default {
    state,
    getters,
    actions,
    mutations
}

