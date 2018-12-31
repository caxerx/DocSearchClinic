


const state = {
    reservationListData: {
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
        contents: [
            {
                no: 1,
                name: "",
                date: "",
                startTime: "",
                endTime: "",
                // isMedicineAllergy: true,
                // medicineAllergy: [
                //     { id: 1, name: "allergy1", detail: "asdsad" },
                //     { id: 2, name: "allergy2", detail: "asdsad" },
                //     { id: 3, name: "allergy3", detail: "asdsad" },
                // ],
                status: "",


            },
        ],
        editedIndex: -1,
        editedItem: {
            name: "",
            date: "",
            startTime: "",
            endTime: "",
            status: "",

        },
        defaultItem: {
            name: "",
            date: "",
            startTime: "",
            endTime: "",
            status: ["Waiting","Approval","Finish","Cancel"],
        },
        allergyItem: {

        },
        datePickerType:"",
        datePickerDate: new Date().toISOString().substr(0, 10),
        startDate: "",
        endDate: "",
    },

}


const getters = {
    getReservationListData: state => state.reservationListData,

}


const actions = {
    actionInitializeReservationList({ commit }) {
        commit("initialize")
    },

    actionApprovalItemFromReservationList({ commit }, item) {
        commit("approvalItem", item);
    },

    actionEditItemFromReservationList({ commit }, item) {
        commit("editItemFromReservationList", item);
    },

    actionSaveItemFromReservationList({ commit }) {
        commit("saveItemFromReservationList");
    },
    actionSetStartDate({ commit }, newDate) {
        commit("startDate", newDate);
    },
    actionSetEndDate({ commit }, newDate) {
        commit("endDate", newDate);
    },
    actionViewAllergy({ commit }, item) {
        commit("viewAllergy", item)
    },
    actionResetEditDate({ commit }) {
        commit("resetEditDate");
    },
    actionSetDatePickerTypeFromReservationList({ commit },type) {
        commit("setDatePickerTypeFromReservationList",type);
    },
}
// mutations
const mutations = {
    ["editItemFromReservationList"](state, item) {
        state.reservationListData.editedIndex = state.reservationListData.contents.indexOf(item);
        state.reservationListData.editedItem = Object.assign({}, item);
    },
    ["reservationListStartDate"](state, newDate) {
        state.reservationListData.startDate = newDate;
        console.log(state.reservationListData.startDate)
    },
    ["reservationListEndDate"](state, newDate) {
        state.reservationListData.endDate = newDate;
        console.log(state.reservationListData.endDate)
    },
    ["setEditedItemDate"](state,date){
        state.reservationListData.editedItem.date = date;
    },


    ["setDatePickerDateFromReservationList"](state, newDate) {
        state.reservationListData.datePickerDate = newDate;
    },
    ["setDatePickerTypeFromReservationList"](state,type){
        state.reservationListData.datePickerType=type;
    },

  

    // ["saveItemFromReservationList"](state) {
    //     if (state.reservationListData.editedIndex > -1) {
    //         Object.assign(state.reservationListData.contents[state.reservationListData.editedIndex], state.reservationListData.editedItem);
    //     } else {
    //         state.reservationListData.contents.push(state.reservationListData.editedItem);
    //     }

    //     state.reservationListData.editedItem = Object.assign({}, state.reservationListData.defaultItem);
    //     state.reservationListData.editedIndex = -1;

    // },

    ["resetEditDate"](state) {
        state.reservationListData.editedItem.date = "";
        console.log("reset");
    },

    ["initialize"](state) {
        //reset
        reset();

        state.reservationListData.contents = [
            {
                no: 1,
                name: "Frozen Yogurt",
                date: "2018-10-15",
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
                date: "2018-10-16",
                isMedicineAllergy: false,
                startTime: "10:10",
                endTime: "10:20",
                medicineAllergy: ["1", "2", "3"],
                status: "Waiting",


            },
            {
                no: 3,
                name: "Frozen Yogurt",
                date: "2018-10-17",
                isMedicineAllergy: false,
                startTime: "10:20",
                endTime: "10:30",
                medicineAllergy: ["1", "2", "3"],
                status: "Approval",


            },
            {
                no: 4,
                name: "Frozen Yogurt",
                date: "2018-10-18",
                isMedicineAllergy: false,
                startTime: "10:30",
                endTime: "10:40",
                medicineAllergy: ["1", "2", "3"],
                status: "Finish",
            },
            {
                no: 5,
                name: "Frozen Yogurt",
                date: "2018-10-19",
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
    state.reservationListData = {
  
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
        contents: [
            {
                no: 1,
                name: "",
                date: "",
                startTime: "",
                endTime: "",
                // isMedicineAllergy: true,
                // medicineAllergy: [
                //     { id: 1, name: "allergy1", detail: "asdsad" },
                //     { id: 2, name: "allergy2", detail: "asdsad" },
                //     { id: 3, name: "allergy3", detail: "asdsad" },
                // ],
                status: "",


            },
        ],
        editedIndex: -1,
        editedItem: {
            name: "",
            date: "",
            startTime: "",
            endTime: "",
            status: "",

        },
        defaultItem: {
            name: "",
            date: "",
            startTime: "",
            endTime: "",
            status: ["Waiting","Approval","Finish","Cancel"],
        },
        allergyItem: {

        },
        datePickerType : "",
        datePickerDate: new Date().toISOString().substr(0, 10),
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

