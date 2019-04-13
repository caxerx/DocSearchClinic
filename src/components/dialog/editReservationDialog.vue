<template>
  <v-dialog :value="dialog" persistent width="400">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Edit reservation
        <v-spacer/>
        <v-btn flat icon dark small @click="cancelDialog()">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field label="Note" prepend-icon="event_note" v-model="note"></v-text-field>
        <v-menu
          :close-on-content-click="false"
          v-model="dateMenu"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            label="Date"
            hint="YYYY-MM-DD format"
            persistent-hint
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" no-title @input="dateMenu = false"></v-date-picker>
        </v-menu>
        <v-text-field
          v-model="startTime"
          label="Start Time"
          persistent-hint
          prepend-icon="access_time"
        ></v-text-field>
        <v-text-field v-model="endTime" label="End Time" persistent-hint prepend-icon="access_time"></v-text-field>
        <v-select :items="statusArr" v-model="status" label="Status" prepend-icon="note"></v-select>
        <v-select :items="typeArr" v-model="type" label="Type" prepend-icon="settings"></v-select>
        <v-spacer/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="editReservation()"
          :disabled="loadingDialog"
          :loading="loadingDialog"
        >Edit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import gql from "graphql-tag";

let moment = require("moment");
const editReservationMutation = gql`
  mutation($data: ReservationInput!, $id: ID!) {
    editReservation(data: $data, id: $id){
        id
        startTime
        endTime
    }
  }
`;
export default {
  data() {
    return {
      note: "",
      dateMenu: false,
      date: "",
      startTime: "",
      endTime: "",
      status: "",
      type: "",
      statusArr: ["waiting", "pending", "checked_in", "expired"],
      typeArr: ["online", "clinc"],
      loadingDialog: false
    };
  },

  computed: {
    ...mapGetters({
      getReservationListData: "getReservationListData",
      getWorkPlace: "getWorkPlace"
    }),

    dialog() {
      return this.getReservationListData.editDialog;
    },
    detail() {
      return this.getReservationListData.detail;
    }
  },
  watch: {
    detail: function(val, old) {
      this.showValue();
    }
  },
  methods: {
    ...mapActions(["actionSetEditDialogFromReservationList","actionSetIsCancelFromReservationList"]),
    cancelDialog() {
      this.actionSetEditDialogFromReservationList(false);
    },
    showValue() {
      this.note = this.detail.note;
      this.date = this.detail.date;
      this.startTime = moment
        .utc(this.detail.reservation.startTime)
        .format("HH:mm");
      this.endTime = moment
        .utc(this.detail.reservation.endTime)
        .format("HH:mm");
      this.status = this.detail.reservation.status;
      this.type = this.detail.reservation.type;
    },

    editReservation() {
      this.loadingDialog = true;
      let start = moment.utc(this.date + " " + this.startTime).format();
      let end = moment.utc(this.date + " " + this.endTime).format();
      console.log(this.detail.patient.id);
      let reservationInput = {
        reserverId: this.detail.reservation.doctor.id,
        patientId: this.detail.patient.id,
        doctorId: this.detail.reservation.doctor.id,
        workplaceId: this.getWorkPlace.id,
        note: this.note,
        startTime: start,
        endTime: end,
        status: this.status,
        type: this.type
      };
      console.log("rid ,"+this.detail.reservation.id)
      this.$apollo
        .mutate({
          // Query
          mutation: editReservationMutation,
          // Parameters
          variables: {
            id: this.detail.reservation.id,
            data: reservationInput
          }
        })
        .then(data => {
          // Result
          console.log(data)
          this.loadingDialog = false;
          this.actionSetIsCancelFromReservationList(true)
          this.cancelDialog();
        })
        .catch(error => {
          // Error
          console.error(error);
        });
    }
  }
};
</script>
