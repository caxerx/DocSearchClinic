<template>
  <full-screen-container v-if="!patientsList">
    <v-layout align-center justify-center fill-height>
      <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </full-screen-container>
  <full-screen-container v-else>
    <div style="height:100%; width:100%" class="pa-4">
      <v-layout fill-height>
        <v-flex xs3>
          <v-layout column fill-height>
            <v-flex>
              <h3 class="headline --text">Patient</h3>
              <v-tabs v-model="patientTab" slider-color="orange" color="transparent" class="mb-3">
                <v-tab v-for="pType in patientType" :key="pType" ripple>{{pType}}</v-tab>
              </v-tabs>
              <v-text-field solo prepend-inner-icon="search" v-model="keyword"></v-text-field>
              <v-divider class="mb-4"></v-divider>
            </v-flex>

            <v-flex fill-height style="overflow-y: scroll">
              <div v-for="(patients,pIndex) in filteredPatientsList" :key="pIndex">
                <v-list flat style="background-color:transparent;" v-if="patientTab == pIndex">
                  <v-list-tile
                    avatar
                    v-for="patient in patients"
                    :key="patient.id"
                    @click="selectPatient(patient.id)"
                  >
                    <v-list-tile-avatar>
                      <v-icon v-if="patient.avatar==''" size="40">account_circle</v-icon>
                      <v-img :src="getAvatar(patient.avatar)" v-else/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{patient.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{getGenderName(patient.gender)}}．{{getAge(patient.dob)}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="pl-4">
          <patient-details-card consultationEditable :patientId="selectedPatient"></patient-details-card>
        </v-flex>
      </v-layout>
    </div>
  </full-screen-container>
</template>
<script>
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import PatientDetailsCard from "@/component/PatientDetailsCard.vue";
import gql from "graphql-tag";
import moment from "moment";
export default {
  components: {
    "full-screen-container": FullScreenContainer,
    "patient-details-card": PatientDetailsCard
  },
  props: ["patientId"],
  data() {
    return {
      keyword: "",
      patientTab: 0,
      selectedPatient: "-1",
      patientType: ["Today", "Recent", "All"],
      patientsList: null,
      filteredPatientsList: [[], [], []]
    };
  },
  mounted() {
    this.selectedPatient = this.patientId;
  },
  methods: {
    selectPatient(patient) {
      this.$router.push("/patient/" + patient);
    },
    getAge(dob) {
      return moment().diff(moment(dob), "year");
    },
    getGenderName(gender) {
      if (gender == "M" || gender == "m") {
        return "Male";
      } else {
        return "Female";
      }
    },
    filterPatient(keyword) {
      this.filteredPatientsList = [[], [], []];
      for (let i1 in this.patientsList) {
        for (let i2 of this.patientsList[i1]) {
          if (
            keyword == "" ||
            ((i2.name && i2.name.includes(keyword)) ||
              (i2.email && i2.email.includes(keyword)))
          )
            this.filteredPatientsList[i1].push(i2);
        }
      }
    },
    filterRecent(patients) {
      return patients.filter(p =>
        p.consultations.some(
          p => moment().diff(moment(p.startTime), "month") <= 1
        )
      );
    },
    filterToday(patients) {
      console.log(patients)
      return patients.filter(p =>
        p.consultations.some(
          p => moment().diff(moment(p.startTime), "day") <= 1
        )
      );
    },
    getAvatar(i) {
      return this.$store.state.avatarBase + i;
    }
  },
  watch: {
    patientId(val) {
      this.selectedPatient = val;
    },
    patientsList() {
      this.keyword = "";
      this.filterPatient(this.keyword);
    },
    keyword(newVal) {
      this.filterPatient(newVal);
    }
  },
  apollo: {
    patientsList: {
      query: gql`
        query getPatients($doctorId: ID!) {
          doctor(id: $doctorId) {
            patients {
              id
              name
              gender
              dob
              avatar
              email
              consultations {
                startTime
              }
            }
          }
        }
      `,
      variables() {
        return {
          doctorId: this.$store.state.selectedDoctor
        };
      },
      update(data) {
        return [
          this.filterToday(data.doctor.patients),
          this.filterRecent(data.doctor.patients),
          data.doctor.patients
        ];
      }
    }
  }
};
</script>

