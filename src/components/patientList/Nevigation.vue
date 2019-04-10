<template>
  <div>
    <h3 class="headline mb --text">Patients</h3>
    <div class="black--text">{{doctor.workplace.name}}</div>
    <v-tabs v-model="active" slider-color="orange" color="transparent">
      <v-tab v-for="(type,index) in types" :key="index" ripple>{{type}}</v-tab>
    </v-tabs>
    <div v-if="active==0">

      <v-list flat style="background-color:transparent;">
        <div v-for="(consultation,index) in consultations" :key="index" avatar>
          <div v-if="consultations!=null&&isToday(consultation.patient.consultations)">
            <v-list-tile @click="setPatient(consultation.patient)">
              <v-list-tile-avatar>
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="consultation.patient.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </div>
        </div>
      </v-list>
    </div>
    <div v-else-if="active==1">
      <v-list flat style="background-color:transparent;">
        <v-list-tile
          v-for="(consultation,index) in consultations"
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
          v-for="(consultation,index) in consultations"
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
    isToday(obj) {
      if (obj.length < 1) {
        return false;
      }

      for (let i = 0; i < obj.length; i++) {
        let startTime = obj[i].startTime;
        let date = moment.utc(startTime).format("YYYY-MM-DD");
        if (date == "2019-03-01") {
          return true;
        }
      }

      return false;
    },
    setPatient(patient){
      this.actionSelectPatientForPatientList(patient);
    },

    computedNewArr(consultations){
      
      if(consultations.length<1){
        return false
      }
      


    },
  }
};
</script>


<style scoped>
.theme--light.v-divider {
  border-color: transparent;
}
</style>

