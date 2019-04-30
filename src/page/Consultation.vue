<template>
  <full-screen-container v-if="patientId">
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
            <div style="height:calc(100% - 64px)">
              <tui-editor height="100%" :options="editorOptions"></tui-editor>
            </div>
            <v-toolbar flat>
              <v-toolbar-title>Diseases</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card>
              <v-list>
                <v-list-tile v-for="d in diseasesExample" :key="d.id">
                  <v-list-tile-content>
                    <v-list-tile-title>{{d.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{d.description}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
            <v-divider></v-divider>
            <v-toolbar flat>
              <v-toolbar-title>Prescription</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-data-table :headers="drugTableHeader" :items="drugItemExample" hide-actions>
              <template v-slot:items="props">
                <td>{{ props.item.drug }}</td>
                <td>{{ props.item.dosage }}</td>
                <td>{{ props.item.frequency }}</td>
                <td class="text-xs-right">
                  <v-btn icon>
                    <v-icon color="info">edit</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon color="red">delete</v-icon>
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
      <patient-detail-card :patientId="patientId" inConsultation allergyEditable></patient-detail-card>
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
      drugItemExample: [
        {
          drug: "Drug",
          dosage: "2 pill",
          frequency: "every 5 hours"
        }
      ],
      diseasesExample: [
        { name: "Diseases", description: "I think this is a long text.", id: 0 }
      ]
    };
  },
  methods: {
    endConsultation() {
      this.$router.replace("/");
    }
  },
  computed: {
    drawerSize() {
      if (!this.showDrawer) {
        return 0;
      }
      return this.videoConsultation ? 500 : 1000;
    },
    showDrawer() {
      return this.$store.state.drawerSize == 300;
    },
    isVideo() {
      return this.$route.query.isVideo;
    },
    inConsultation() {
      return this.$store.state.inConsultation;
    }
  },
  watch: {
    isVideo(val) {
      this.videoConsultation = !!val;
    },
    inConsultation(val) {
      if (!val) {
        this.endConsultation();
      }
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
