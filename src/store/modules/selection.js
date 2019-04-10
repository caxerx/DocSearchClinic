


const state = {
    selectDoctor: {
        id:1,
        name:"Herman",
    },
}


const getters = {
    getSelectDoctor: state => state.selectDoctor,

}


const actions = {
    actionSetSelectDoctor({commit},doctor){
        commit("setSelectDoctor",doctor)
    },
    
}
// mutations
const mutations = {
    ["setSelectDoctor"](state,doctor){
        state.selectDoctor = doctor;
        console.log( state.selectDoctor)
    },
 
}




export default {
    state,
    getters,
    actions,
    mutations
}

