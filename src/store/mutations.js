import Vue from 'vue'

// state
export const state = {
    datePickerType: ""
}

// mutations
export const mutations = {
   
    ["datePickerType"](state,type) {
        state.datePickerType = type;
    },

}

