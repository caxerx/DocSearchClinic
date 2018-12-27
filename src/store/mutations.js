import Vue from 'vue'

// state
export const state = {
        dialog: false
}

// mutations
export const mutations = {

    ["openDialog"](state) {
        state.dialog = true;
        // state.reservationListData.editedItem = Object.assign({}, state.reservationListData.defaultItem);
        // state.reservationListData.editedIndex = -1;
    }, ["closeDialog"](state) {
        state.dialog = false;
        // state.reservationListData.editedItem = Object.assign({}, state.reservationListData.defaultItem);
        // state.reservationListData.editedIndex = -1;
    },

}

