<template>
  <div
    style="position:fixed; top:0; left:0; height: 100vh; width: 100vw; padding-top: 64px; padding-left: 300px; "
  >
    <div style="height:100%; width:100%" class="pa-4">
      <v-layout fill-height>
        <v-flex xs3>
          <v-layout column fill-height>
            <v-flex>
              <h3 class="headline mb --text">Queue</h3>
              <v-tabs v-model="patientTab" slider-color="orange" color="transparent">
                <v-tab v-for="pType in patientType" :key="pType" ripple>{{pType}}</v-tab>
              </v-tabs>
            </v-flex>

            <v-flex fill-height style="overflow-y: scroll">
              <div v-for="(patients,pIndex) in patientsList" :key="pIndex">
                <v-list flat style="background-color:transparent;" v-if="patientTab == pIndex">
                  <v-list-tile avatar v-for="patient in patients" :key="patient.id">
                    <v-list-tile-avatar>
                      <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{patient.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>1min ago</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="pl-4">
          <v-card class="fill-height">
            <v-layout align-center justify-center fill-height v-if="!selectedPatient">
              <div>Select a patient to view details</div>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      patientTab: 0,
      selectedPatient: null,
      patientType: ["All", "Clinic", "Online"],
      patientsList: [
        [],
        [],
        []
      ]
    };
  },
  created() {
  }
};
</script>

