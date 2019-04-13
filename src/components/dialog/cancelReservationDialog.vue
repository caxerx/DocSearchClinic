<template>
  <v-dialog :value="dialog" @input="cancelDialog()" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Allergies</v-card-title>

      <v-list>
        <v-list-tile v-for="(a,index) in patient.allergies" :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{a.name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{a.description}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="cancelDialog()">Ok</v-btn>
        <v-btn color="primary" flat @click="">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    patient: Object,
    icon: String,
    date: String,
    startTime: String,
    duration: Number,
    note: String,
    dialog:Boolean,
  },
  methods: {
    cancelDialog() {
      this.$emit("input", false);
    }
  }
};
</script>
