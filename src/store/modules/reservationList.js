


const state = {
    reservationListData: {
        events: [
            {
                title: 'Fuck you man',
                date: new Date().toISOString().substr(0, 10),
                time: '09:00',
                duration: 45
            },
            {
                title: 'Thomas\' Birthday',
                date: new Date().toISOString().substr(0, 10)
            },
            {
                title: 'Mash Potatoes',
                date: new Date().toISOString().substr(0, 10),
                time: '12:30',
                duration: 30
            },
            {
                title: 'asdasd ',
                date: new Date().toISOString().substr(0, 10),
                time: '13:40',
                duration: 30
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

