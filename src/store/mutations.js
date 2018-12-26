import Vue from 'vue'

// state
export const state = {
    publicData:{
        datePickerType: ""
    }
    
}

// mutations
export const mutations = {
   
    ["datePickerType"](state,type) {
        console.log(state.publicData)
        state.publicData.datePickerType = type;
    },

}

