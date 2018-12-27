<template>
  <reservation-list-dialog>
    <div slot="title">Edit Item</div>

    <div slot="content">
      <v-form>
        <v-text-field prepend-icon="person" v-model="name" label="Name"></v-text-field>
        <date-picker/>
        <v-select
          prepend-icon="access_time"
          :items="computedTimeList"
          v-model="time"
          label="Time"
          data-vv-name="select"
          required
        ></v-select>
        <v-select
          prepend-icon="toc"
          :items="statusList"
          label="Status"
          v-model="status"
          data-vv-name="select"
          required
        ></v-select>
      </v-form>
    </div>
    <div slot="button">
      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
    </div>
  </reservation-list-dialog>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import DatePicker from "./DatePicker.vue";
import ReservationListDialog from "@/components/Dialog.vue";

export default {
  data: () => ({
    dialogType: "",
    search: ""
  }),

  computed: {
    ...mapGetters({
      reservationListData: "getReservationListData",
      reservationData: "getReservationData"
    }),

    $state() {
      return this.$store.state;
    },
    $datePickerType() {
      return this.$state.reservationList.reservationListData.datePickerType;
    },

    date() {
      if (this.$datePickerType == "editItemDialog") {
        return this.$state.reservationList.reservationListData.editedItem.date;
      } else if (this.$datePickerType == "addItemDialog") {
        return this.$state.reservationList.reservationListData.datePickerDate;
      }
    },

    name: {
      get() {
        return this.$state.reservationList.reservationListData.editedItem.name;
      },
      set(name) {}
    },

    time: {
      get() {
        var startTime = this.$state.reservationList.reservationListData.editedItem.startTime;
        var endTime = this.$state.reservationList.reservationListData.editedItem.endTime;
        return startTime + " - " + endTime;
      },
      set(time) {}
    },

    statusList() {
      return this.$state.reservationList.reservationListData.defaultItem.status;
    },

    status: {
      get() {
        var status = this.$state.reservationList.reservationListData.editedItem.status;
        return status;
      },
      set(status) {}
    },

    computedTimeList() {
      var timeList = [];
      var rTimeList = this.reservationData.timeList;
      console.log(rTimeList);
      for (var i = 0; i < rTimeList.length; i++) {
        timeList.push(rTimeList[i].startTime + " - " + rTimeList[i].endTime);
      }
      return timeList;
    }
  },

  components: {
    ReservationListDialog,
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
      console.log(
        this.name + " " + this.date + " " + this.time + " " + this.status
      );
      //   this.actionSaveItemFromReservationList();
    }
  }
};
</script>
