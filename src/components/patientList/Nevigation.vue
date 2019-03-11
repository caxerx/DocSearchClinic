<template>
  <div style="padding-left:15%">
    <h3 class="headline mb --text">Patients</h3>
    <div class="black--text">{{name}}</div>
    <v-tabs v-model="active" slider-color="orange" color="transparent">
      <v-tab v-for="type in types" :key="type" ripple>{{type}}</v-tab>
    </v-tabs>

    <div v-if="active==0">
      <v-list flat style="background-color:transparent;">
        <div v-for="(patient,index) in patientList" :key="index" avatar>
          <div v-if="isToday(patient.date)">
            <v-list-tile @click="queryMedicalRecordList(patient)">
              <v-list-tile-avatar>
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="patient.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </div>
        </div>
      </v-list>
    </div>
    <div v-else-if="active==1">
      <v-list flat style="background-color:transparent;">
        <v-list-tile v-for="(patient,index) in patientList" :key="index" avatar @click="queryMedicalRecordList(patient)">
          <v-list-tile-avatar>
            <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="patient.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <div v-else-if="active==2">
      <v-list flat style="background-color:transparent;">
        <v-list-tile v-for="(patient,index) in patientList" :key="index" avatar @click="queryMedicalRecordList(patient)">
          <v-list-tile-avatar>
            <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="patient.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>

    <v-divider></v-divider>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      search: "",
      active: 0,
      types: ["Today", "Recent", "All"],
      patientid: 0
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      getPatientListData: "getPatientListData"
    }),
    name() {
      return this.getPatientListData.clinc.name;
    },
    patientList() {
      return this.getPatientListData.clinc.patientList;
    }
  },

  methods: {
    ...mapActions(["actionReset", "actionQueryMedicalRecordList"]),
    isToday(day) {
      if (day == new Date().toISOString().substr(0, 10)) {
        return true;
      } else {
        return false;
      }
    },
    queryMedicalRecordList(patient) {
      this.$router.push({
        name: "patientList",
        query: {
          id: patient.id
        }
      });
      this.actionQueryMedicalRecordList(patient);
    },
  }
};
</script>


<style scoped>
.theme--light.v-divider {
  border-color: transparent;
}
</style>

