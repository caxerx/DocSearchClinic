<template>
  <div>
    <v-card color="grey lighten-4" width="350px" flat>
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="icon">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              <a @click="setPatient(patient)">{{patient.name}}</a>
            </v-list-tile-title>
            <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-list-tile-title v-on="on">{{note}}</v-list-tile-title>
            </template>-->
            <span>{{date}}</span>
            <!-- </v-tooltip> -->
          </v-list-tile-content>
        </v-list-tile>
        <br>
        <v-list-tile-action class="text-md-center">
          <div style="width:70%;display: block;margin-left: auto;margin-right: auto;">
            <v-btn flat block outline>Check-in</v-btn>
          </div>
        </v-list-tile-action>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-tile>
          <v-list-tile-sub-title>
            <v-icon>phone</v-icon>
            {{patient.phoneNo}}
            <br>
            <v-icon>email</v-icon>
            {{patient.email}}
          </v-list-tile-sub-title>
        </v-list-tile>
      </v-list>

      <v-list>
        <v-list-tile>
          <v-list-tile-title>
            <b>{{startTime }}</b>
            for {{duration}} mins
          </v-list-tile-title>
          <v-spacer></v-spacer>
          <v-list-tile-action>
            <v-btn
              v-if="reservation.status==='pending'||reservation.status==='waiting'"
              icon
              left
              @click="showEditDialog()"
            >
              <v-icon color="success">edit</v-icon>
            </v-btn>
            <v-btn v-else disabled icon left @click="showCancelDialog()">
              <v-icon color="error">edit</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn
              v-if="reservation.status==='pending'||reservation.status==='waiting'"
              icon
              left
              @click="showCancelDialog()"
            >
              <v-icon color="error">cancel</v-icon>
            </v-btn>
            <v-btn v-else disabled icon left @click="showCancelDialog()">
              <v-icon color="error">cancel</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import CancelReservationDialog from "@/components/dialog/cancelReservationDialog.vue";
export default {
  data() {
    return {};
  },
  props: {
    // attribute name: Type
    reservation: Object,
    patient: Object,
    icon: String,
    date: String,
    startTime: String,
    duration: Number,
    note: String
  },
  computed: {},
  components: {
    CancelReservationDialog
  },
  methods: {
    ...mapActions([
      "actionSetCancelDialogFromReservationList",
      "actionSetDetailFromReservationList",
      "actionSelectPatientForPatientList",
      "actionSetEditDialogFromReservationList"
    ]),

    setPatient(patient) {
      this.actionSelectPatientForPatientList(patient);
      this.$router.push("/patientList");
    },
    //temporarily time to ampm
    getPatientLink(id) {
      return "/patientList?id=" + id;
    },

    showCancelDialog() {
      let rDetail = {
        reservation: this.reservation,
        patient: this.patient,
        icon: this.icon,
        date: this.date,
        startTime: this.startTime,
        duration: this.duration,
        note: this.note
      };
      console.log(rDetail);
      this.actionSetDetailFromReservationList(rDetail);
      this.actionSetCancelDialogFromReservationList(true);
    },
    showEditDialog(){
      let rDetail = {
        reservation: this.reservation,
        patient: this.patient,
        icon: this.icon,
        date: this.date,
        startTime: this.startTime,
        duration: this.duration,
        note: this.note
      };
        this.actionSetDetailFromReservationList(rDetail);
      this.actionSetEditDialogFromReservationList(true);
    }
  }
};
</script>
