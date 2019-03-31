<template>
  <div style="height:100%">
    <v-card light style="height:100%">
      <v-tabs v-model="active" slider-color="white" style="height:10%">
        <v-tab v-for="type in types" :key="type" ripple>{{type}}</v-tab>
      </v-tabs>
      <div style="height:90%;overflow-y:scroll">
        <div v-if="active==0">
          <v-card v-for="(reservation,index) in reservations" :key="index">
            <div>
              <v-menu :key="reservation.patient.name" full-width offset-x left>
                <!-- timed events -->
                <template v-slot:activator="{ on }">
                  <v-container>
                    <v-layout v-on="on">
                      <v-flex
                        sm2
                        class="text-sm-right grey--text"
                      >{{formatAMPM(reservation.startTime)}}</v-flex>
                      <v-flex sm9 offset-sm1>
                        <div>{{reservation.patient.name}}</div>
                        <div class="grey--text">{{reservation.note}}</div>
                        <div class="grey--text">Dr. {{reservation.reserver.name}}</div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </template>
                <menu-card
                  :icon="icon"
                  :patient="reservation.patient"
                  :startTime="formatAMPM(reservation.startTime)"
                  :duration="computedDuration(reservation.id,reservation.startTime,reservation.endTime)"
                  :note="reservation.note"
                />
              </v-menu>
            </div>
          </v-card>
        </div>
        <div v-else>
          <!-- todo change else to else if active == 1..-->
          <v-card>
            <v-card-text>No Appointment</v-card-text>
          </v-card>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import MenuCard from "@/components/reservationList/MenuCard.vue";
let moment = require("moment");

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
  props: {
    reservations: Array
  },
  components: {
    MenuCard
  },
  computed: {},

  methods: {
    isToday(day) {
      if (day == new Date().toISOString().substr(0, 10)) {
        return true;
      } else {
        return false;
      }
    },

    formatTime(startTime) {
      let mTime = moment.utc(startTime).format("HH:mm");
      return mTime;
    },
    formatAMPM(startTime) {
      let mTime = moment.utc(startTime).format("h:mm A");
      return mTime;
    },

    computedDuration(id, startTime, endTime) {
      let stime = moment.utc(startTime);
      let etime = moment.utc(endTime);
      let duration = etime.diff(stime, "minutes");
      return duration;
      // console.log("id " + id);
      // console.log("duration",etime.diff(stime,"minutes"))
      // console.log("stime " + stime.format("HH:mm:ss") + " etime" + etime.format("HH:mm:ss"));
    }
  }
};
</script>

<style scoped>
</style>




