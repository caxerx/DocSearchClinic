<template>
  <div v-if="reservations!=null">
    <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
    <v-toolbar flat absolute style="z-index:10">
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>arrow_left</v-icon>
      </v-btn>

      <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        lazy
        transition="scale-transition"
        full-width
        max-width="290px"
        min-width="290px"
        bottom
        offset-y
      >
        <v-chip slot="activator">
          <v-icon>calendar_today</v-icon>
          {{start}}
        </v-chip>
        <v-date-picker v-model="start" no-title @input="menu = false"></v-date-picker>
      </v-menu>

      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>arrow_right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="calendarType">
        <v-btn flat value="day">Day</v-btn>
        <v-btn flat value="week">Week</v-btn>
        <v-btn flat value="month">Month</v-btn>
      </v-btn-toggle>
    </v-toolbar>


    <v-navigation-drawer
      class="indigo lighten-5"
      absolute
      permanent
      style="width:100%;padding-top:64px;height:100%"
    >
      <v-layout  fill-height>
        <!-- <v-flex sm2>
          <doctor-list/>
        </v-flex>-->
        <v-flex sm9>
          <v-calendar
            ref="calendar"
            :now="today"
            v-model="start"
            :value="today"
            color="primary"
            :type="calendarType"
          >
            <!-- the events at the bottom (timed) -->
            <template slot="dayBody" slot-scope="{ date, timeToY, minutesToPixels }">
              <template v-for="reservation in eventsMap[date]">
                <v-menu :key="reservation.name" full-width offset-x>
                  <!-- timed events -->
                  <template v-slot:activator="{ on }">
                    <div
                      :key="reservation.id"
                      :style="{ top: timeToY((formatTime(reservation.startTime)+30)) + 'px', height: minutesToPixels(computedDuration(reservation.id,reservation.startTime,reservation.endTime)) + 'px' }"
                      class="my-event with-time"
                      v-on="on"
                      v-html="reservation.patient.name"
                    ></div>
                  </template>

                  <!-- pop up menu -->
                  <menu-card
                    :icon="icon"
                    :patient="reservation.patient"
                    :startTime="formatAMPM(reservation.startTime)"
                    :duration="computedDuration(reservation.id,reservation.startTime,reservation.endTime)"
                    :note="reservation.note"
                  />
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-flex>
        <v-flex sm3>
          <div style="height:100%">
            <v-card style="height:20%">
              <v-card-title>Today's Schedule</v-card-title>
              <div class="text-xs-center">
                <v-btn outline color="indigo">Add Walk-in Appointment</v-btn>
              </div>
            </v-card>

            <!-- patient -->
            <div style="margin-top: 15%;height:73.8% ">
              <patient :reservations="reservations"/>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>


<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;

  &.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
  }
}
</style>
<style scoped>
#datePicker {
  width: 500px;
}

.cleft {
  width: 20%;
  display: inline-block;
}
.cright {
  display: inline-block;
}

#patient {
  margin-top: 15%;
}
</style>



<script>
import { mapGetters, mapActions, mapState } from "vuex";
import DoctorList from "@/components/reservationList/DoctorList.vue";
import Patient from "@/components/reservationList/Patient.vue";
import MenuCard from "@/components/reservationList/MenuCard.vue";
import gql from "graphql-tag";

let moment = require("moment");

const reservationsQuery = gql`
  query {
    reservations {
      id
      reserver {
        id
        name
      }
      patient {
        id
        name
        email
        phoneNo
      }
      note
      startTime
      endTime
    }
  }
`;
export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    start: new Date().toISOString().substr(0, 10),
    menu: false,
    calendarType: "week",
    icon: "https://cdn.vuetifyjs.com/images/john.jpg"
  }),

  apollo: {
    reservations: {
      query: reservationsQuery
    }
  },

  components: {
    DoctorList,
    Patient,
    MenuCard
  },
  computed: {
    ...mapGetters({
      getter: "getReservationListData"
    }),
    // convert the list of events into a map of lists keyed by date
    patientList() {
      return this.getter.patientList;
    },

    eventsMap() {
      const map = {};
      this.reservations.forEach(e =>
        (map[moment.utc(e.startTime).format("YYYY-MM-DD")] =
          map[moment.utc(e.startTime).format("YYYY-MM-DD")] || []).push(e)
      );
      return map;
    }
  },

  methods: {
    formatTime(startTime) {
      let mTime = moment.utc(startTime).format("HH:mm");
      return mTime;
    },
    formatAMPM(startTime) {
      let mTime = moment.utc(startTime).format("HH:mm A");
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