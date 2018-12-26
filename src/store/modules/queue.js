


const state = {
    queueData:{
        dialog: false,
        headers: [
            {
                text: "No.",
                align: "left",
                value: "no"
    
            },
            { text: "Name", value: "name" },
            { text: "Start Time", value: "startTime" },
            { text: "End Time", value: "endTime" },
            { text: "status", value: "status" },
            { text: "Actions", sortable: false }
        ],
        contents: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0
        },
        defaultItem: {
            name: "",
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0
        },
        allergyItem: {
    
        },
    
        startDate: "",
        endDate: "",
    },

}


const getters = {
    getQueueData:state =>state.queueData,

}


const actions = {
    actionInitializeQueueList({ commit }) {
        commit("initialize")
    },

    actionApprovalItemFromQueue({ commit }, item) {
        commit("approvalItem", item);
    },

    actionEditItemFromQueue({ commit }, item) {
        commit("editItem", item);
    },
    actionOpenDialog({ commit }) {
        commit("openDialog");
    },

    actionCloseDialog({ commit }) {
        commit("closeDialog");

    },
    actionSaveItemFromQueue({ commit }) {
        commit("saveItemFromQueue");
    },
    actionSetStartDate({ commit }, newDate) {
        commit("startDate", newDate);
    },
    actionSetEndDate({ commit }, newDate) {
        commit("endDate", newDate);
    },
    actionViewAllergy({ commit }, item) {
        commit("viewAllergy", item)
    }
}
// mutations
const mutations = {
    ["editItem"](state, item) {
        state.queueData.editedIndex = state.queueData.indexOf(item);
        state.queueData.editedItem = Object.assign({}, item);
        state.queueData.dialog = true;
    },
    ["queueStartDate"](state, newDate) {
        state.queueData.startDate = newDate;
        console.log(state.queueData.startDate)
    },
    ["queueEndDate"](state, newDate) {
        state.queueData.endDate = newDate;
        console.log(state.queueData.endDate)
    },

    ["approvalItem"](state, item) {
        state.queueData.dialog = true;
    },
    ["viewAllergy"](state, item) {
        state.queueData.dialog = true;
        state.queueData.allergyItem = item;
    },
    ["closeDialog"](state) {
        state.queueData.dialog = false;
        // state.queueData.editedItem = Object.assign({}, state.queueData.defaultItem);
        // state.queueData.editedIndex = -1;
    },
    ["openDialog"](state) {
        state.queueData.dialog = true;
        // state.queueData.editedItem = Object.assign({}, state.queueData.defaultItem);
        // state.queueData.editedIndex = -1;
    },

    ["saveItemFromQueue"](state) {
        if (state.queueData.editedIndex > -1) {
            Object.assign(state.queueData.contents[state.queueData.editedIndex], state.queueData.editedItem);
        } else {
            state.queueData.contents.push(state.queueData.editedItem);
        }

        state.queueData.editedItem = Object.assign({}, state.queueData.defaultItem);
        state.queueData.editedIndex = -1;

    },

    ["initialize"](state) {
        //reset
        reset();

        state.queueData.contents = [
            {
                no: 1,
                name: "Frozen Yogurt",

                startTime: "10:00",
                endTime: "10:10",
                isMedicineAllergy: true,
                medicineAllergy: [
                    { id: 1, name: "allergy1", detail: "asdsad" },
                    { id: 2, name: "allergy2", detail: "asdsad" },
                    { id: 3, name: "allergy3", detail: "asdsad" },
                ],
                status: "Waiting",


            },
            {
                no: 2,
                name: "Frozen Yogurt",
                isMedicineAllergy: false,
                startTime: "10:10",
                endTime: "10:20",
                medicineAllergy: ["1", "2", "3"],
                status: "Waiting",


            },
            {
                no: 3,
                name: "Frozen Yogurt",
                isMedicineAllergy: false,
                startTime: "10:20",
                endTime: "10:30",
                medicineAllergy: ["1", "2", "3"],
                status: "Approval",


            },
            {
                no: 4,
                name: "Frozen Yogurt",
                isMedicineAllergy: false,
                startTime: "10:30",
                endTime: "10:40",
                medicineAllergy: ["1", "2", "3"],
                status: "Finish",
            },
            {
                no: 5,
                name: "Frozen Yogurt",
                isMedicineAllergy: false,
                startTime: "10:40",
                endTime: "10:50",
                medicineAllergy: ["1", "2", "3"],
                status: "Cancel",
            },

        ];
    },

}

function reset() {
    state.queueData = {
        dialog: false,
        headers: [
            {
                text: "No.",
                align: "left",
                value: "no"
    
            },
            { text: "Name", value: "name" },
            { text: "Start Time", value: "startTime" },
            { text: "End Time", value: "endTime" },
            { text: "status", value: "status" },
            { text: "Actions", sortable: false }
        ],
        contents: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0
        },
        defaultItem: {
            name: "",
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0
        },
        allergyItem: {
    
        },
    
        startDate: "",
        endDate: "",
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

