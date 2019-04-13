


const state = {
    reservationListData: {
        cancelDialog:false,

    },

}


const getters = {
    getReservationListData: state => state.reservationListData,

}


const actions = {
    actionSetCancelDialogFromReservationList({commit},val){
        commit("setCancelDialogFromReservationList",val)
    },
}
// mutations
const mutations = {
    ["setCancelDialogFromReservationList"](state,val){
        state.reservationListData.cancelDialog = val
    },


}




export default {
    state,
    getters,
    actions,
    mutations
}

