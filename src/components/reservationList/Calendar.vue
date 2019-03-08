<template>
  <div>
    <v-sheet height="400">
      <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
      <v-calendar
        ref="calendar"
        :now="today"
        v-model="start"
        :value="today"
        color="primary"
        type="week"
      >
        <!-- the events at the bottom (timed) -->
        <template slot="dayBody" slot-scope="{ date, timeToY, minutesToPixels }">
          <template v-for="event in eventsMap[date]">
            <v-menu :key="event.name" full-width offset-x>
              <!-- timed events -->
              <template v-slot:activator="{ on }">
                <div
                  v-if="event.time"
                  :key="event.name"
                  :style="{ top: timeToY((event.time+30)) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                  class="my-event with-time"
                  v-on="on"
                  v-html="event.name"
                ></div>
              </template>

              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar color="primary" dark>
                  <v-toolbar-title v-html="event.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <div>
                    <span class="cleft">DOB:</span>
                    <span class="cright">{{event.dob}}</span>
                  </div>
                  <div>
                    <span class="cleft">HKID:</span>
                    <span  class="cright">{{event.hkid}}</span>
                  </div>
                  <div>
                    <span class="cleft">Date:</span>
                    <span class="cright">{{event.date}}</span>
                  </div>
                  <div>
                    <span class="cleft">Time:</span>
                    <span class="cright">{{event.time}}</span>
                  </div>
                  <div>
                    <span class="cleft">Duration:</span>
                    <span class="cright">{{event.duration}} mins</span>
                  </div>
                  <div>
                    <span class="cleft">Allergy:</span>
                    <span class="cright">{{event.allergy}}</span>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat color="error">Cancel</v-btn>
                  <v-btn flat color="info">Approval</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </template>
        </template>
      </v-calendar>
    </v-sheet>
    <br>
    <v-layout justify-space-between row>
      <v-btn @click="$refs.calendar.prev()">
        <v-icon dark left>keyboard_arrow_left</v-icon>Prev
      </v-btn>
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="start"
          label="Start Date"
          hint="MM/DD/YYYY format"
          persistent-hint
          prepend-icon="event"
          style="width:500px"
        ></v-text-field>
        <v-date-picker v-model="start" no-title @input="menu = false"></v-date-picker>
      </v-menu>
      <v-btn @click="$refs.calendar.next()">Next
        <v-icon right dark>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-layout>
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

.cleft{
  width:20%;
  display:inline-block;
}
.cright{
  display:inline-block;
}
</style>



<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    start: new Date().toISOString().substr(0, 10),
    menu: false
  }),

  computed: {
    ...mapGetters({
      getter: "getReservationListData"
    }),
    // convert the list of events into a map of lists keyed by date
    events() {
      return this.getter.events;
    },
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
  },
  methods: {
    // open(event) {
    //   // alert(event.time);
    // }
  }
};
</script>