

const state = {
    tableData: {
        date: new Date().toISOString().substr(0, 10),
        contents: [],
        time: ""
    },
    averageMinutes: 10,
    maxMinutes: 60,
    workingHour: 9,
    startHour: 9,
    reservation_headers:[
        {text:"Start Time",value:"startTime",sortable:false},
        {text:"End Time",value:"endTime",sortable:false},
        {text:"Action",sortable:false},

    ]
    
}


const getters = {
    getDate: state => state.tableData.date,
    getContents: state => state.tableData.contents,
    getTime: state => state.tableData.time,
    getReservationHeaders:state =>state.reservation_headers,
}

const actions = {


    actionSetDate({ commit }, newDate) {
        commit("setDate", newDate);
    },

    actionSetDefaultFMreservation({ commit }) {
        commit("setDefaultFMreservation");
    },
    actionSetTime({commit},time){
        commit("setTime",time);
    },
    actionReset({commit}){
        commit("reset");
    }

    

}
// mutations
const mutations = {
    ["setDate"](state, newDate) {
        state.tableData.date = newDate;
        //reset
        state.tableData.time="";
        state.tableData.contents=[];
        var value = state.startHour;
        var minutes = [];
        for (var i = 0; i < state.maxMinutes; i += state.averageMinutes) {
            minutes.push(i);
        }
        for (var i = 0; i < state.workingHour; i++) {
            for (var j = 0; j < minutes.length; j++) {
                //for xx:05 min
                if (minutes[j] < 10) {
                    var startTime = value + ":0" + minutes[j];
                } else {
                    var startTime = value + ":" + minutes[j];
                }

                //for xx:05 min
                if (minutes[j + 1] < 10) {
                    var endTime = value + ":0" + minutes[j + 1];
                    //for xx:00 min
                } else if (j == minutes.length - 1) {
                    var endTime = value + 1 + ":00";
                } else {
                    var endTime = value + ":" + minutes[j + 1];
                }
           


                if (startTime == "9:00" && endTime == "9:10") {
                    state.tableData.contents.push({
                      
                        startTime: startTime,
                        endTime: endTime,
                        status: false
                    });
                } else {
                    state.tableData.contents.push({
                      
                        startTime: startTime,
                        endTime: endTime,
                        status: true
                    });
                }
            }

            value++;
        }

    },
    ["setTime"](state, time) {
        state.tableData.time = time;
        console.log("state ", state.tableData.time );

    },
    ["reset"](state) {
        state.tableData.time = "";
        state.tableData.date = new Date().toISOString().substr(0, 10);
        state.tableData.contents = [];
    },
    ["setDefaultFMreservation"](state) {
        //reset
        state.tableData.time="";
        state.tableData.contents=[];


        var value = state.startHour;
        var minutes = [];
        for (var i = 0; i < state.maxMinutes; i += state.averageMinutes) {
            minutes.push(i);
        }
        for (var i = 0; i < state.workingHour; i++) {
            for (var j = 0; j < minutes.length; j++) {
                //for xx:05 min
                if (minutes[j] < 10) {
                    var startTime = value + ":0" + minutes[j];
                } else {
                    var startTime = value + ":" + minutes[j];
                }

                //for xx:05 min
                if (minutes[j + 1] < 10) {
                    var endTime = value + ":0" + minutes[j + 1];
                    //for xx:00 min
                } else if (j == minutes.length - 1) {
                    var endTime = value + 1 + ":00";
                } else {
                    var endTime = value + ":" + minutes[j + 1];
                }
              


                if (startTime == "9:00" && endTime == "9:10") {
                    state.tableData.contents.push({
                      
                        startTime: startTime,
                        endTime: endTime,
                        status: false
                    });
                } else {
                    state.tableData.contents.push({
                       
                        startTime: startTime,
                        endTime: endTime,
                        status: true
                    });
                }
            }

            value++;
        }

    },
}



export default {
    state,
    getters,
    actions,
    mutations
}