

const state = {
    dialog: false,
    headers: [
        {
            text: "Dessert (100g serving)",
            align: "left",
            sortable: false,
            value: "name"
        },
        { text: "Name", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Actions", value: "name", sortable: false }
    ],
    tableData: [],
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
    }
}


const getters = {
    getDialog: state => state.dialog,
    getHeaders: state => state.headers,
    getTableData: state => state.tableData,
    getEditedIndex: state => state.editedIndex,
    getEditedItem: state => state.editedItem,
    getDefaultItem: state => state.defaultItem

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

    actionCloseDialog({commit}) {
        commit("closeDialog");

    },

    actionSaveItemFromQueue({commit}) {
        commit("saveItemFromQueue");
    },



}
// mutations
const mutations = {
    ["editItem"](state, item) {
        state.editedIndex = state.tableData.indexOf(item);
        state.editedItem = Object.assign({}, item);
        state.dialog = true;
    },

    ["approvalItem"](state,item){
        state.dialog=true;
    },
    ["closeDialog"](state) {
            state.dialog = false;
            // state.editedItem = Object.assign({}, state.defaultItem);
            // state.editedIndex = -1;
    },

    ["saveItemFromQueue"](state) {
        if (state.editedIndex > -1) {
            Object.assign(state.tableData[state.editedIndex], state.editedItem);
        } else {
            state.tableData.push(state.editedItem);
        }

            state.editedItem = Object.assign({}, state.defaultItem);
            state.editedIndex = -1;

    },

    ["initialize"](state) {
        state.dialog=false;
        state.tableData = [
            {
                name: "Frozen Yogurt",
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0
            },
            {
                name: "Ice cream sandwich",
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3
            },
            {
                name: "Eclair",
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0
            },
            {
                name: "Cupcake",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3
            },
            {
                name: "Gingerbread",
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9
            },
            {
                name: "Jelly bean",
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0
            },
            {
                name: "Lollipop",
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0
            },
            {
                name: "Honeycomb",
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5
            },
            {
                name: "Donut",
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9
            },
            {
                name: "KitKat",
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7
            }
        ];
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}