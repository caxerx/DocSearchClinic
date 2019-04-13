<template>
  <div style="height:100%">
    <v-card light style="height:100%">
      <v-tabs v-model="active" slider-color="white" style="height:10%">
        <v-tab v-for="(type,index) in types" :key="index" ripple>{{type}}</v-tab>
      </v-tabs>
      <v-navigation-drawer permanent style="height:90%;">
        <div v-if="active==0">
          <v-card v-for="(reservation,index) in isToday(reservations)" :key="index">
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
                :date="formatDate(reservation.startTime)"
                :icon="icon"
                :patient="reservation.patient"
                :startTime="formatAMPM(reservation.startTime)"
                :duration="computedDuration(reservation.id,reservation.startTime,reservation.endTime)"
                :note="reservation.note"
              />
            </v-menu>
          </v-card>

          <v-card v-if="isToday(reservations).length<1">
            <v-card-text>No Appointment</v-card-text>
          </v-card>
        </div>
        <!-- todo change else to else if active == 1..-->
        <div v-else-if="active==1">
          <v-card v-for="(reservation,index) in isWaiting(reservations)" :key="index">
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
                :date="formatDate(reservation.startTime)"
                :icon="icon"
                :patient="reservation.patient"
                :startTime="formatAMPM(reservation.startTime)"
                :duration="computedDuration(reservation.id,reservation.startTime,reservation.endTime)"
                :note="reservation.note"
              />
            </v-menu>
          </v-card>

          <v-card v-if="isWaiting(reservations).length<1">
            <v-card-text>No Appointment</v-card-text>
          </v-card>
        </div>
        <div v-else-if="active==2">
          <v-card v-for="(reservation,index) in isPending(reservations)" :key="index">
            <v-menu :key="reservation.patient.name" full-width offset-x left>
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
                :date="formatDate(reservation.startTime)"
                :icon="icon"
                :patient="reservation.patient"
                :startTime="formatAMPM(reservation.startTime)"
                :duration="computedDuration(reservation.id,reservation.startTime,reservation.endTime)"
                :note="reservation.note"
              />
            </v-menu>
          </v-card>

          <v-card v-if="isPending(reservations).length<1">
            <v-card-text>No Appointment</v-card-text>
          </v-card>
        </div>
        <div v-else-if="active==3">
          <v-card v-for="(reservation,index) in isCheckIn(reservations)" :key="index">
            <v-menu :key="reservation.patient.name" full-width offset-x left>
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
                :date="formatDate(reservation.startTime)"
                :icon="icon"
                :patient="reservation.patient"
                :startTime="formatAMPM(reservation.startTime)"
                :duration="computedDuration(reservation.id,reservation.startTime,reservation.endTime)"
                :note="reservation.note"
              />
            </v-menu>
          </v-card>

          <v-card v-if="isCheckIn(reservations).length<1">
            <v-card-text>No Appointment</v-card-text>
          </v-card>
        </div>
        <div v-else-if="active==4">
          <v-card v-for="(reservation,index) in isExpired(reservations)" :key="index">
            <v-menu :key="reservation.patient.name" full-width offset-x left>
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
                :date="formatDate(reservation.startTime)"
                :icon="icon"
                :patient="reservation.patient"
                :startTime="formatAMPM(reservation.startTime)"
                :duration="computedDuration(reservation.id,reservation.startTime,reservation.endTime)"
                :note="reservation.note"
              />
            </v-menu>
          </v-card>

          <v-card v-if="isExpired(reservations).length<1">
            <v-card-text>No Appointment</v-card-text>
          </v-card>
        </div>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import MenuCard from "@/components/reservationList/MenuCard.vue";
import CancelReservationDialog from "@/components/dialog/cancelReservationDialog"
let moment = require("moment");

export default {
  data() {
    return {
      search: "",
      patientType: "today",
      active: 0,
      types: ["Today", "Waiting", "Pending", "Check_In", "Expired"],
      fav: true,

      menu: false,
      icon: "https://cdn.vuetifyjs.com/images/john.jpg"
    };
  },
  props: {
    reservations: Array
  },
  components: {
    MenuCard,
    CancelReservationDialog
  },
  watch: {},
  computed: {},
  methods: {
    isToday(arr) {
      let todayArr = arr.filter(function(e) {
        let date = moment.utc(e.startTime).format("YYYY-MM-DD");
        return date === new Date().toISOString().substr(0, 10);
      });
      return todayArr;
    },
    isPending(arr) {
      let pendingArr = arr.filter(function(e) {
        return e.status === "pending";
      });
      return pendingArr;
    },
    isExpired(arr) {
      let expiredArr = arr.filter(function(e) {
        return e.status === "expired";
      });
      return expiredArr;
    },
    isWaiting(arr) {
      let waitingArr = arr.filter(function(e) {
        return e.status === "waiting";
      });
      return waitingArr;
    },
    isCheckIn(arr) {
      let checkInArr = arr.filter(function(e) {
        return e.status === "checked_in";
      });
      return checkInArr;
    },
    formatDate(startTime) {
      let date = moment.utc(startTime).format("YYYY-MM-DD");
      return date;
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
    }
  }
};
</script>

<style scoped>
</style>




