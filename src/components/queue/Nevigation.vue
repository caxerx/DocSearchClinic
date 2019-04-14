<template>
  <div>
    <h3 class="headline mb --text">Queue</h3>
    <v-tabs v-model="active" slider-color="orange" color="transparent">
      <v-tab v-for="(type,index) in types" :key="index" ripple>{{type}}</v-tab>
    </v-tabs>

    <div v-if="active==0">
      <v-list flat style="background-color:transparent;">
        <div v-for="(queue,index) in currentQueue" :key="index">
          <v-list-tile @click="setPatient(queue,queue.patient)" avatar>
            <v-list-tile-avatar>
              <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="queue.patient.name"></v-list-tile-title>
              <v-list-tile-sub-title>Arrived {{randomTime()}} ago</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </div>
    <div v-else-if="active==1">
      <v-list flat style="background-color:transparent;">
        <v-list-tile
          v-for="(queue,index) in isClinc(currentQueue)"
          :key="index"
          avatar
          @click="setPatient(queue,queue.patient)"
        >
          <v-list-tile-avatar>
            <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="queue.patient.name"></v-list-tile-title>
            <v-list-tile-sub-title>Arrived {{randomTime()}} ago</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>

    <div v-else-if="active==2">
      <v-list flat style="background-color:transparent;">
        <v-list-tile
          v-for="(queue,index) in isOnline(currentQueue)"
          :key="index"
          avatar
          @click="setPatient(queue,queue.patient)"
        >
          <v-list-tile-avatar>
            <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="queue.patient.name"></v-list-tile-title>
            <v-list-tile-sub-title>Arrived {{randomTime()}} ago</v-list-tile-sub-title>
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
      types: ["All", "Clinic", "Online"]
    };
  },
  components: {},
  props: {
    currentQueue: Array
  },
  computed: {
    ...mapGetters({})
  },

  methods: {
    ...mapActions(["actionSetPatientFromQueue"]),

    setPatient(queue, patient) {
      console.log(queue + " " + patient);
      this.actionSetPatientFromQueue({
        queue: queue,
        patient: patient
      });
    },
    randomTime() {
      if (Math.random() > 0.95) {
        return "1 hour";
      } else {
        return parseInt(Math.random() * 57 + 2) + " minutes";
      }
      return;
    },

    isOnline(arr) {
      let onlineArr = arr.filter(function(e) {
        return e.type === "online";
      });

      return onlineArr
    },
    isClinc(arr) {
      let clincArr = arr.filter(function(e) {

        return e.type === "clinic";
      });

      return clincArr
    }
  }
};
</script>


<style scoped>
.theme--light.v-divider {
  border-color: transparent;
}
</style>

