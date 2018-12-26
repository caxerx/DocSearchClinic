<template>
  <div>
    <!-- dialog  -->
    <queue-dialog>
      <div slot="title">hi</div>

      <div slot="content">
        <div v-if="dialogType=='add'">asdsad</div>
        <div v-if="dialogType=='approval'"></div>
        <div v-else-if="dialogType=='edit'"></div>
      </div>
      <div slot="button">
        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
      </div>
    </queue-dialog>

    <v-layout row wrap justify-space-between>
      <v-flex xs4>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-flex>
      <v-flex xs2 style="text-align:right">
        <v-btn  @click="open()" color="primary" dark class="mb-2">New Item</v-btn>
      </v-flex>
    </v-layout>
    <br>
    <!-- table -->
    <v-data-table :headers="headers" :search="search" :items="tableData" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.no }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.startTime }}</td>
        <td class="text-xs-left">{{ props.item.endTime }}</td>

        <!-- waiting -->
        <td
          class="text-xs-left"
          v-if="props.item.status==='Waiting'"
          style="color:red"
        >{{ props.item.status }}</td>
        <!-- Approval -->
        <td
          class="text-xs-left"
          v-else-if="props.item.status==='Approval'"
          style="color:blue"
        >{{ props.item.status }}</td>
        <!-- Finish -->
        <td
          class="text-xs-left"
          v-else-if="props.item.status==='Finish'"
          style="color:green"
        >{{ props.item.status }}</td>

        <!-- waiting -->
        <td class="text-xs-left" v-if="props.item.status==='Waiting'">
          <v-btn flat icon color="blue" @click="approvalItem(props.item)">
            <v-icon class="mr-2">done</v-icon>
          </v-btn>
          <v-btn flat icon color="red" @click="deleteItem(props.item)">
            <v-icon>clear</v-icon>
          </v-btn>
        </td>
        <!-- Approval -->
        <td class="text-xs-left" v-if="props.item.status==='Approval'">
          <v-btn flat icon disabled>
            <v-icon class="mr-2">done</v-icon>
          </v-btn>
          <v-btn flat icon color="red" @click="deleteItem(props.item)">
            <v-icon>clear</v-icon>
          </v-btn>
        </td>
        <td class="text-xs-left" v-if="props.item.status==='Finish'">
          <v-btn flat icon disabled>
            <v-icon class="mr-2">done</v-icon>
          </v-btn>
          <v-btn flat icon disabled>
            <v-icon>clear</v-icon>
          </v-btn>
        </td>
        <!-- Finish -->
      </template>

      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >Your search for "{{ search }}" found no results.</v-alert>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import QueueDialog from "@/components/Dialog.vue";
import DatePicker from "@/components/DatePicker.vue";

export default {
  data: () => ({
    dialogType: "",
    search: ""
  }),

  computed: {
    // formTitle() {
    //   return this.editedIndex === -1 ? "New Item" : "Edit Item";
    // }
    ...mapGetters({
      dialog: "getDialog",
      headers: "getReservationListHeaders",
      tableData: "getReservationListTableData",
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
      "actionViewAllergy",
      "actionOpenDialog"
    ]),

    approvalItem(item) {
      this.dialogType = "approval";
      this.actionApprovalItemFromQueue(item);
    },

    viewAllergyDetail(item) {
      // this.dialogType = "viewAllergy";
      // this.actionViewAllergy(item);
    },

    open() {
      this.dialogType = "add";
      this.actionOpenDialog();
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