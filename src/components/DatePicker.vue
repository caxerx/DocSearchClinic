<template>
  <div>
      
    <div v-if="computedType==='reservation'">
      <v-menu
        :close-on-content-click="false"
        v-model="menu1"
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
          v-model="reservationDate"
          label="Date (read only text field)"
          hint="YYYY-MM-DD format"
          persistent-hint
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="reservationDate"
          no-title
          @input="close"
          :event-color="eventColor"
          :events="functionEvents"
        ></v-date-picker>
      </v-menu>
    </div>
    <div v-else-if="computedType==='queue'">
      <v-layout row wrap>
        <v-flex xs5>
          <v-menu
            :close-on-content-click="false"
            v-model="menu1"
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
              v-model="queueStartDate"
              label="Start Date"
              hint="YYYY-MM-DD format"
              persistent-hint
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="queueStartDate" no-title @input="close"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs5>
          <v-menu
            :close-on-content-click="false"
            v-model="menu2"
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
              v-model="queueEndDate"
              label="End Date "
              hint="YYYY-MM-DD format"
              persistent-hint
              prepend-icon="event"
              readonly
            ></v-text-field>

            <v-date-picker v-model="queueEndDate"  no-title @input="close"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs2 style="text-align: right;">
          <slot name="btn1"></slot>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data: () => ({
    // date: new Date().toISOString().substr(0, 10),
    // dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    arrayEvents: null,
    test:"2018-9-15"

  }),

  computed: {
    $state() {
      return this.$store.state;
    },

    reservationDate: {
      get() {
        return this.$state.reservation.reservationData.date;
      },
      set(date) {
        this.$store.commit("setReservationDate", date);
      }
    },

    queueStartDate: {
      get() {
        return this.$state.queue.queueData.startDate;
      },
      set(queueStartDate) {
        this.$store.commit("queueStartDate", queueStartDate);
      }
    },

    queueEndDate: {
      get() {
        return this.$state.queue.queueData.endDate;
      },
      set(queueEndDate) {
        this.$store.commit("queueEndDate", queueEndDate);
      }
    },

    ...mapGetters({
      publicData: "getPublicData",
      queueData:"getQueueData",
      reservationData:"getReservationData"
    }),
    computedType() {
      return this.publicData.datePickerType;
    },
    computedDate(){
        if(reservationData==""){
            
        }
    },
    eventColor() {
      return function(date) {
        var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const [, , day] = date.split("-");
        var color = days.includes(parseInt(day)) ? "red" : "green";
        return color;
      };
    }
  },
  methods: {
    ...mapActions(["actionSetDate", "actionSetStartDate", "actionSetEndDate"]),

    close() {
      this.menu1 = false;
      this.menu2 = false;
    },

    functionEvents(date) {
      const [, , day] = date.split("-");
      return true;
    },
    formatDate(newDate) {
      if (!newDate) return null;

      const [year, month, day] = newDate.split("-");
      return `${year}-${month}-${day}`;
    }
  }
};
</script>