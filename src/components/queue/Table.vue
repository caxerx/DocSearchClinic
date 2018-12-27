<template>
  <div>
    <!-- dialog  -->
    <div v-if="dialogType=='add'">
      <add-item-form/>
    </div>
    <div v-else-if="dialogType=='edit'">
      <edit-item-form/>
    </div>
    <div v-else-if="dialogType=='viewProfile'">
      <view-profile/>
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
          <v-btn flat icon color="blue" @click="viewProfile(props.item)">
            <v-icon class="mr-2">person</v-icon>
          </v-btn>
          <v-btn flat icon color="blue" @click="approvalItem(props.item)">
            <v-icon class="mr-2">done</v-icon>
          </v-btn>
          <v-btn flat icon color="green" @click="editItem(props.item)">
            <v-icon class="mr-2">edit</v-icon>
          </v-btn>
        </td>
        <!-- Arrived -->
        <td
          class="text-xs-left"
          v-else-if="props.item.status==='Arrived'"
          style="color:blue"
        >{{ props.item.status }}</td>

        <td class="text-xs-left" v-if="props.item.status==='Arrived'">
          <v-btn flat icon color="blue" @click="viewProfile(props.item)">
            <v-icon class="mr-2">person</v-icon>
          </v-btn>
          <v-btn flat icon disabled>
            <v-icon class="mr-2">done</v-icon>
          </v-btn>
          <v-btn flat icon color="green" @click="editItem(props.item)">
            <v-icon class="mr-2">edit</v-icon>
          </v-btn>
        </td>

        <!-- cancel -->
        <td
          class="text-xs-left"
          v-else-if="props.item.status==='Cancel'"
          style="color:grey"
        >{{ props.item.status }}</td>
        <td class="text-xs-left" v-if="props.item.status==='Cancel'">
          <v-btn flat icon color="blue" @click="viewProfile(props.item)">
            <v-icon class="mr-2">person</v-icon>
          </v-btn>
          <v-btn flat icon disabled>
            <v-icon class="mr-2">done</v-icon>
          </v-btn>
          <v-btn flat icon color="green" disabled>
            <v-icon class="mr-2">edit</v-icon>
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
import AddItemForm from "@/components/queue/AddItemForm.vue";
import EditItemForm from "@/components/queue/EditItemForm.vue";
import ViewProfile from "@/components/queue/ViewProfile.vue";

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
      queueData: "getQueueData"
    }),
    dialog() {
      return this.queueData.dialog;
    },
    headers() {
      return this.queueData.headers;
    },
    contents() {
      return this.queueData.contents;
    }
  },

  components: {
    AddItemForm,
    EditItemForm,
    ViewProfile
  },

  //   watch: {
  //     dialog(val) {
  //       val || this.close();
  //     }
  //   },

  methods: {
    ...mapActions([
      "actionCloseDialog",
      "actionOpenDialog",
      "actionSetDatePickerTypeFromQueue",
      "actionEditItemFromQueue",
      "actionviewItemFromQueue"
    ]),

    open() {
      this.dialogType = "add";
      this.actionOpenDialog();
      //   this.actionSetDatePickerType("addItemDialog");
    },

    editItem(item) {
      this.dialogType = "edit";
      this.actionOpenDialog();
      this.actionSetDatePickerTypeFromQueue("editItemDialog");
      this.actionEditItemFromQueue(item);
      //   this.actionSetDatePickerType("editItemDialog");
    },

    viewProfile(item) {
      this.dialogType = "viewProfile";
      this.actionOpenDialog();
      this.actionviewItemFromQueue(item);
      //   this.actionSetDatePickerType("viewItemDialog");
    },

    close() {
      this.actionCloseDialog();
    },

    save() {}
  }
};
</script>