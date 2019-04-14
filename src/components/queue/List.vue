<template>
  <div style="height:100%" v-if="patientQueue!=null">
    <v-layout
      v-if="!isClickPatient(patientQueue.patient.id)"
      align-center
      justify-center
      fill-height
    >Select a patient to view details</v-layout>
    <div v-else style="height:100%">
      <div v-if="patientQueue!=null" style="height:100%">
        <div v-if="isRecordEmpty()" style="height:100%">
          <patient-profile-card :patient="patientQueue.patient"/>
          <v-layout align-center justify-center style="height:80%">No Records in this Patient</v-layout>
        </div>

        <div v-else style="height:100%">
          <patient-profile-card :patient="patientQueue.patient"/>

          <queue-record-list :patientQueue="patientQueue"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

import QueueRecordList from "@/components/queue/QueueRecordList.vue";
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

    patientQueue: {
      get() {
        return this.getQueueData.patientQueue;
      },
      set(val) {
       this.actionSetPatientFromQueue(val);
      }
    }
  },

  components: {
    QueueRecordList,
    PatientProfileCard
  },

  methods: {
    isClickPatient(id) {
      console.log(id);
      if (id === -1) {
        return false;
      } else {
        return true;
      }
    },
    isRecordEmpty() {
      // if (this.patientQueue.patient.queueRecords.length < 1) {
      //   return true;
      // }

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
