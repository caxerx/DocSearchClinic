


const state = {
    reservationListData: {
        patientList: [
            {
                name: 'patient1',
                date: new Date().toISOString().substr(0, 10),
                details: 'break legs!',
                time: '09:00',
                duration: 45,
                gender: "Male",
                email: "ikouhaha888@gmail.com",
                phoneNo: "12345678",
                dob: "09/09/1999",
                hkid: "R1234567(7)",
                allergy: "1,2,3,4,5",
                doctor:"Dr. Michael Wong"
             
            },
            {
                name: 'patient2',
                date: '2019-03-15',
                details: 'break legs!',
                time: '12:30',
                duration: 30,
                gender: "Male",
                email: "ikouhaha888@gmail.com",
                phoneNo: "12345678",
                dob: "09/09/1999",
                hkid: "R1234567(7)",
                allergy: "1,2,3,4,5",
                doctor:"Dr. Michael Wong"
                
            },
            {
                name: 'patient3',
                date: new Date().toISOString().substr(0, 10),
                details: 'break legs!',
                time: '13:40',
                duration: 30,
                gender: "Male",
                email: "ikouhaha888@gmail.com",
                phoneNo: "12345678",
                dob: "09/09/1999",
                hkid: "R1234567(7)",
                allergy: "1,2,3,4,5",
                doctor:"Dr. Michael Wong"
               
            },
            {
                name: 'patient4',
                date: '2019-03-16',
                details: 'break legs!',
                time: '13:40',
                duration: 30,
                gender: "Male",
                email: "ikouhaha888@gmail.com",
                phoneNo: "12345678",
                dob: "09/09/1999",
                hkid: "R1234567(7)",
                allergy: "1,2,3,4,5",
                doctor:"Dr. Michael Wong"
               
            }
        ]
    },

}


const getters = {
    getReservationListData: state => state.reservationListData,

}


const actions = {

}
// mutations
const mutations = {
    ["editItemFromReservationList"](state, item) {
        state.reservationListData.editedIndex = state.reservationListData.contents.indexOf(item);
        state.reservationListData.editedItem = Object.assign({}, item);
    },


}




export default {
    state,
    getters,
    actions,
    mutations
}

