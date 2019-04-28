<template>
  <v-card class="fill-height">
    <v-layout align-center justify-center fill-height v-if="!(patientId>0)">
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
        <v-layout row wrap>
          <v-flex :class="(inConsultation?'xs12':'xs6')">
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
          <v-flex>
            <v-list avatar>
              <v-list-tile>
                <v-list-tile-avatar></v-list-tile-avatar>
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
              <v-flex :class="(inConsultation?'xs2':'xs1')">
                <v-layout column>
                  <v-flex class="text-xs-center subheading">{{getDay(consultation.startTime)}}</v-flex>
                  <v-flex class="text-xs-center subheading">{{getDate(consultation.startTime)}}</v-flex>
                </v-layout>
              </v-flex>
              <v-divider vertical class="mx-1"></v-divider>
              <v-list class="pa-0" style="width:100%">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{getConsultationTypeName(consultation.type)}} Consultation with Dr. {{consultation.consultant.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{getDurationDisplay(consultation.startTime,consultation.endTime)}}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-icon
                      @click="a=1"
                      v-if="consultationEditable && consultation.consultant.id==$store.state.selectedDoctor"
                    >edit</v-icon>
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
          <v-toolbar flat style="background-color:transparent" v-if="allergyEditable">
            <v-btn icon>
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-list style="width:100%" class="pt-0 mt-0" two-line>
            <div v-for="allergy in patientDetails.allergies" :key="allergy.id">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{allergy.name}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{allergy.description}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action v-if="allergyEditable">
                  <v-btn icon>
                    <v-icon color="error">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
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
</template>
<script>
import gql from "graphql-tag";
import moment from "moment";
export default {
  props: {
    patientId: String,
    allergyEditable: Boolean,
    consultationEditable: Boolean,
    inConsultation: Boolean
  },
  data() {
    return {
      patientDetailTab: 0,
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
      ],
      patientDetails: {}
    };
  },
  methods: {
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
    getConsultationTypeName(type) {
      if (type == "online" || type == "ONLINE") {
        return "Online";
      } else {
        return "Clinic";
      }
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
    }
  },
  watch: {
    patientId() {
      this.$apollo.queries.patientDetails.refetch();
      this.patientDetailTab = 0;
    },
    patientDetailTab(newVal, oldVal) {
      if (oldVal == 2) {
        this.selectedMedicalRecord = { id: -1 };
      }
    }
  },
  apollo: {
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
              consultant {
                id
                name
              }
            }
          }
        }
      `,
      variables() {
        return {
          patientId: this.patientId
        };
      },
      skip() {
        return !(this.patientId > 0);
      },
      update: data => data.patient
    }
  }
};
</script>

