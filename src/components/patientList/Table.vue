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
    <v-data-table  :headers="headers" :search="search" :items="contents" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.no }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.startTime }}</td>
        <td class="text-xs-left">{{ props.item.endTime }}</td>


        <td class="text-xs-left" >
          <v-btn flat icon color="blue" @click="viewProfile(props.item)">
            <v-icon >person</v-icon>
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
      this.actionOpenDialog("normal");
      //   this.actionSetDatePickerType("addItemDialog");
    },

    editItem(item) {
      this.dialogType = "edit";
      this.actionOpenDialog("normal");
      this.actionSetDatePickerTypeFromQueue("editItemDialog");
      this.actionEditItemFromQueue(item);
      //   this.actionSetDatePickerType("editItemDialog");
    },

    viewProfile(item) {
      this.dialogType = "viewProfile";
      this.actionOpenDialog("fullscreen");
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