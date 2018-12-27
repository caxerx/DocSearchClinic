<template>
 <normal-dialog>
    <div slot="title">Add Item</div>

    <div slot="content">
      <v-form>
        <v-text-field prepend-icon="person" v-model="name" label="Name"></v-text-field>
        <date-picker/>
        <v-select prepend-icon="access_time" :items="computedTimeList" label="Time" data-vv-name="select" required></v-select>
         <v-select prepend-icon="toc" :items="statusList" label="Status" data-vv-name="select" required></v-select>
      </v-form>
    </div>
    <div slot="button">
      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
    </div>
 </normal-dialog>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import DatePicker from './DatePicker.vue';
import NormalDialog from "@/components/Dialog.vue";

export default {
  data: () => ({
    dialogType: "",
    search: "",
    name: "",
    date:new Date().toISOString().substr(0, 10),
  }),

  computed: {
    ...mapGetters({
      reservationData: "getReservationData",
      reservationListData:"getReservationListData",
    }),

    computedTimeList() {
      var timeList = [];
      var rTimeList = this.reservationData.timeList;
      console.log(rTimeList);
      for(var i=0;i<rTimeList.length;i++){
          timeList.push(rTimeList[i].startTime + " - " + rTimeList[i].endTime);
      }
      return timeList;
    },

    statusList(){
        console.log(this.reservationListData.defaultItem)
        return this.reservationListData.defaultItem.status;
    }
  },

  components: {
    NormalDialog,
    DatePicker
  },

  methods: {
    ...mapActions([
      "actionEditItemFromReservationList",
      "actionCloseDialog",
      "actionSaveItemFromReservationList",
      "actionApprovalItemFromReservationList",
      "actionViewAllergy",
      "actionOpenDialog"
    ]),
    close() {
      this.actionCloseDialog();
    },

    save() {
      this.actionSaveItemFromReservationList();
    }
  }
};
</script>
