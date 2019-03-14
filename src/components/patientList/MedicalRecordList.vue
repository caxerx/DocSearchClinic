<template>
  <div class="custlayout">
    <div v-for="(medicalRecord,index) in medicalRecordList" :key="index" style="margin-top:20px;">
       <medical-record-card :medicalRecord="medicalRecord" :icon="icon" :patient="patient"/>
       
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import MedicalRecordCard from "@/components/patientList/MedicalRecordCard.vue";

export default {
  data() {
    return {
      search: "",
      showList:[],
      icon:"https://randomuser.me/api/portraits/men/84.jpg"
      
    };
  },
  components: {
    MedicalRecordCard
  },

  computed: {
    ...mapGetters({
      getPatientListData: "getPatientListData"
    }),

    medicalRecordList() {
      return this.getPatientListData.patient.medicalRecordList;
    },
    


    patient() {
      return this.getPatientListData.patient;
    }
  },

  methods: {
    ...mapActions(["actionReset"]),
  

  }
};
</script>

<style scoped>


.custlayout {
  height: 85%;
  overflow-y: auto;
  padding-bottom: 10%;
}

</style>


