<template>
  <div>
    <!-- dialog  -->
    <div v-if="dialogType=='add'">
      <add-item-form/>
    </div>
    <div v-else-if="dialogType=='edit'">
      <edit-item-form/>
    </div>

    <!-- search and add item -->
    <v-layout row wrap justify-space-between>
      <v-flex xs4>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-flex>
      <v-flex xs2 style="text-align:right">
        <v-btn @click="open()" color="primary" dark class="mb-2">New Item</v-btn>
      </v-flex>
    </v-layout>
    <br>
    <!-- table -->
    <v-data-table :headers="headers" :search="search" :items="contents" class="elevation-1">
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

        <td class="text-xs-left" v-if="props.item.status==='Waiting'">
          <v-btn flat icon color="blue" @click="approvalItem(props.item)">
            <v-icon class="mr-2">done</v-icon>
          </v-btn>
          <v-btn flat icon color="green" @click="editItem(props.item)">
            <v-icon class="mr-2">edit</v-icon>
          </v-btn>
          <v-btn flat icon color="red" @click="deleteItem(props.item)">
            <v-icon>clear</v-icon>
          </v-btn>
        </td>
        <!-- Approval -->
        <td
          class="text-xs-left"
          v-else-if="props.item.status==='Approval'"
          style="color:blue"
        >{{ props.item.status }}</td>

        <td class="text-xs-left" v-if="props.item.status==='Approval'">
          <v-btn flat icon disabled>
            <v-icon class="mr-2">done</v-icon>
          </v-btn>
          <v-btn flat icon color="green" disabled>
            <v-icon class="mr-2">edit</v-icon>
          </v-btn>
          <v-btn flat icon color="red" @click="deleteItem(props.item)">
            <v-icon>clear</v-icon>
          </v-btn>
        </td>
        <!-- Finish -->
        <td
          class="text-xs-left"
          v-else-if="props.item.status==='Finish'"
          style="color:green"
        >{{ props.item.status }}</td>
        <td class="text-xs-left" v-if="props.item.status==='Finish'">
          <v-btn flat icon disabled>
            <v-icon class="mr-2">done</v-icon>
          </v-btn>
          <v-btn flat icon color="green" disabled>
            <v-icon class="mr-2">edit</v-icon>
          </v-btn>
          <v-btn flat icon disabled>
            <v-icon>clear</v-icon>
          </v-btn>
        </td>
        <!-- cancel -->
         <td
          class="text-xs-left"
          v-else-if="props.item.status==='Cancel'"
          style="color:grey"
        >{{ props.item.status }}</td>
        <td class="text-xs-left" v-if="props.item.status==='Cancel'">
          <v-btn flat icon disabled>
            <v-icon class="mr-2">done</v-icon>
          </v-btn>
          <v-btn flat icon color="green" disabled>
            <v-icon class="mr-2">edit</v-icon>
          </v-btn>
          <v-btn flat icon disabled>
            <v-icon>clear</v-icon>
          </v-btn>
        </td>

        
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
import AddItemForm from "@/components/queue/AddItemForm.vue";
import EditItemForm from "@/components/queue/EditItemForm.vue";

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
      queueData:"getQueueData",

    }),
    dialog(){
      return this.queueData.dialog;
    },
    headers(){
      return this.queueData.headers;
    },
    contents(){
      return this.queueData.contents;
    },


  },

  components: {
    QueueDialog,
    DatePicker,
    AddItemForm,
    EditItemForm
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