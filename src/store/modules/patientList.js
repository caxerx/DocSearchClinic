


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



}

const mutations = {
    ["selectPatientForPatientList"](state, patient) {
        state.patientListData.patient = patient;
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

