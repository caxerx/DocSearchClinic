<template>
  <div style="height:100%">
    <v-layout
      v-if="!isClickPatient($route.query.id)"
      align-center
      justify-center
      fill-height
    >Select a patient to view details</v-layout>
      <v-layout
        v-else-if="isRecordEmpty(patient)"
        align-center
        justify-center
        fill-height
      >No Records in this Patient</v-layout>
      <div v-else>
        <medical-record-card/>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import MedicalRecordList from "@/components/patientList/MedicalRecordList.vue";
import MedicalRecordCard from "@/components/patientList/MedicalRecordCard.vue";

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
      return this.getter.patientList;
    },

    patient(){
      return this.getter.patient;
    }
  },

  components: {
    MedicalRecordList,
    MedicalRecordCard
  },

  //   watch: {
  //     dialog(val) {
  //       val || this.close();
  //     }
  //   },

  methods: {
    isClickPatient(id) {
      if (id === undefined) {
        return false;
      } else {
        return true;
      }
    },
    isRecordEmpty(patient) {
      console.log(patient.medicalRecordList.length)
      if (patient.medicalRecordList.length === 0) {
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
