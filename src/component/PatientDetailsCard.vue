<template>
  <v-layout align-center justify-center fill-height v-if="patientId >0 && patientDetails==null">
    <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
  </v-layout>

  <v-card class="fill-height" v-else>
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
                  <v-img
                    :src="`https://dsapi.1lo.li/assets/avatars/${patientDetails.avatar}`"
                    v-else
                  />
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
              <v-flex :class="(inConsultation?'xs10':'xs11')">
                <v-list class="pa-0" style="width:100%">
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{getConsultationTypeName(consultation.type)}} Consultation with Dr. {{consultation.consultant.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{getDurationDisplay(consultation.startTime,consultation.endTime)}}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-icon
                        @click="editConsultation(consultation.id)"
                        v-if="consultationEditable && consultation.consultant.id==$store.state.selectedDoctor"
                      >edit</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-action>
                      <v-icon @click="showMedicalRecord(consultation)">chevron_right</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </div>
        </div>
        <div v-if="patientDetailTab==1">
          <div v-if="allergyEditable">
            <v-toolbar flat style="background-color:transparent">
              <v-btn icon @click="addA=!addA">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <div :class="tfc">
              <v-divider></v-divider>
              <div class="pa-3">
                <v-combobox
                  solo
                  hide-details
                  single-line
                  class="mb-3"
                  label="Allergy Name"
                  v-model="aName"
                  :items="allergies"
                  item-text="name"
                ></v-combobox>
                <v-textarea
                  solo
                  class="ma-0"
                  label="Allergy Description"
                  hide-details
                  v-if="typeof aName != 'object'"
                  v-model="aDesc"
                ></v-textarea>
                <v-textarea
                  solo
                  class="ma-0"
                  label="Disease Description"
                  hide-details
                  v-else
                  v-model="aName.description"
                  disabled
                ></v-textarea>
                <v-layout class="mt-2">
                  <v-spacer></v-spacer>
                  <v-btn flat class="mb-0 pb-0" @click="addAExe">Add</v-btn>
                </v-layout>
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <v-list style="width:100%" class="pt-0 mt-0" two-line>
            <div v-for="allergy in patientDetails.allergies" :key="allergy.id">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{allergy.name}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{allergy.description}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action v-if="allergyEditable">
                  <v-btn icon @click="rmA(allergy)">
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
            <v-flex xs12 pa-3>
              <vue-markdown>{{selectedMedicalRecord.note}}</vue-markdown>
            </v-flex>
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
import VueMarkdown from "vue-markdown";
export default {
  components: {
    "vue-markdown": VueMarkdown
  },
  props: {
    patientId: String,
    allergyEditable: Boolean,
    consultationEditable: Boolean,
    inConsultation: Boolean
  },
  data() {
    return {
      aName: "",
      aDesc: "",
      addA: false,
      patientDetailTab: 0,
      selectedMedicalRecord: { id: -1 },
      drugTableHeader: [
        { text: "Drug", value: "drug" },
        { text: "Dosage", value: "dosage" },
        { text: "Frequency", value: "frequency" }
      ],
      patientDetails: null
    };
  },
  computed: {
    drugItemExample() {
      return JSON.parse(this.selectedMedicalRecord.prescription || "[]");
    },
    tfc() {
      return `add-disease ${this.addA ? "" : "ad-close"}`;
    }
  },
  methods: {
    async addAExe() {
      if (typeof this.aName == "string") {
        let d = await this.$apollo.mutate({
          mutation: gql`
            mutation($n: String!, $d: String!) {
              createAllergy(data: { name: $n, description: $d }) {
                id
              }
            }
          `,
          variables: {
            n: this.aName,
            d: this.aDesc
          }
        });
        this.$apollo.queries.allergies.refetch();
        this.patientDetails.allergies.push({
          id: d.data.createDisease.id,
          name: this.aName,
          description: this.aDesc
        });
      } else {
        if (!this.patientDetails.allergies.find(c => c.id == this.aName.id) > 0)
          this.patientDetails.allergies.push({
            id: this.aName.id,
            name: this.aName.name,
            description: this.aName.description
          });
      }
      await this.editPatient();
      this.aName = "";
      this.aDesc = "";
      this.addA = false;
    },
    async rmA(d) {
      this.patientDetails.allergies.splice(
        this.patientDetails.allergies.find(c => c == d),
        1
      );
      await this.editPatient();
    },
    async editPatient() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($p: ID!, $d: PatientInput!) {
            editPatient(id: $p, data: $d) {
              id
            }
          }
        `,
        variables: {
          p: this.patientId,
          d: {
            name: this.patientDetails.name,
            gender: this.patientDetails.gender,
            email: this.patientDetails.email,
            phoneNo: this.patientDetails.phoneNo,
            dob: this.patientDetails.dob,
            hkid: this.patientDetails.hkid,
            allergies: this.patientDetails.allergies.map(p => p.id)
          }
        }
      });
      this.$apollo.queries.patientDetails.refetch();
    },
    editConsultation(id) {
      this.$router.push("/consultation/" + id);
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
    allergies: {
      query: gql`
        query {
          allergies {
            id
            name
            description
          }
        }
      `
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
            hkid
            allergies {
              id
              name
              description
            }
            consultations {
              prescription
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

