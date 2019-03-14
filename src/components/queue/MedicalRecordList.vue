<template>
  <div class="custlayout">
    <v-toolbar flat>
      <v-tooltip bottom>
        <v-btn icon slot="activator">
          <v-icon color="success">meeting_room</v-icon>
        </v-btn>
        <span>Process Queue</span>
      </v-tooltip>

      <v-tooltip bottom>
        <v-btn icon slot="activator">
          <v-icon color="error">delete</v-icon>
        </v-btn>
        <span>Remove From Queue</span>
      </v-tooltip>
    </v-toolbar>
    <v-divider></v-divider>
    <div class="px-4 py-2">Check-in History</div>
    <v-divider></v-divider>
    <v-layout
      v-if="medicalRecordList.length == 0"
      align-center
      justify-center
      style="height:75%"
    >No Records in this Patient</v-layout>
    <div v-else>
      <div v-for="(medicalRecord,index) in medicalRecordList" :key="index" class="mt-2">
        <medical-record-card :medicalRecord="medicalRecord" :icon="icon" :patient="patient"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import MedicalRecordCard from "@/components/queue/MedicalRecordCard.vue";

export default {
  data() {
    return {
      search: "",
      showList: [],
      icon: "https://randomuser.me/api/portraits/men/84.jpg"
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
    ...mapActions(["actionReset"])
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


