<template>
  <div>
    <!-- dialog  -->
    <queue-dialog>
      <div slot="title">hi</div>

      <div slot="content">
        <div v-if="dialogType=='approval'"></div>
        <div v-else-if="dialogType=='edit'">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field :value="editedItem.name" label="Dessert name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field :value="editedItem.calories" label="Calories"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field :value="editedItem.fat" label="Fat (g)"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field :value="editedItem.carbs" label="Carbs (g)"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field :value="editedItem.protein" label="Protein (g)"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </div>
      <div slot="button">
        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
      </div>
    </queue-dialog>
    <!-- table -->
    <date-picker/>
    <v-data-table :headers="headers" :items="tableData" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="justify-center layout px-0">
          <v-btn flat icon color="blue" @click="approvalItem(props.item)">
            <v-icon class="mr-2">done</v-icon>
          </v-btn>
          <v-btn flat icon color="green" @click="editItem(props.item)">
            <v-icon class="mr-2">edit</v-icon>
          </v-btn>
          <v-btn flat icon color="red" @click="deleteItem(props.item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
      <!-- <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>-->
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import QueueDialog from "@/components/queue/Dialog.vue";
import DatePicker from "@/components/DatePicker.vue";

export default {
  data: () => ({
    dialogType: ""
  }),

  computed: {
    // formTitle() {
    //   return this.editedIndex === -1 ? "New Item" : "Edit Item";
    // }
    ...mapGetters({
      dialog: "getDialog",
      headers: "getHeaders",
      tableData: "getTableData",
      editedIndex: "getEditedIndex",
      editedItem: "getEditedItem",
      defaultItem: "getDefaultItem"
    })
  },

  components: {
    QueueDialog,
    DatePicker
  },

  //   watch: {
  //     dialog(val) {
  //       val || this.close();
  //     }
  //   },

  methods: {
    ...mapActions([
      "actionEditItemFromQueue",
      "actionCloseDialog",
      "actionSaveItemFromQueue",
      "actionApprovalItemFromQueue"
    ]),

    approvalItem(item) {
      this.dialogType = "approval";
      this.actionApprovalItemFromQueue(item);
    },

    editItem(item) {
      this.dialogType = "edit";
      this.actionEditItemFromQueue(item);
    },

    close() {
      this.actionCloseDialog();
    },

    save() {
      this.actionSaveItemFromQueue();
    }
  }
};
</script>