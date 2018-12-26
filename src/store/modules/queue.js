


const state = {
    dialog: false,
    reservation_list_headers: [
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
    reservation_list_tableData: [],
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


const getters = {
    getDialog: state => state.dialog,
    getReservationListHeaders: state => state.reservation_list_headers,
    getReservationListTableData: state => state.reservation_list_tableData,
    getEditedIndex: state => state.editedIndex,
    getEditedItem: state => state.editedItem,
    getDefaultItem: state => state.defaultItem,
    getStartDate: state => state.startDate,
    getEndDate: state => state.endDate,
    getAllergyItem: state => state.allergyItem,


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
        state.editedIndex = state.tableData.indexOf(item);
        state.editedItem = Object.assign({}, item);
        state.dialog = true;
    },
    ["startDate"](state, newDate) {
        state.startDate = newDate;
        console.log(state.startDate)
    },
    ["endDate"](state, newDate) {
        state.endDate = newDate;
        console.log(state.endDate)
    },

    ["approvalItem"](state, item) {
        state.dialog = true;
    },
    ["viewAllergy"](state, item) {
        state.dialog = true;
        state.allergyItem = item;
    },
    ["closeDialog"](state) {
        state.dialog = false;
        // state.editedItem = Object.assign({}, state.defaultItem);
        // state.editedIndex = -1;
    },
    ["openDialog"](state) {
        state.dialog = true;
        // state.editedItem = Object.assign({}, state.defaultItem);
        // state.editedIndex = -1;
    },

    ["saveItemFromQueue"](state) {
        if (state.editedIndex > -1) {
            Object.assign(state.reservation_list_tableData[state.editedIndex], state.editedItem);
        } else {
            state.reservation_list_tableData.push(state.editedItem);
        }

        state.editedItem = Object.assign({}, state.defaultItem);
        state.editedIndex = -1;

    },

    ["initialize"](state) {
        //reset
        state.dialog = false;
        state.startTime = "";
        state.endTime = "";
        hallo();

        state.reservation_list_tableData = [
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

        ];
    },

}

function hallo() {

}

export default {
    state,
    getters,
    actions,
    mutations
}

