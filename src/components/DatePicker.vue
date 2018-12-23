<template>
  <div>
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
        v-model="computedDateFormatted"
        label="Date (read only text field)"
        hint="YYYY-MM-DD format"
        persistent-hint
        prepend-icon="event"
        readonly
      ></v-text-field>
      <v-date-picker v-model="newDate" no-title @input="menu2 = false" @change="setDate"></v-date-picker>
    </v-menu>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data: vm => ({
    // date: new Date().toISOString().substr(0, 10),
    // dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    newDate: ""
  }),

  computed: {
    ...mapGetters({
      date: "getDate"
    }),

    defaultDate() {
      return this.date;
    },
    computedDateFormatted() {
      if (this.newDate == "") {
        return this.date;
      } else {
        return this.formatDate(this.newDate);
      }
    }
  },

//   watch: {
//     newDate(val) {
//       this.dateFormatted = this.formatDate(this.newDate);
//     }
//   },

  methods: {
    ...mapActions(["actionSetDate"]),
    setDate() {
      this.actionSetDate(this.newDate);
    },
    formatDate(newDate) {
      if (!newDate) return null;

      const [year, month, day] = newDate.split("-");
      return `${year}-${month}-${day}`;
    }
    // parseDate(date) {
    //   if (!date) return null;

    //   const [day, month, year] = date.split("/");
    //   return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    // }
  }
};
</script>