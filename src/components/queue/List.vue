<template>
  <div style="height:100%" v-if="patient!=null">
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

import MedicalRecordList from "@/components/queue/MedicalRecordList.vue";
import PatientProfileCard from "@/components/queue/PatientProfileCard.vue";

export default {
  data: () => ({
    search: "",
    dialogType: ""
  }),

  computed: {
    // formTitle() {
    //   return this.editedIndex === -1 ? "New Item" : "Edit Item";
    // }
    ...mapGetters({
      getQueueData: "getQueueData"
    }),

    patient: {
      get() {
        console.log( this.getQueueData.patient)
        return this.getQueueData.patient;
      },
      set(val) {
       this.actionSetPatientFromQueue(val);
      }
    }
  },

  components: {
    MedicalRecordList,
    PatientProfileCard
  },

  methods: {
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
