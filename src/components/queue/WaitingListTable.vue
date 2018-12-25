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
        <div v-else-if="dialogType=='viewAllergy'">
          <v-data-table  :items="allergyItem.medicineAllergy" class="elevation-1" hide-actions hide-headers>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-left">{{ props.item.detail }}</td>
            </template>
          </v-data-table>
          <!-- <div v-for="item in allergyItem.medicineAllergy" :key="item.id" >
               name:{{item.name}} detail:{{item.detail}}
          </div>-->
        </div>
      </div>
      <div slot="button">
        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
      </div>
    </queue-dialog>

    <!-- table -->
    <v-data-table :headers="headers" :items="tableData" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.no }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.startTime }}</td>
        <td class="text-xs-left">{{ props.item.endTime }}</td>
        <td v-if="props.item.isMedicineAllergy " class="text-xs-left" style="color:red">Yes
          <v-btn flat icon color="red" @click="viewAllergyDetail(props.item)">
            <v-icon class="mr-2">remove_red_eye</v-icon>
          </v-btn>
        </td>
        <td v-else>No</td>
        <td
          class="text-xs-left"
          v-if="props.item.status==='Waiting'"
          style="color:red"
        >{{ props.item.status }}</td>
        <td class="text-xs-left" v-else>{{ props.item.status }}</td>
        <td class="text-xs-left">
          <v-btn flat icon color="blue" @click="approvalItem(props.item)">
            <v-icon class="mr-2">done</v-icon>
          </v-btn>
          <!-- <v-btn flat icon color="green" @click="editItem(props.item)">
            <v-icon class="mr-2">edit</v-icon>
          </v-btn>-->
          <v-btn flat icon color="red" @click="deleteItem(props.item)">
            <v-icon>clear</v-icon>
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
import QueueDialog from "@/components/Dialog.vue";
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
      headers: "getWaitingHeaders",
      tableData: "getTableData",
      editedIndex: "getEditedIndex",
      editedItem: "getEditedItem",
      defaultItem: "getDefaultItem",
      allergyItem: "getAllergyItem"
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
      "actionApprovalItemFromQueue",
      "actionViewAllergy"
    ]),

    approvalItem(item) {
      this.dialogType = "approval";
      this.actionApprovalItemFromQueue(item);
    },

    viewAllergyDetail(item) {
      this.dialogType = "viewAllergy";
      this.actionViewAllergy(item);
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