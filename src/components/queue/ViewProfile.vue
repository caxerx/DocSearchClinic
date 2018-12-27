<template>
  <full-screen-dialog>
   
        <div slot="title">{{name}} Profile</div>

        <div slot="content">
          <h2>Allergy List</h2>
          <div v-for="allergy in allergyList" :key="allergy">{{allergy}}</div>
        </div>
        <v-btn slot="button" dark flat @click="close">Save</v-btn>

    
  </full-screen-dialog>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import DatePicker from "./DatePicker.vue";
import FullScreenDialog from "@/components/FullScreenDialog.vue";
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
    }
  },

  components: {
    FullScreenDialog,
    DatePicker,
    Container
  },

  methods: {
    ...mapActions([]),
    close() {
      this.actionCloseDialog();
    },

    save() {
      this.actionSaveItemFromReservationList();
    }
  }
};
</script>
