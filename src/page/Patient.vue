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
                      <v-img :src="patient.avatar" v-else/>
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
          <v-card class="fill-height">
            <v-layout align-center justify-center fill-height v-if="!(selectedPatient>0)">
              <div>Select a patient to view details</div>
            </v-layout>
            <v-layout
              align-center
              justify-center
              fill-height
              v-else-if="$apollo.queries.patientDetails.loading"
            >
              <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
            </v-layout>
            <v-layout column fill-height v-else>
              <v-flex>
                <v-layout row>
                  <v-flex sm4>
                    <v-list>
                      <v-list-tile avatar>
                        <v-list-tile-avatar>
                          <v-icon v-if="patientDetails.avatar==''" size="40">account_circle</v-icon>
                          <v-img :src="patientDetails.avatar" v-else/>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                          <v-list-tile-title>{{patientDetails.name}}</v-list-tile-title>
                          <v-list-tile-sub-title>{{patientDetails.gender}} ． {{getPatientDobDisplay(patientDetails.dob)}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex sm5>
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-sub-title>
                          <v-icon small>phone</v-icon>
                          {{patientDetails.phoneNo}}
                          <br>
                          <v-icon small>email</v-icon>
                          {{patientDetails.email}}
                        </v-list-tile-sub-title>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-divider></v-divider>
              <v-flex>
                <v-tabs v-model="patientDetailTab">
                  <v-tab key="0">Consultation</v-tab>
                  <v-tab key="1">Allergy</v-tab>
                  <v-tab key="2" v-show="selectedMedicalRecord.id>0">Medical Record</v-tab>
                </v-tabs>
                <v-divider></v-divider>
              </v-flex>
              <v-flex fill-height style="overflow-y: scroll">
                <div v-if="patientDetailTab==0">
                  <div v-for="consultation in patientDetails.consultations" :key="consultation.id">
                    <v-layout row class="pa-2">
                      <v-flex xs1>
                        <v-layout column>
                          <v-flex
                            class="text-xs-center subheading"
                          >{{getDay(consultation.startTime)}}</v-flex>
                          <v-flex
                            class="text-xs-center subheading"
                          >{{getDate(consultation.startTime)}}</v-flex>
                        </v-layout>
                      </v-flex>
                      <v-divider vertical class="mx-1"></v-divider>
                      <v-list class="pa-0" style="width:100%">
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{getConsultationTypeName(consultation.type)}} Consultation</v-list-tile-title>
                            <v-list-tile-sub-title>{{getDurationDisplay(consultation.startTime,consultation.endTime)}}</v-list-tile-sub-title>
                          </v-list-tile-content>

                          <v-list-tile-action>
                            <v-icon @click="a=1">edit</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-action>
                            <v-icon @click="showMedicalRecord(consultation)">chevron_right</v-icon>
                          </v-list-tile-action>
                        </v-list-tile>
                      </v-list>
                    </v-layout>
                    <v-divider></v-divider>
                  </div>
                </div>
                <div v-if="patientDetailTab==1">
                  <v-list style="width:100%" class="pt-0 mt-0" two-line>
                    <div v-for="allergy in patientDetails.allergies" :key="allergy.id">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>{{allergy.name}}</v-list-tile-title>
                          <v-list-tile-sub-title>{{allergy.description}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </div>
                  </v-list>
                </div>
                <div v-if="patientDetailTab==2">
                  <v-list style="width:100%" class="py-0 my-0">
                    <v-subheader>Note</v-subheader>
                  </v-list>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs12 pa-3>{{selectedMedicalRecord.note}}</v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-list style="width:100%" class="py-0 my-0" two-line>
                    <v-subheader>Diseases</v-subheader>
                    <div v-for="disease in selectedMedicalRecord.diseases" :key="disease.id">
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>{{disease.name}}</v-list-tile-title>
                          <v-list-tile-sub-title>{{disease.description}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </div>
                  </v-list>
                  <v-divider></v-divider>
                  <v-list style="width:100%" class="py-0 my-0" two-line>
                    <v-subheader>Prescription</v-subheader>
                  </v-list>
                  <v-divider></v-divider>
                  <v-data-table :headers="drugTableHeader" :items="drugItemExample" hide-actions>
                    <template v-slot:items="props">
                      <td>{{ props.item.drug }}</td>
                      <td>{{ props.item.dosage }}</td>
                      <td>{{ props.item.frequency }}</td>
                    </template>
                  </v-data-table>
                  <v-divider></v-divider>
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </full-screen-container>
</template>
<script>
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import gql from "graphql-tag";
import moment from "moment";
export default {
  components: {
    "full-screen-container": FullScreenContainer
  },
  props: ["patientId"],
  data() {
    return {
      keyword: "",
      patientTab: 0,
      patientDetailTab: 0,
      selectedPatient: -1,
      patientType: ["Today", "Recent", "All"],
      patientsList: null,
      filteredPatientsList: [[], [], []],
      patientDetails: {},
      selectedMedicalRecord: { id: -1 },
      drugTableHeader: [
        { text: "Drug", value: "drug" },
        { text: "Dosage", value: "dosage" },
        { text: "Frequency", value: "frequency" }
      ],
      drugItemExample: [
        {
          drug: "Drug",
          dosage: "2 pill",
          frequency: "every 5 hours"
        }
      ]
    };
  },
  mounted() {
    this.selectedPatient = this.patientId;
  },
  methods: {
    selectPatient(patient) {
      this.$router.push("/patient/" + patient);
    },
    getGenderName(gender) {
      if (gender == "M" || gender == "m") {
        return "Male";
      } else {
        return "Female";
      }
    },
    getConsultationTypeName(type) {
      if (type == "online" || type == "ONLINE") {
        return "Online";
      } else {
        return "Clinic";
      }
    },
    getAge(dob) {
      return moment().diff(moment(dob), "year");
    },
    getPatientDobDisplay(dob) {
      return `${moment(dob).format("YYYY-MM-DD")} (${this.getAge(dob)})`;
    },
    getDay(date) {
      return moment(date).format("DD");
    },
    getDate(date) {
      return moment(date).format("MMM YY");
    },
    getDurationDisplay(start, end) {
      return `${moment(start).format("h:mm A")} for ${moment(end).diff(
        moment(start),
        "minute"
      )} mins`;
    },
    showMedicalRecord(consultation) {
      this.selectedMedicalRecord = consultation;
      this.patientDetailTab = 2;
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
          p => moment().diff(moment(p.startTime), "day") <= 7
        )
      );
    },
    filterToday(patients) {
      return patients.filter(p =>
        p.consultations.some(
          p => moment().diff(moment(p.startTime), "day") <= 1
        )
      );
    }
  },
  watch: {
    patientId(val) {
      this.selectedPatient = val;
    },
    selectedPatient() {
      this.$apollo.queries.patientDetails.refetch();
      this.patientDetailTab = 0;
    },
    patientDetailTab(newVal, oldVal) {
      if (oldVal == 2) {
        this.selectedMedicalRecord = { id: -1 };
      }
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
    },
    patientDetails: {
      query: gql`
        query getPatientDetails($patientId: ID!) {
          patient(id: $patientId) {
            name
            gender
            avatar
            dob
            phoneNo
            email
            allergies {
              id
              name
              description
            }
            consultations {
              id
              startTime
              endTime
              type
              note
              diseases {
                id
                name
                description
              }
            }
          }
        }
      `,
      variables() {
        return {
          patientId: this.selectedPatient
        };
      },
      skip() {
        return !(this.selectedPatient > 0);
      },
      update: data => data.patient
    }
  }
};
</script>

