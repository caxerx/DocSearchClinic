


const state = {
    selectDoctor: {
        id:6,
        name:"Herman",
    },
    workplace:{
        id:5
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
    actionSetWorkPlace({commit},workplace){
        commit("setWorkplace",workplace)
    }
    
}
// mutations
const mutations = {
    ["setSelectDoctor"](state,doctor){
        state.selectDoctor = doctor;
    },
    ["setWorkplace"](state,workplace){
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

