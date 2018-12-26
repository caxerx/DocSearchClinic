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
          v-model="date"
          label="Date (read only text field)"
          hint="YYYY-MM-DD format"
          persistent-hint
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="newDate"
          no-title
          @input="close"
          @change="setDate"
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
                v-model="newStartDate"
                label="Start Date"
                hint="YYYY-MM-DD format"
                persistent-hint
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="newStartDate" @change="setStartDate" no-title @input="close"></v-date-picker>
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
                v-model="newEndDate"
                label="End Date "
                hint="YYYY-MM-DD format"
                persistent-hint
                prepend-icon="event"
                readonly
              ></v-text-field>
             
              <v-date-picker v-model="newEndDate" @change="setEndDate" no-title @input="close"></v-date-picker>
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

    //reservation
    newDate: "",
    //queue
    newStartDate: "",
    newEndDate: ""
  }),

  computed: {
    ...mapGetters({
      date: "getDate",
      type: "getDatePickerType",
      startDate: "getStartDate",
      endDate: "getEndDate"
    }),
    computedType() {
      console.log(this.type);
      return this.type;
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
    setDate() {
      this.actionSetDate(this.newDate);
    },

    setStartDate() {
      this.actionSetStartDate(this.newStartDate);
    },
    setEndDate() {
      this.actionSetEndDate(this.newEndDate);
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