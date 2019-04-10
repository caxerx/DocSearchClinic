<template>
  <div style="height:100%">
    <loading-dialog :dialog="dialog"/>
    <v-layout
      v-if="!isClickPatient(patient.id)"
      align-center
      justify-center
      fill-height
    >Select a patient to view details</v-layout>
    <div v-else style="height:100%">
      <div v-if="patient!=null" style="height:100%">
        <div v-if="isRecordEmpty()" style="height:100%">
          <patient-profile-card :patient="patient"/>
          <v-layout align-center justify-center style="height:80%">No Records in this Patient</v-layout>
        </div>

        <div v-else style="height:100%">
          <patient-profile-card :patient="patient"/>

          <medical-record-list :patient="patient"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

import MedicalRecordList from "@/components/patientList/MedicalRecordList.vue";
import PatientProfileCard from "@/components/patientList/PatientProfileCard.vue";
import LoadingDialog from "@/components/dialog/loadingDialog.vue";

export default {
  data: () => ({
    search: "",
    dialogType: ""
  }),

  apollo: {},

  computed: {
    ...mapGetters({
      getPatientListData: "getPatientListData"
    }),
    patient: {
      get() {
        return this.getPatientListData.patient;
      },
      set(val) {
        this.patient = val;
      }
    },
    dialog: {
      get() {
        if (this.$apollo.loading) {
          return true;
        } else {
          return false;
        }
      },
      set(val) {
        this.dialog = val;
      }
    },

  },
  created: function() {
    this.actionResetPatientForPatientList();
  },
  components: {
    MedicalRecordList,
    PatientProfileCard,
    LoadingDialog
  },

  methods: {
    ...mapActions([
      "actionQueryPatientFromPatientList",
      "actionResetPatientForPatientList"
    ]),
    isClickPatient(id) {
      if (id === -1) {
        return false;
      } else {
        return true;
      }
    },
    isRecordEmpty() {
      if (this.patient.consultations.length < 1) {
        return true;
      }

      return false;
    }
  }
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
.left_text {
  width: 20%;
  display: inline-block;
}
.right_text {
  display: inline-block;
  width: 70%;
}
</style>
