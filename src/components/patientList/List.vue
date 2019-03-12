<template>
  <div style="height:100%">
    <v-layout
      v-if="!isClickPatient($route.query.id)"
      align-center
      justify-center
      fill-height
    >Select a patient to view details</v-layout>
  <div  v-else-if="isRecordEmpty()" style="height:100%">
     <patient-profile-card/>
        <v-layout
      align-center
      justify-center
      style="height:80%"
    >No Records in this Patient</v-layout>
  </div>

    <div v-else>
      <patient-profile-card/>
    
      <medical-record-card/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import MedicalRecordList from "@/components/patientList/MedicalRecordList.vue";
import MedicalRecordCard from "@/components/patientList/MedicalRecordCard.vue";
import PatientProfileCard from "@/components/patientList/PatientProfileCard.vue";

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
      getter: "getPatientListData"
    }),

    patientList() {
      return this.getter.clinc.patientList;
    },

    patient() {
      return this.getter.patient;
    },

    id() {
      return this.$route.query.id;
    }
  },

  components: {
    MedicalRecordList,
    MedicalRecordCard,
    PatientProfileCard
  },

  created() {
    this.actionQueryPatientFromPatientList(this.id);
  },

  watch: {
    id: function(val) {
      this.actionQueryPatientFromPatientList(this.id);
    }
  },

  methods: {
    ...mapActions(["actionQueryPatientFromPatientList"]),
    isClickPatient(id) {
      if (id === undefined) {
        return false;
      } else {
        return true;
      }
    },
    isRecordEmpty() {
      if (this.patient.medicalRecordList.length === 0) {
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
