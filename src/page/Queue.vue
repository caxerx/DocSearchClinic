<template>
  <full-screen-container>
    <div style="height:100%; width:100%" class="pa-4">
      <v-layout fill-height>
        <v-flex xs3>
          <v-layout column fill-height>
            <v-flex>
              <h3 class="headline mb --text">
                Queue
                <v-dialog v-model="checkInDialog" width="400">
                  <template v-slot:activator="{ on }">
                    <v-btn outline color="primary" v-on="on">Check in</v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="headline">Check-in</v-card-title>
                    <v-container>
                      <v-layout justify-center align-center column>
                        <v-flex>
                          <v-form ref="checkinform" @submit.prevent="checkIn()">
                            <v-text-field
                              outline
                              label="Focus and scan"
                              color="primary"
                              v-model="checkinString"
                            ></v-text-field>
                          </v-form>
                        </v-flex>
                        <v-flex>
                          <qrcode-stream
                            @decode="onDecode"
                            style="height: 250px; width: 250px; background-color:black"
                            v-if="checkInDialog"
                          ></qrcode-stream>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-dialog>
              </h3>
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
  </full-screen-container>
</template>
<script>
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  components: {
    "full-screen-container": FullScreenContainer,
    "qrcode-stream": QrcodeStream
  },
  data() {
    return {
      checkInDialog: false,
      checkinString: "",
      patientTab: 0,
      selectedPatient: null,
      patientType: ["All", "Clinic", "Online"],
      patientsList: [[], [], []]
    };
  },
  methods: {
    onDecode(str) {
      this.checkinString = str;
      this.checkIn();
    },
    checkIn() {
      this.checkInDialog = false;
      this.checkinString = "";
    }
  },
  created() {}
};
</script>

