<template>
  <div style="height:100%">
    <v-card light style="height:100%">
      <v-tabs v-model="active" slider-color="white">
        <v-tab v-for="type in types" :key="type" ripple>{{type}}</v-tab>
      </v-tabs>

      <v-card v-for="(patient,index) in patientList" :key="index">
        <div v-if="isToday(patient.date)">
          <v-container>
            <v-layout>
              <v-flex sm2 class="text-sm-right">{{formatAMPM(patient.time)}}</v-flex>
              <v-flex sm5 offset-sm1>{{patient.name}}</v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-card>
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
      patientType: "today",
      active: 0,
      types: ["Today", "Waiting", "Engaged", "Finish"]
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      getReservationListData: "getReservationListData"
    }),

    patientList() {
      return this.getReservationListData.patientList;
    }
  },

  methods: {
    isToday(day) {
      if (day == new Date().toISOString().substr(0, 10)) {
        return true;
      } else {
        return false;
      }
    },

    //temporarily time to ampm
    formatAMPM(time) {
      var hours = time.split(":")[0];
      var minutes = time.split(":")[1];
      console.log(minutes);
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 && minutes != "00" ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + "  " + ampm;
      return strTime;
    }
  }
};
</script>

<style scoped>
</style>




