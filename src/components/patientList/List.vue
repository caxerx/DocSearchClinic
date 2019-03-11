<template>
  <div >
    <!-- dialog  -->
    <div v-if="dialogType=='medicalRecordList'">
      <medical-record-list/>
    </div>
    
    sad
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import MedicalRecordList from "@/components/patientList/MedicalRecordList.vue";

export default {
  data: () => ({
    search: "",
    dialogType:"",
   
  }),

  computed: {
    // formTitle() {
    //   return this.editedIndex === -1 ? "New Item" : "Edit Item";
    // }
    ...mapGetters({
      getter:"getPatientListData"
    }),

    patientList(){
      return this.getter.patientList;
    }
  },

  components: {
    MedicalRecordList
  },

  //   watch: {
  //     dialog(val) {
  //       val || this.close();
  //     }
  //   },

  methods: {
    ...mapActions([
      "actionCloseDialog",
      "actionOpenDialog",
      "actionViewMedicalListFromPatientList"
    ]),

    viewMedicalRecord(patient) {
      this.dialogType = "medicalRecordList";
      this.actionOpenDialog("fullscreen");
      this.actionViewMedicalListFromPatientList(patient);
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
