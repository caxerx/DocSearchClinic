


const state = {
    reservationListData: {
        cancelDialog:false,
        detail:{

        },

        isCancel:false,
    },

}


const getters = {
    getReservationListData: state => state.reservationListData,

}


const actions = {
    actionSetCancelDialogFromReservationList({commit},val){
        commit("setCancelDialogFromReservationList",val)
    },
    actionSetDetailFromReservationList({commit},val){
        commit("setDetailFromReservationList",val)
    },
    actionSetIsCancelFromReservationList({commit},val){
        commit("setIsCancelFromReservationList",val)
    }
}
// mutations
const mutations = {
    ["setCancelDialogFromReservationList"](state,val){
        state.reservationListData.cancelDialog = val
    },
    ["setDetailFromReservationList"](state,val){
        state.reservationListData.detail = val;
    },
    ["setIsCancelFromReservationList"](state,val){
        state.reservationListData.isCancel = val;
    }


}




export default {
    state,
    getters,
    actions,
    mutations
}

