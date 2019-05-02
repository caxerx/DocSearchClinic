<template>
  <full-screen-container v-if="!consultation">
    <v-layout align-center justify-center fill-height>
      <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </full-screen-container>
  <full-screen-container :style="`height:100%; padding-left:${drawerSize}px`" v-else>
    <v-layout fill-height row>
      <v-flex :class="(videoConsultation?'xs8':'xs12')">
        <v-layout column fill-height style="overflow-y: scroll">
          <v-flex xs7>
            <v-toolbar flat>
              <v-toolbar-title>Note</v-toolbar-title>
            </v-toolbar>
            <div style="height:calc(50vh - 64px)">
              <tui-editor height="100%" mode="wysiwyg" v-model="consultation.note" ref="red"></tui-editor>
            </div>
            <v-toolbar flat>
              <v-toolbar-title>Diseases</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="addDis=!addDis">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <div :class="tfc">
              <div class="pa-3">
                <v-combobox
                  solo
                  hide-details
                  single-line
                  class="mb-3"
                  label="Disease Name"
                  v-model="disName"
                  :items="diseases"
                  item-text="name"
                ></v-combobox>
                <v-textarea
                  solo
                  class="ma-0"
                  label="Disease Description"
                  hide-details
                  v-if="typeof disName != 'object'"
                  v-model="disDesc"
                ></v-textarea>
                <v-textarea
                  solo
                  class="ma-0"
                  label="Disease Description"
                  hide-details
                  v-else
                  v-model="disName.description"
                  disabled
                ></v-textarea>
                <v-layout class="mt-2">
                  <v-spacer></v-spacer>
                  <v-btn flat class="mb-0 pb-0" @click="addDisExe">Add</v-btn>
                </v-layout>
              </div>
            </div>
            <v-card>
              <v-list class="pb-0 pt-0" two-line>
                <div v-for="d in consultation.diseases" :key="d.id">
                  <v-list-tile class="pl-2 pr-4">
                    <v-list-tile-content>
                      <v-list-tile-title>{{d.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{d.description}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon>
                        <v-icon color="red" @click="rmDis(d.id)">delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider></v-divider>
                </div>
              </v-list>
            </v-card>
            <v-toolbar flat>
              <v-toolbar-title>Prescription</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="addPre=!addPre">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <div :class="dfg">
              <div class="pa-3">
                <v-layout>
                  <v-flex class="px-1">
                    <v-text-field solo label="Drug" hide-details single-line v-model="drug"></v-text-field>
                  </v-flex>
                  <v-flex class="px-1">
                    <v-text-field solo label="Dosage" hide-details single-line v-model="dosage"></v-text-field>
                  </v-flex>
                  <v-flex class="px-1">
                    <v-text-field
                      solo
                      label="Frequency"
                      hide-details
                      single-line
                      v-model="frequency"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout class="pt-2">
                  <v-spacer></v-spacer>
                  <v-btn flat class="mb-0 pb-0" @click="addPreExe()">Add</v-btn>
                </v-layout>
              </div>
            </div>
            <v-divider></v-divider>
            <v-data-table :headers="drugTableHeader" :items="prescription" hide-actions>
              <template v-slot:items="props">
                <td>{{ props.item.drug }}</td>
                <td>{{ props.item.dosage }}</td>
                <td>{{ props.item.frequency }}</td>
                <td class="text-xs-right">
                  <v-btn icon>
                    <v-icon color="red" @click="rmPre(props.item)">delete</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
      </v-flex>
      <video-consultation
        v-if="videoConsultation"
        :patientId="patientId"
        :consultationId="consultationId"
      ></video-consultation>
    </v-layout>
    <v-navigation-drawer
      app
      touchless
      style="padding-top:64px"
      permanent
      :width="drawerSize"
      v-if="showDrawer"
    >
      <patient-detail-card :patientId="consultation.patient.id" inConsultation allergyEditable></patient-detail-card>
    </v-navigation-drawer>
  </full-screen-container>
</template>

<script>
import Editor from "@toast-ui/vue-editor/src/Editor.vue";
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import PatientDetailsCard from "@/component/PatientDetailsCard.vue";
import VideoConsultation from "@/component/VideoConsultation.vue";
import moment from "moment";
import gql from "graphql-tag";
import { setTimeout } from "timers";
export default {
  props: ["consultationId"],
  mounted() {
    this.videoConsultation = this.isVideo;
    this.$store.commit("setConsultation", true);
  },
  data() {
    return {
      addPre: false,
      disName: "",
      disDesc: "",
      addDis: false,
      consultation: null,
      diseases: [],
      videoConsultation: false,
      patientId: null,
      editorOptions: {
        mode: "wysiwyg"
      },
      messageText: "",
      messages: [],
      messageSending: false,
      file: null,
      drugTableHeader: [
        { text: "Drug", value: "drug" },
        { text: "Dosage", value: "dosage" },
        { text: "Frequency", value: "frequency" },
        { text: "", sortable: false }
      ],
      prescription: [],
      drug: "",
      dosage: "",
      frequency: ""
    };
  },
  methods: {
    pd() {},
    async endConsultation() {
      await this.editConsultation();
      this.$router.replace("/queue");
    },
    rmDis(i) {
      this.consultation.diseases.splice(
        this.consultation.diseases.findIndex(p => p.id == i),
        1
      );
    },
    rmPre(i) {
      this.prescription.splice(
        this.consultation.diseases.findIndex(p => p == i),
        1
      );
      this.consultation.prescription = JSON.stringify(this.prescription);
    },
    async addPreExe() {
      if (this.drug == "" || this.dosage == "" || this.frequency == "") return;
      this.prescription.push({
        drug: this.drug,
        dosage: this.dosage,
        frequency: this.frequency
      });
      this.consultation.prescription = JSON.stringify(this.prescription);
      this.drug = "";
      this.dosage = "";
      this.frequency = "";
      this.addPre = false;
    },
    async addDisExe() {
      if (typeof this.disName == "string") {
        let d = await this.$apollo.mutate({
          mutation: gql`
            mutation($n: String!, $d: String!) {
              createDisease(name: $n, description: $d) {
                id
              }
            }
          `,
          variables: {
            n: this.disName,
            d: this.disDesc
          }
        });
        this.$apollo.queries.diseases.refetch();
        this.consultation.diseases.push({
          id: d.data.createDisease.id,
          name: this.disName,
          description: this.disDesc
        });
      } else {
        if (!this.consultation.diseases.find(c => c.id == this.disName.id) > 0)
          this.consultation.diseases.push({
            id: this.disName.id,
            name: this.disName.name,
            description: this.disName.description
          });
      }
      this.disName = "";
      this.disDesc = "";
      this.addDis = false;
    },
    async editConsultation() {
      console.log({
        id: this.consultationId,
        w: this.$store.state.workplace,
        d: this.$store.state.selectedDoctor,
        p: this.consultation.patient.id,
        n: this.consultation.note,
        st: this.consultation.startTime,
        et:
          this.consultation.startTime == this.consultation.endTIme
            ? moment().toISOString()
            : this.consultation.endTime,
        t: this.consultation.type,
        di: this.consultation.diseases.map(r => r.id),
        r: (this.consultation.reservation || {}).id || 0,
        pp: this.consultation.prescription
      });
      await this.$apollo.mutate({
        mutation: gql`
          mutation(
            $id: ID!
            $w: ID!
            $d: ID!
            $p: ID!
            $n: String!
            $st: DateTime!
            $et: DateTime!
            $t: String!
            $di: [ID!]
            $r: ID!
            $pp: String
          ) {
            editConsultation(
              id: $id
              data: {
                workplaceId: $w
                consultantId: $d
                patientId: $p
                note: $n
                startTime: $st
                endTime: $et
                type: $t
                diseaseIds: $di
                reservationId: $r
                prescription: $pp
              }
            ) {
              id
            }
          }
        `,
        variables: {
          id: this.consultationId,
          w: this.$store.state.workplace,
          d: this.$store.state.selectedDoctor,
          p: this.consultation.patient.id,
          n: this.consultation.note,
          st: this.consultation.startTime,
          et:
            this.consultation.startTime == this.consultation.endTIme
              ? moment().toISOString()
              : this.consultation.endTime,
          t: this.consultation.type,
          di: this.consultation.diseases.map(r => r.id),
          r: (this.consultation.reservation || {}).id || 1,
          pp: this.consultation.prescription
        }
      });

      await this.$apollo.mutate({
        mutation: gql`
          mutation($rid: ID!, $dt: ReservationInput!) {
            editReservation(id: $rid, data: $dt) {
              id
            }
          }
        `,
        variables: {
          rid: this.consultation.reservation.id,
          dt: {
            reserverId: 1,
            patientId: this.consultation.patient.id,
            doctorId: this.$store.state.selectedDoctor,
            workplaceId: this.$store.state.workplace,
            consultationId: this.consultation.id,
            note: this.consultation.reservation.note,
            startTime: this.consultation.reservation.startTime,
            endTime: this.consultation.reservation.endTime,
            type: this.consultation.type,
            status: "finished"
          }
        }
      });
    }
  },
  computed: {
    cn() {
      if (!this.consultation) return null;
      return this.consultation.note;
    },
    cp() {
      if (!this.consultation) return null;
      return this.consultation.prescription;
    },
    diseasesText() {
      return this.diseases.map(d => d.name);
    },
    drawerSize() {
      if (!this.showDrawer) {
        return 0;
      }
      return this.videoConsultation ? 500 : 700;
    },
    showDrawer() {
      return this.$store.state.drawerSize == 300;
    },
    isVideo() {
      return this.$route.query.isVideo;
    },
    inConsultation() {
      return this.$store.state.inConsultation;
    },
    tfc() {
      return `add-disease ${this.addDis ? "" : "ad-close"}`;
    },
    dfg() {
      return `add-pre ${this.addPre ? "" : "ad-close"}`;
    }
  },
  watch: {
    cn() {
      this.pd();
    },
    cp() {
      if (this.cp == null || this.cp == "") {
        return;
      }
      this.prescription = JSON.parse(this.cp);
    },
    isVideo(val) {
      this.videoConsultation = !!val;
    },
    inConsultation(val) {
      if (!val) {
        this.endConsultation();
      }
    }
  },
  apollo: {
    consultation: {
      query: gql`
        query($c: ID!) {
          consultation(id: $c) {
            id
            note
            type
            startTime
            endTime
            reservation {
              id
              startTime
              endTime
              note
            }
            patient {
              avatar
              id
            }
            diseases {
              id
              name
              description
            }
            prescription
          }
        }
      `,
      variables() {
        return {
          c: this.consultationId
        };
      }
    },
    diseases: {
      query: gql`
        query {
          diseases {
            id
            name
            description
          }
        }
      `
    }
  },
  components: {
    "tui-editor": Editor,
    "full-screen-container": FullScreenContainer,
    "patient-detail-card": PatientDetailsCard,
    "video-consultation": VideoConsultation
  }
};
</script>
<style>
.add-disease {
  transition: all 0.2s;
  overflow: hidden;
  height: 255px;
}

.add-pre {
  transition: all 0.2s;
  overflow: hidden;
  height: 125px;
}

.ad-close {
  height: 0px;
}
</style>
