<template>
  <div style="height:100%">
    <v-card light style="height:100%">
      <v-tabs v-model="active" slider-color="white">
        <v-tab v-for="type in types" :key="type" ripple>{{type}}</v-tab>
      </v-tabs>

      <div v-if="active==0">
        <v-card v-for="(patient,index) in patientList" :key="index">
          <div v-if="isToday(patient.date)">
            <v-menu :key="patient.name" full-width offset-x left>
              <!-- timed events -->
              <template v-slot:activator="{ on }">
                <v-container>
                  <v-layout v-on="on">
                    <v-flex sm2 class="text-sm-right grey--text">{{formatAMPM(patient.time)}}</v-flex>
                    <v-flex sm9 offset-sm1>
                      <div>{{patient.name}}</div>
                      <div class="grey--text">{{patient.details}}</div>
                      <div class="grey--text">{{patient.doctor}}</div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </template>
              <menu-card :icon="icon" :patient="patient"/>
            </v-menu>
          </div>
        </v-card>
      </div>
      <div v-else >
        <!-- todo change else to else if active == 1..-->
        <v-card>
            <v-card-text>No Appointment</v-card-text>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import MenuCard from "@/components/reservationList/MenuCard.vue";

export default {
  data() {
    return {
      search: "",
      patientType: "today",
      active: 0,
      types: ["Today", "Waiting", "Engaged", "Finish"],
      fav: true,
      menu: false,
      icon: "https://cdn.vuetifyjs.com/images/john.jpg"
    };
  },
  components: {
    MenuCard
  },
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

    formatAMPM(time) {
      var hours = time.split(":")[0];
      var minutes = time.split(":")[1];
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




