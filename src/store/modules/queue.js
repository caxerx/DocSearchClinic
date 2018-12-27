


// const state = {
//     queueData: {
//         dialog: false,
//         headers: [
//             {
//                 text: "No.",
//                 align: "left",
//                 value: "no"

//             },
//             { text: "Name", value: "name" },
//             { text: "Start Time", value: "startTime" },
//             { text: "End Time", value: "endTime" },
//             { text: "status", value: "status" },
//             { text: "Actions", sortable: false }
//         ],
//         contents: [
//             {
//                 no: 1,
//                 name: "",
//                 date: "",
//                 startTime: "",
//                 endTime: "",
//                 // isMedicineAllergy: true,
//                 // medicineAllergy: [
//                 //     { id: 1, name: "allergy1", detail: "asdsad" },
//                 //     { id: 2, name: "allergy2", detail: "asdsad" },
//                 //     { id: 3, name: "allergy3", detail: "asdsad" },
//                 // ],
//                 status: "",


//             },
//         ],
//         editedIndex: -1,
//         editedItem: {
//             name: "",
//             date: "",
//             startTime: "",
//             endTime: "",
//             status: "",

//         },
//         defaultItem: {
//             name: "",
//             date: "",
//             startTime: "",
//             endTime: "",
//             status: ["Waiting","Approval","Finish","Cancel"],
//         },
//         allergyItem: {

//         },
//         datePickerType:"",
//         datePickerDate: new Date().toISOString().substr(0, 10),
//         startDate: "",
//         endDate: "",
//     },

// }


// const getters = {
//     getQueueData: state => state.queueData,

// }


// const actions = {
//     actionInitializeQueueList({ commit }) {
//         commit("initialize")
//     },

//     actionApprovalItemFromReservationList({ commit }, item) {
//         commit("approvalItem", item);
//     },

//     actionEditItemFromReservationList({ commit }, item) {
//         commit("editItem", item);
//     },
//     actionOpenDialog({ commit }) {
//         commit("openDialog");
//     },

//     actionCloseDialog({ commit }) {
//         commit("closeDialog");

//     },
//     actionSaveItemFromReservationList({ commit }) {
//         commit("saveItemFromReservationList");
//     },
//     actionSetStartDate({ commit }, newDate) {
//         commit("startDate", newDate);
//     },
//     actionSetEndDate({ commit }, newDate) {
//         commit("endDate", newDate);
//     },
//     actionViewAllergy({ commit }, item) {
//         commit("viewAllergy", item)
//     },
//     actionResetEditDate({ commit }) {
//         commit("resetEditDate");
//     },
//     actionSetDatePickerType({ commit },type) {
//         commit("setDatePickerType",type);
//     },
// }
// // mutations
// const mutations = {
//     ["editItem"](state, item) {
//         state.queueData.editedIndex = state.queueData.contents.indexOf(item);
//         state.queueData.editedItem = Object.assign({}, item);
//     },
//     ["queueStartDate"](state, newDate) {
//         state.queueData.startDate = newDate;
//         console.log(state.queueData.startDate)
//     },
//     ["queueEndDate"](state, newDate) {
//         state.queueData.endDate = newDate;
//         console.log(state.queueData.endDate)
//     },
//     ["setEditedItemDate"](state,date){
//         state.queueData.editedItem.date = date;
//     },

//     ["approvalItem"](state, item) {
//         state.queueData.dialog = true;
//     },
//     ["viewAllergy"](state, item) {
//         state.queueData.dialog = true;
//         state.queueData.allergyItem = item;
//     },
//     ["closeDialog"](state) {
//         state.queueData.dialog = false;
//         // state.queueData.editedItem = Object.assign({}, state.queueData.defaultItem);
//         // state.queueData.editedIndex = -1;
//     },
//     ["setDatePickerDate"](state, newDate) {
//         state.queueData.datePickerDate = newDate;
//     },
//     ["setDatePickerType"](state,type){
//         state.queueData.datePickerType=type;
//     },

//     ["openDialog"](state) {
//         state.queueData.dialog = true;
//         // state.queueData.editedItem = Object.assign({}, state.queueData.defaultItem);
//         // state.queueData.editedIndex = -1;
//     },

//     // ["saveItemFromReservationList"](state) {
//     //     if (state.queueData.editedIndex > -1) {
//     //         Object.assign(state.queueData.contents[state.queueData.editedIndex], state.queueData.editedItem);
//     //     } else {
//     //         state.queueData.contents.push(state.queueData.editedItem);
//     //     }

//     //     state.queueData.editedItem = Object.assign({}, state.queueData.defaultItem);
//     //     state.queueData.editedIndex = -1;

//     // },

//     ["resetEditDate"](state) {
//         state.queueData.editedItem.date = "";
//         console.log("reset");
//     },

//     ["initialize"](state) {
//         //reset
//         reset();

//         state.queueData.contents = [
//             {
//                 no: 1,
//                 name: "Frozen Yogurt",
//                 date: "2018-10-15",
//                 startTime: "10:00",
//                 endTime: "10:10",
//                 isMedicineAllergy: true,
//                 medicineAllergy: [
//                     { id: 1, name: "allergy1", detail: "asdsad" },
//                     { id: 2, name: "allergy2", detail: "asdsad" },
//                     { id: 3, name: "allergy3", detail: "asdsad" },
//                 ],
//                 status: "Waiting",


//             },
//             {
//                 no: 2,
//                 name: "Frozen Yogurt",
//                 date: "2018-10-16",
//                 isMedicineAllergy: false,
//                 startTime: "10:10",
//                 endTime: "10:20",
//                 medicineAllergy: ["1", "2", "3"],
//                 status: "Waiting",


//             },
//             {
//                 no: 3,
//                 name: "Frozen Yogurt",
//                 date: "2018-10-17",
//                 isMedicineAllergy: false,
//                 startTime: "10:20",
//                 endTime: "10:30",
//                 medicineAllergy: ["1", "2", "3"],
//                 status: "Approval",


//             },
//             {
//                 no: 4,
//                 name: "Frozen Yogurt",
//                 date: "2018-10-18",
//                 isMedicineAllergy: false,
//                 startTime: "10:30",
//                 endTime: "10:40",
//                 medicineAllergy: ["1", "2", "3"],
//                 status: "Finish",
//             },
//             {
//                 no: 5,
//                 name: "Frozen Yogurt",
//                 date: "2018-10-19",
//                 isMedicineAllergy: false,
//                 startTime: "10:40",
//                 endTime: "10:50",
//                 medicineAllergy: ["1", "2", "3"],
//                 status: "Cancel",
//             },

//         ];
//     },

// }

// function reset() {
//     state.queueData = {
//         dialog: false,
//         headers: [
//             {
//                 text: "No.",
//                 align: "left",
//                 value: "no"

//             },
//             { text: "Name", value: "name" },
//             { text: "Start Time", value: "startTime" },
//             { text: "End Time", value: "endTime" },
//             { text: "status", value: "status" },
//             { text: "Actions", sortable: false }
//         ],
//         contents: [
//             {
//                 no: 1,
//                 name: "",
//                 date: "",
//                 startTime: "",
//                 endTime: "",
//                 // isMedicineAllergy: true,
//                 // medicineAllergy: [
//                 //     { id: 1, name: "allergy1", detail: "asdsad" },
//                 //     { id: 2, name: "allergy2", detail: "asdsad" },
//                 //     { id: 3, name: "allergy3", detail: "asdsad" },
//                 // ],
//                 status: "",


//             },
//         ],
//         editedIndex: -1,
//         editedItem: {
//             name: "",
//             date: "",
//             startTime: "",
//             endTime: "",
//             status: "",

//         },
//         defaultItem: {
//             name: "",
//             date: "",
//             startTime: "",
//             endTime: "",
//             status: ["Waiting","Approval","Finish","Cancel"],
//         },
//         allergyItem: {

//         },
//         datePickerType : "",
//         datePickerDate: new Date().toISOString().substr(0, 10),
//         startDate: "",
//         endDate: "",
//     }
// }

// export default {
//     state,
//     getters,
//     actions,
//     mutations
// }

