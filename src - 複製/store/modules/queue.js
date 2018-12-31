


const state = {
    queueData: {

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
        recordHeaders: [
            {
                text: "No.",
                align: "left",
                value: "no"

            },
            { text: "Date", value: "date" },
            { text: "Start Time", value: "startTime" },
            { text: "End Time", value: "endTime" },
            { text: "Symptom", value: "symptom" },
            { text: "Medicine", value: "medicine" },
            { text: "Amount", value: "amount" },
            
        ],
        contents: [
            {
                no: 1,
                name: "1",
                date: "2018-11-15",
                startTime: "10:00",
                endTime: "10:10",
                status: "Waiting",
                allergyList: ["allergy1", "allergy2"],
                record: {

                    contents: [
                        {
                            no: "1",
                            date: "2018-11-15",
                            startTime: "10:00",
                            endTime: "10:10",
                            symptom: "s1",
                            medicine: "asdsad",
                            amount:100,

                        },
                        {
                            no: "2",
                            date: "2018-11-16",
                            startTime: "10:00",
                            endTime: "10:10",
                            symptom: "asdsad",
                            medicine: "asdsad",
                            amount:200,

                        }
                    ]

                }
            },
            {
                no: 2,
                name: "2",
                date: "2018-11-16",
                startTime: "10:10",
                endTime: "10:20",
                status: "Arrived",
                allergyList: ["allergy1", "allergy2"],
                record: {

                    contents: [
                        {
                            no: "1",
                            date: "2018-11-15",
                            startTime: "10:00",
                            endTime: "10:10",
                            symptom: "asdsad",
                            medicine: "asdsad",
                            amount:100,

                        },
                        {
                            no: "2",
                            date: "2018-11-16",
                            startTime: "10:00",
                            endTime: "10:10",
                            symptom: "asdsad",
                            medicine: "asdsad",
                            amount:100,

                        }
                    ]

                }

            },
            {
                no: 3,
                name: "3",
                date: "2018-11-17",
                startTime: "10:00",
                endTime: "10:10",
                status: "Cancel",
                allergyList: [],
                record: {

                    contents: [
                        {
                            no: "1",
                            date: "2018-11-15",
                            startTime: "10:00",
                            endTime: "10:10",
                            symptom: "asdsad",
                            medicine: "asdsad",
                            amount:100,

                        },
                        {
                            no: "2",
                            date: "2018-11-16",
                            startTime: "10:00",
                            endTime: "10:10",
                            symptom: "asdsad",
                            medicine: "asdsad",
                            amount:100,

                        }
                    ]

                }
            }
        ],
        viewItem: {
            name: "",
            date: "",
            startTime: "",
            endTime: "",
            allergyList: "",
            status: "",
        },
        editedItem: {
            name: "",
            date: "",
            startTime: "",
            endTime: "",
            allergyList: "",
            status: "",

        },
        defaultItem: {
            name: "",
            date: "",
            startTime: "",
            endTime: "",
            allergyList: "",
            status: ["Waiting", "Arrived", "Cancel"],
        },
        datePickerType: "",

    },


}


const getters = {
    getQueueData: state => state.queueData,

}


const actions = {
    actionSetDatePickerTypeFromQueue({ commit }, type) {
        commit("setDatePickerTypeFromQueue", type);
    },
    actionEditItemFromQueue({ commit }, item) {
        commit("editItemFromQueue", item);
    },
    actionviewItemFromQueue({ commit }, item) {
        commit("viewItemFromQueue", item);
    },



}

const mutations = {
    ["setDatePickerTypeFromQueue"](state, type) {
        state.queueData.datePickerType = type;
    },
    ["editItemFromQueue"](state, item) {
        state.queueData.editedIndex = state.queueData.contents.indexOf(item);
        state.queueData.editedItem = Object.assign({}, item);
    },
    ["viewItemFromQueue"](state, item) {
        // state.queueData.editedIndex = state.queueData.contents.indexOf(item);
        state.queueData.viewItem = Object.assign({}, item);
    },


}

function reset() {
    state.queueData = {

    }
}



export default {
    state,
    getters,
    actions,
    mutations
}

