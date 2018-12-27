<template>
  <div>
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
        v-model="date"
        no-title
        @input="close"
        :event-color="eventColor"
        :events="functionEvents"
      ></v-date-picker>
    </v-menu>
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
    arrayEvents: null
  }),

  computed: {
    $state() {
      return this.$store.state.reservationList.reservationListData;
    },

    $datePickerType() {
      return this.$state.datePickerType;
    },

    date: {
      get() {
        //for edit
        if (this.$datePickerType == "editItemDialog") {
          return this.$state.editedItem.date;
        } else if (this.$datePickerType == "addItemDialog") {
          return this.$state.datePickerDate;
        }
      },
      set(date) {
        if (this.$datePickerType == "editItemDialog") {
           this.$store.commit("setEditedItemDate", date);
        } else if (this.$datePickerType == "addItemDialog") {
          this.$store.commit("setDatePickerDate", date);
        }
      }
    },

    ...mapGetters({}),

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
    ...mapActions([
      "actionSetDate",
      "actionSetStartDate",
      "actionSetEndDate",
      "actionResetEditDate"
    ]),
    resetEditDate() {
      this.actionResetEditDate();
    },
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