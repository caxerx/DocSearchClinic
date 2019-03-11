<template>
<div>
    <v-card v-for="(medicalRecord,index) in medicalRecordList" :key="index">
        {{medicalRecord.date}}
    </v-card>
</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "App",
    data() {
    return {
       search: "",
   
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      getPatientListData: "getPatientListData"
    }),

    medicalRecordList(){
        return this.getPatientListData.patient.medicalRecordList;
    }
  },


  methods: {
  	...mapActions(["actionReset"]),
  }
};
</script>
