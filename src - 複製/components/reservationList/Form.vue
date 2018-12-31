<template>
  <div>
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
              v-model="startDate"
              label="Start Date"
              hint="YYYY-MM-DD format"
              persistent-hint
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="startDate" no-title @input="close"></v-date-picker>
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
              v-model="endDate"
              label="End Date "
              hint="YYYY-MM-DD format"
              persistent-hint
              prepend-icon="event"
              readonly
            ></v-text-field>

            <v-date-picker v-model="endDate"  no-title @input="close"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs2 style="text-align: right;">
          <v-btn slot="btn1" color="primary"  >submit</v-btn>
        </v-flex>
      </v-layout>
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

  }),

  computed: {
    $state() {
      return this.$store.state.reservationList.reservationListData;
    },


    startDate: {
      get() {
        return this.$state.startDate;
      },
      set(startDate) {
        this.$store.commit("reservationListStartDate", startDate);
      }
    },

    endDate: {
      get() {
        return this.$state.endDate;
      },
      set(endDate) {
        this.$store.commit("reservationListEndDate", endDate);
      }
    },

    ...mapGetters({
 
    }),


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