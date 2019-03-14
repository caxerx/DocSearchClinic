


const state = {
    rawTemplate: "",
    htmlTemplate: ""
}

const mutations = {
    setTemplate(state, data) {
        state.rawTemplate = data.rawTemplate;
        state.htmlTemplate = data.htmlTemplate;
    }
}


export default {
    state,
    mutations
}

