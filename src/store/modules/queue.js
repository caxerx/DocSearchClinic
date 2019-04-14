


const state = {
    queueData: {
        patientQueue:{
            queue:{},
            patient:{
                id:-1
            }
        },
        

    },


}


const getters = {
    getQueueData: state => state.queueData,

}


const actions = {

    actionSetPatientFromQueue({commit},item){
        commit("setPatientFromQueue",item)
    },
    actionResetSelectPatientFromQueue({commit}){
        commit("resetSelectPatientFromQueue");
    }



}

const mutations = {
    ["setQueueRecordsFromQueue"](state, item) {
        state.queueData.queueRecords = item
    },
    ["setPatientFromQueue"](state,item){
        state.queueData.patientQueue = item
    },
    ["resetSelectPatientFromQueue"](state){
        state.queueData.patientQueue = {
            queue:{},
            patient:{
                id:-1
            }
        }
        
    }



}



export default {
    state,
    getters,
    actions,
    mutations
}

