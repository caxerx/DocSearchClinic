import Vue from 'vue'

// state
export const state = {
    dialog:{
        normal:false,
        fullscreen:false,
    }
}

// mutations
export const mutations = {

    ["openDialog"](state, type) {
        if (type === "normal") {
            state.dialog.normal = true;
            console.log(state.dialog.normal)
        } else if (type === "fullscreen") {
            state.dialog.fullscreen = true;
            console.log(state.dialog.fullscreen)
        }
        // state.reservationListData.editedItem = Object.assign({}, state.reservationListData.defaultItem);
        // state.reservationListData.editedIndex = -1;
    },
    ["closeDialog"](state, type) {
        if (type === "normal") {
            state.dialog.normal= false;
            console.log(state.dialog.normal)
        } else if (type === "fullscreen") {
            state.dialog.fullscreen = false;
            console.log(state.dialog.fullscreen)
        }
        // state.reservationListData.editedItem = Object.assign({}, state.reservationListData.defaultItem);
        // state.reservationListData.editedIndex = -1;
    },

}

