


const state = {
    queueData: {
        queueRecords:[],
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

    actionSetQueueRecordsFromQueue({commit},item){
        commit("setQueueRecordsFromQueue",item)
    },
    actionSetPatientFromQueue({commit},item){
        commit("setPatientFromQueue",item)
    }



}

const mutations = {
    ["setQueueRecordsFromQueue"](state, item) {
        state.queueData.queueRecords = item
    },
    ["setPatientFromQueue"](state,item){
        state.queueData.patientQueue = item
    }


}



export default {
    state,
    getters,
    actions,
    mutations
}

