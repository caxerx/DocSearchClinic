

const state = {
    reservationData: {
        date: new Date().toISOString().substr(0, 10),
        time: "",
        averageMinutes: 10,
        maxMinutes: 60,
        workingHour: 9,
        startHour: 9,
        headers: [
            { text: "Start Time", value: "startTime", sortable: false },
            { text: "End Time", value: "endTime", sortable: false },
            { text: "Action", sortable: false },
        ],
        timeList: [],
    },
   

}


const getters = {
    getReservationData: state => state.reservationData,
}

const actions = {


    actionSetDate({ commit }, newDate) {
        commit("setDate", newDate);
    },

    actionSetDefaultReservation({ commit }) {
        commit("setDefaultReservation");
    },
    actionSetTime({ commit }, time) {
        commit("setTime", time);
    },
    actionReset({ commit }) {
        commit("reset");
    }



}
// mutations
const mutations = {
    ["setReservationDate"](state, newDate) {
        state.reservationData.date = newDate;
        //reset
        state.reservationData.time = "";
        state.reservationData.timeList = [];
        
        setTestReservationData(state);

    },
    ["setTime"](state, time) {
        state.reservationData.time = time;
        console.log("state ", state.reservationData.time);

    },
    ["reset"](state) {
        state.reservationData.time = "";
        state.reservationData.date = new Date().toISOString().substr(0, 10);
        state.reservationData.timeList = [];
    },
    ["setDefaultReservation"](state) {
        //reset
        state.reservationData.time = "";
        state.reservationData.timeList = [];

        setTestReservationData(state);

    },


}

function setTestReservationData(state) {
    var value = state.reservationData.startHour;
    var minutes = [];
    for (var i = 0; i < state.reservationData.maxMinutes; i += state.reservationData.averageMinutes) {
        minutes.push(i);
    }
    for (var i = 0; i < state.reservationData.workingHour; i++) {
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
                state.reservationData.timeList.push({

                    startTime: startTime,
                    endTime: endTime,
                    status: false
                });
            } else {
                state.reservationData.timeList.push({

                    startTime: startTime,
                    endTime: endTime,
                    status: true
                });
            }
        }

        value++;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}