<template>
  <full-screen-container v-if="timeslots">
    <div style="height:100%; width:100%; overflow-y: scroll" class="pa-4">
      <h3 class="headline mb-3 --text">Calendar Setting</h3>
      <v-layout row>
        <v-card class="weekday-card mr-3" v-for="(t, i) in timeslots" :key="i">
          <v-card-title class="headline">{{ getWeekDay(daysArr[i]) }}</v-card-title>
          <v-divider></v-divider>
          <div v-for="(ts, j) in t" :key="j">
            <v-card-text>{{ ts.start }} - {{ ts.end }}</v-card-text>
            <v-divider></v-divider>
          </div>
        </v-card>
      </v-layout>
    </div>
  </full-screen-container>
  <full-screen-container v-else>
    <v-layout fill-height justify-center align-center>
      <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </full-screen-container>
</template>
<script>
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import gql from "graphql-tag";

export default {
  components: {
    "full-screen-container": FullScreenContainer
  },
  data() {
    return {
      timeslots: null,
      daysArr: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
      daysMap: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      }
    };
  },
  methods: {
    getWeekDay(day) {
      return this.daysMap[day];
    }
  },
  apollo: {
    timeslots: {
      query: gql`
        query getTimeslots($id: ID!) {
          doctor(id: $id) {
            timeSlots {
              id
              weekday
              start
              end
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$store.state.userId
        };
      },
      update(data) {
        // console.log(data);
        let timeslots = data.doctor.timeSlots;
        let dayTimeslot = [[], [], [], [], [], [], []];
        timeslots.forEach(ts => {
          dayTimeslot[this.daysArr.indexOf(ts.weekday)].push(ts);
        });
        return dayTimeslot;
      },
      error(err) {
        console.dir(err);
      }
    }
  },
  created() {}
};
</script>

<style>
.horizontal-container {
  overflow: auto;
  white-space: nowrap;
}
.weekday-card {
  width: 300px;
}
</style>