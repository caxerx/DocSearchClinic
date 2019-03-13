<template>
  <v-card color="grey lighten-4" min-width="350px" flat>
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img :src="icon">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>
            <a :href="getPatientLink(patient.id)">{{patient.name}}</a>
          </v-list-tile-title>
          <v-list-tile-sub-title>{{patient.details}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <br>
      <v-list-tile-action class="text-md-center">
        <div style="width:70%;display: block;margin-left: auto;margin-right: auto;">
          <v-btn flat block outline>Check-in</v-btn>
        </div>
      </v-list-tile-action>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-tile>
        <v-list-tile-sub-title>
          <v-icon>phone</v-icon>
          {{patient.phoneNo}}
          <br>
          <v-icon>email</v-icon>
          {{patient.email}}
        </v-list-tile-sub-title>
      </v-list-tile>
    </v-list>

    <v-list>
      <v-list-tile>
        <v-list-tile-title>
          <b>{{ formatAMPM(patient.time) }}</b>
          for {{patient.duration}} mins
        </v-list-tile-title>
        <v-spacer></v-spacer>
        <v-list-tile-action>
          <v-btn icon left>
            <v-icon color="success">edit</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action>
          <v-btn icon left>
            <v-icon color="error">cancel</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    // attribute name: Type
    patient: Object,
    icon: String
  },

  computed: {},

  methods: {
    //temporarily time to ampm
    formatAMPM(time) {
      var hours = time.split(":")[0];
      var minutes = time.split(":")[1];
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 && minutes != "00" ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + "  " + ampm;
      return strTime;
    },
    getPatientLink(id) {
      return "/patientList?id=" + id;
    }
  }
};
</script>
