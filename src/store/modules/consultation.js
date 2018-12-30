


const state = {
    consultationData: {
        name:"",
        allergyList:["1","2","3"],
        headers: [
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
            { text: "Action",sortable:false},

        ],
        contents: [
            {

                no: "1",
                date: "2018-11-15",
                startTime: "10:00",
                endTime: "10:10",
                symptom: "s1",
                medicine: ["1","2"],
                amount: 100,

            },
            {
                no: "2",
                date: "2018-11-16",
                startTime: "10:00",
                endTime: "10:10",
                symptom: "asdsad",
                medicine: ["1"],
                amount: 200,

            }
        ],
        
    },
}




const getters = {
    getConsultationData: state => state.consultationData,

}


const actions = {




}

const mutations = {


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

