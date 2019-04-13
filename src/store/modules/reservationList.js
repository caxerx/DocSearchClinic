


const state = {
    reservationListData: {
        cancelDialog:false,
        editDialog:false,
        detail:{

        },

        isCancel:false,
        isEdit:false,
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
    },
    actionSetIsEditFromReservationList({commit},val){
        commit("setIsEditFromReservationList",val)
    },
    actionSetEditDialogFromReservationList({commit},val){
        commit("setEditDialogFromReservationList",val)
    }
}
// mutations
const mutations = {
    ["setCancelDialogFromReservationList"](state,val){
        state.reservationListData.cancelDialog = val
    },
    ["setDetailFromReservationList"](state,val){
        state.reservationListData.detail = val;
        console.log(state.reservationListData.detail)
    },
    ["setIsEditFromReservationList"](state,val){
        state.reservationListData.isEdit = val;
    },
    ["setIsCancelFromReservationList"](state,val){
        state.reservationListData.isCancel = val;
    },
    ["setEditDialogFromReservationList"](state,val){
        state.reservationListData.editDialog = val;
        
    }


}




export default {
    state,
    getters,
    actions,
    mutations
}

