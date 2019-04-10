<template>
  <div>
    <h3 class="headline mb --text">Patients</h3>
    <div class="black--text">{{doctor.workplace.name}}</div>
    <v-tabs v-model="active" slider-color="orange" color="transparent">
      <v-tab v-for="(type,index) in types" :key="index" ripple>{{type}}</v-tab>
    </v-tabs>
    <div v-if="active==0">
      <v-list flat style="background-color:transparent;">
        <span v-for="(consultation,index) in consultations" :key="index">
          <span v-if="consultations!=null&&isToday(consultation.startTime)">
            <v-list-tile @click="setPatient(consultation.patient)" avatar>
              <v-list-tile-avatar>
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="consultation.patient.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </span>
        </span>
      </v-list>
    </div>
    <div v-else-if="active==1">
      <v-list flat style="background-color:transparent;">
        <v-list-tile
          v-for="(consultation,index) in checkRepeatIdAndReturnNewArr(consultations)"
          :key="index"
          avatar
          @click="setPatient(consultation.patient)"
        >
          <v-list-tile-avatar>
            <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="consultation.patient.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <div v-else-if="active==2">
      <v-list flat style="background-color:transparent;">
        <v-list-tile
          v-for="(consultation,index) in checkRepeatIdAndReturnNewArr(consultations)"
          :key="index"
          avatar
          @click="setPatient(consultation.patient)"
        >
          <v-list-tile-avatar>
            <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="consultation.patient.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>

    <v-divider></v-divider>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";

import gql from "graphql-tag";

let moment = require("moment");

export default {
  data() {
    return {
      search: "",
      active: 0,
      types: ["Today", "Recent", "All"],
      patientid: 0
    };
  },

  props: {
    consultations: Array,
    doctor: Object
  },
  components: {},
  computed: {},

  methods: {
    ...mapActions(["actionSelectPatientForPatientList"]),
    isToday(startTime) {
      let date = moment.utc(startTime).format("YYYY-MM-DD");
      if (date === new Date().toISOString().substr(0, 10)) {
        return true;
      }
      // console.log(date + ", " + new Date().toISOString().substr(0, 10));
      return false;
    },
    setPatient(patient) {
      this.actionSelectPatientForPatientList(patient);
    },
    checkRepeatIdAndReturnNewArr(consultations) {
      let seen = new Set();
      //check no repeat user in last coonsultation
      let lastPatientInConsultations = consultations.filter(function(currentObject) {
        if(seen.size !== seen.add(currentObject.patient.id).size){
          return currentObject
        }
      });


      return lastPatientInConsultations;
    }
  }
};
</script>


<style scoped>
.theme--light.v-divider {
  border-color: transparent;
}
</style>

