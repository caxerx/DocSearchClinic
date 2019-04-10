


const state = {
    patientListData: {
        patient: {
            id: -1
        },

        
    },
}




const getters = {
    getPatientListData: state => state.patientListData,

}


const actions = {
    actionSelectPatientForPatientList({ commit }, patient) {
        commit("selectPatientForPatientList", patient)
    },
    actionResetPatientForPatientList({ commit }) {
        commit("resetPatientForPatientList")
    },



}

const mutations = {
    ["selectPatientForPatientList"](state, patient) {
        state.patientListData.patient = patient;
    },
    ["resetPatientForPatientList"](state){
        state.patientListData.patient ={
            id:-1,
        }
    }
}

function reset() {
    state.queueData = {

    }
}



export default {
    state,
    getters,
    actions,
    mutations
}

