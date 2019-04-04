<template>
  <div>
    <h3 class="headline mb --text">Patients</h3>
    <div class="black--text">{{doctor.workplace.name}}</div>
    <v-tabs v-model="active" slider-color="orange" color="transparent">
      <v-tab v-for="type in types" :key="type" ripple>{{type}}</v-tab>
    </v-tabs>

      <div v-if="active==0">
        <v-list flat style="background-color:transparent;">
          <div v-for="(patient,index) in patients" :key="index" avatar>
            <div v-if="patients!=null&&isToday(patient.consultations)">
              <v-list-tile @click="pushIdToURL(patient)">
                <v-list-tile-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="patient.name"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </div>
          </div>
        </v-list>
      </div>
      <div v-else-if="active==1">
        <v-list flat style="background-color:transparent;">
          <v-list-tile
            v-for="(patient,index) in patients"
            :key="index"
            avatar
            @click="pushIdToURL(patient)"
          >
            <v-list-tile-avatar>
              <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="patient.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
      <div v-else-if="active==2">
        <v-list flat style="background-color:transparent;">
          <v-list-tile
            v-for="(patient,index) in patients"
            :key="index"
            avatar
            @click="pushIdToURL(patient)"
          >
            <v-list-tile-avatar>
              <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="patient.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>

    <v-divider></v-divider>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
let moment = require("moment");

export default {
  data() {
    return {
      search: "",
      active: 0,
      types: ["Today", "Recent", "All"],
      patientid: 0
    };
  },
  props: {
    patients: Array,
    doctor: Object
  },
  components: {},
  computed: {},

  methods: {
    ...mapActions(["actionReset"]),
    isToday(obj) {
      if (obj.length < 1) {
        return false;
      }

      for (let i = 0; i < obj.length; i++) {
        let startTime = obj[i].startTime;
        let date = moment.utc(startTime).format("YYYY-MM-DD");
        if (date == "2019-03-01") {
          return true;
        }
      }

      return false;
    },
    pushIdToURL(patient) {
      this.$router.push({
        name: "patientList",
        query: {
          id: patient.id
        }
      });
    }
  }
};
</script>


<style scoped>
.theme--light.v-divider {
  border-color: transparent;
}
</style>

