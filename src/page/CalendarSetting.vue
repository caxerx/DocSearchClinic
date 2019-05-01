<template>
  <full-screen-container v-if="timeslots">
    <div style="height:100%; width:100%; overflow-y: scroll" class="pa-4">
      <h3 class="headline mb-3 --text">Calendar Setting</h3>
      <v-btn class="mb-3" color="primary" outline>Delete all selected</v-btn>
      <v-btn class="mb-3" color="primary" outline>Batch add timeslots</v-btn>
      <div class="horizontal-container pa-3">
        <v-card
          height="450"
          width="300"
          class="weekday-card mr-3"
          v-for="(dayTimeslots, i) in timeslots"
          :key="i"
        >
          <v-card-title class="headline">
            {{ getWeekDay(daysArr[i]) }}
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <div style="overflow-y: scroll; height: 369px">
            <template v-if="dayTimeslots.length > 0">
              <div v-for="(timeslot, j) in dayTimeslots" :key="j">
                <v-card-title class="py-1">
                  <v-checkbox hide-details class="pa-0 ma-0"></v-checkbox>
                  <span>{{ timeslot.start }} - {{ timeslot.end }}</span>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon color="info">edit</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon color="error">delete</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
              </div>
            </template>
            <v-card-text class="italic grey--text subheading" v-else>No timeslots today</v-card-text>
          </div>
        </v-card>
      </div>
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
  display: inline-block;
}
</style>