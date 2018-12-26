<template>
  <queue-dialog>
    <div slot="title">Add Item</div>

    <div slot="content">
      <v-form>
        <v-text-field v-model="name" label="Name"></v-text-field>
        <v-select :items="computedTimeList" label="Time" data-vv-name="select" required></v-select>
      </v-form>
    </div>
    <div slot="button">
      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
    </div>
  </queue-dialog>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import QueueDialog from "@/components/Dialog.vue";

export default {
  data: () => ({
    dialogType: "",
    search: "",
    name: ""
  }),

  computed: {
    ...mapGetters({
      reservationTimeList: "getReservationTimeList"
    }),
    computedTimeList() {
      var timeList = [];
      console.log(this.reservationTimeList);
      
      for(var i=0;i<this.reservationTimeList.length;i++){
          timeList.push(this.reservationTimeList[i].startTime + " - " + this.reservationTimeList[i].endTime);
      }
      return timeList;
    }
  },

  components: {
    QueueDialog
  },

  methods: {
    ...mapActions([
      "actionEditItemFromQueue",
      "actionCloseDialog",
      "actionSaveItemFromQueue",
      "actionApprovalItemFromQueue",
      "actionViewAllergy",
      "actionOpenDialog"
    ]),
    close() {
      this.actionCloseDialog();
    },

    save() {
      this.actionSaveItemFromQueue();
    }
  }
};
</script>
