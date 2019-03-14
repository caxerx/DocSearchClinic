<template>
  <div>
    <h3 class="headline mb --text">Queue</h3>
    <v-tabs v-model="active" slider-color="orange" color="transparent">
      <v-tab v-for="type in types" :key="type" ripple>{{type}}</v-tab>
    </v-tabs>

    <div v-if="active==0">
      <v-list flat style="background-color:transparent;">
        <div v-for="(patient,index) in patientList" :key="index" avatar>
          <div v-if="isToday(patient.date)">
            <v-list-tile @click="pushIdToURL(patient)">
              <v-list-tile-avatar>
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="patient.name"></v-list-tile-title>
                <v-list-tile-sub-title>Arrived {{randomTime()}} ago</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </div>
        </div>
      </v-list>
    </div>
    <div v-else-if="active==1">
      <v-list flat style="background-color:transparent;">
        <v-list-tile
          v-for="(patient,index) in patientList"
          :key="index"
          avatar
          @click="pushIdToURL(patient)"
        >
          <v-list-tile-avatar>
            <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="patient.name"></v-list-tile-title>
            <v-list-tile-sub-title>Arrived {{randomTime()}} ago</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <div v-else-if="active==2">
      <v-list flat style="background-color:transparent;">
        <v-list-tile
          v-for="(patient,index) in patientList"
          :key="index"
          avatar
          @click="pushIdToURL(patient)"
        >
          <v-list-tile-avatar>
            <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="patient.name"></v-list-tile-title>
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
export default {
  data() {
    return {
      search: "",
      active: 0,
      types: ["All", "Clinic", "Online"],
      patientid: 0
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      getPatientListData: "getPatientListData"
    }),
    name() {
      return this.getPatientListData.clinc.name;
    },
    patientList() {
      return this.getPatientListData.clinc.patientList;
    }
  },

  methods: {
    ...mapActions(["actionReset"]),
    isToday(day) {
      if (day == new Date().toISOString().substr(0, 10)) {
        return true;
      } else {
        return false;
      }
    },
    pushIdToURL(patient) {
      this.$router.push({
        name: "clincQueueList",
        query: {
          id: patient.id
        }
      });
    },
    randomTime() {
      if (Math.random() > 0.95) {
        return "1 hour";
      } else {
        return parseInt(Math.random() * 57 + 2) + " minutes";
      }
      return;
    }
  }
};
</script>


<style scoped>
.theme--light.v-divider {
  border-color: transparent;
}
</style>

