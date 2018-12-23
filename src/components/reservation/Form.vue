<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <date-picker/>
    <v-text-field prepend-icon="access_time" v-model="selectTime" label="Time" :checked="time"></v-text-field>
    <v-btn :disabled="!valid" @click="submit" style="float:left">submit</v-btn>
    <v-btn @click="clear" style="float:left">clear</v-btn>
  </v-form>
</template>

<script>
import axios from "axios";
import DatePicker from "../DatePicker";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),

  computed: {
    ...mapGetters({
      time: "getTime"
    }),

    selectTime(){
      return this.time;
    }
  },

  components: {
    DatePicker
  },

  methods: {
    ...mapActions(["actionReset"]),

    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post("/api/submit", {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox
        });
      }
    },
    clear() {
      this.actionReset();
      this.$refs.form.reset();
    }
  }
};
</script>