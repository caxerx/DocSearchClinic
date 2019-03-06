<template>
  <full-screen-dialog>
    <div slot="title">{{name}} Profile</div>
    <!-- dialog -->
    <div slot="normalDialog">
      <normal-dialog>
        <div slot="title">Add Item</div>

        <div slot="content">
          <v-form>
            <v-text-field prepend-icon="person" v-model="name" label="Name"></v-text-field>
          </v-form>
        </div>
        <div slot="button">
          <v-btn color="blue darken-1" flat @click="close('normal')">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </div>
      </normal-dialog>
    </div>

    <span slot="content" >
      <h1>Allergy List</h1>
      <div v-for="allergy in allergyList" :key="allergy">{{allergy}}</div>
      <br>
      <!-- search and add item -->
      <h1>Medicine Record</h1>
      <v-layout row wrap justify-space-between>
        <v-flex xs4>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-flex>
        <v-flex xs2 style="text-align:right">
          <v-btn @click="newRecord" color="primary" dark class="mb-2">New Record</v-btn>
        </v-flex>
      </v-layout>
      <br>
      <!-- table -->
      <v-data-table :headers="headers" :search="search" :items="contents" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.no }}</td>
          <td class="text-xs-left">{{ props.item.date }}</td>
          <td class="text-xs-left">{{ props.item.startTime }}</td>
          <td class="text-xs-left">{{ props.item.endTime }}</td>
          <td class="text-xs-left">{{ props.item.symptom }}</td>
          <td class="text-xs-left">{{ props.item.medicine }}</td>
          <td class="text-xs-left">{{ props.item.amount }}</td>
        </template>

        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>
    </span>
    <v-btn slot="button" dark flat @click="close('fullscreen')">Save</v-btn>
  </full-screen-dialog>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import DatePicker from "./DatePicker.vue";
import FullScreenDialog from "@/components/FullScreenDialog.vue";
import NormalDialog from "@/components/Dialog.vue";
import Container from "@/components/Container.vue";

export default {
  data: () => ({
    dialogType: "",
    search: "",
    date: new Date().toISOString().substr(0, 10)
  }),

  computed: {
    ...mapGetters({
      queueData: "getQueueData"
    }),

    name() {
      return this.queueData.viewItem.name;
    },

    allergyList() {
      return this.queueData.viewItem.allergyList;
    },
    headers() {
      console.log(this.queueData.viewItem);
      return this.queueData.recordHeaders;
    },
    contents() {
      return this.queueData.viewItem.record.contents;
    }
  },

  components: {
    FullScreenDialog,
    DatePicker,
    Container,
    NormalDialog
  },

  methods: {
    ...mapActions(["actionOpenDialog","actionCloseDialog"]),
    newRecord() {
      this.actionOpenDialog("normal");
    },
    close(type) {
      console.log(type)
      if (type === "fullscreen") {
        this.actionCloseDialog("fullscreen");
      } else if (type === "normal") {
        this.actionCloseDialog("normal");
      }
    },

    save() {
      this.actionSaveItemFromReservationList();
    }
  }
};
</script>
