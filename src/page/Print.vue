<template>
  <full-screen-container v-if="templates">
    <div style="height:100%; width:100%; overflow-y: scroll" class="pa-4">
      <v-layout row fill-height>
        <v-flex xs4 pr-3>
          <h3 class="headline mb-3 --text">Document Printing</h3>
          <v-select
            v-model="selectedTemplate"
            label="Template"
            :items="templates"
            return-object
            item-text="name"
          ></v-select>
          <v-text-field solo prepend-inner-icon="search" placeholder="Search" v-model="keyword"></v-text-field>
          <v-divider class="mb-3"></v-divider>
          <v-list style="background-color:transparent;">
            <v-list-tile
              v-for="consultation in filterItems"
              :key="consultation.id"
              @click="selectConsultation(consultation)"
            >
              <v-list-tile-avatar color="grey">
                <v-img
                  v-if="consultation.patient.avatar"
                  :src="getAvatar(consultation.patient.avatar)"
                ></v-img>
                <v-icon dark v-else>account_circle</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content class="subheading">
                <v-list-tile-title>
                  <span>{{ getConsultationTypeDisplay( consultation.type) }}</span>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <span>{{ consultation.patient.name }} - {{ getTimeDisplay(consultation.startTime) }}</span>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex>
          <v-card height="100%">
            <v-card-title class="subheading">
              <span v-if="selectedTemplate">{{ selectedTemplate.name }}</span>
              <span v-else>No template selected</span>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :disabled="!(selectedTemplate && selectedConsultation)"
                @click="print"
              >Print</v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <tui-viewer
              class="pa-3"
              id="viewer"
              ref="tuiViewer"
              :value="preview"
              height="calc(100% - 81px)"
            ></tui-viewer>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <v-snackbar v-model="snackbar">{{ snackbarMessage }}</v-snackbar>
  </full-screen-container>
  <full-screen-container v-else>
    <v-layout fill-height justify-center align-center>
      <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </full-screen-container>
</template>
<script>
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import { Viewer } from "@toast-ui/vue-editor";
import gql from "graphql-tag";
import moment from "moment";
import printJS from "print-js";
import html2canvas from "html2canvas";

export default {
  components: {
    "full-screen-container": FullScreenContainer,
    "tui-viewer": Viewer
  },
  data() {
    return {
      snackbar: false,
      snackbarMessage: "",
      keyword: "",
      doctor: null,
      templates: null,
      consultations: null,
      selectedTemplate: null,
      selectedConsultation: null,
      viewerText: ""
    };
  },
  methods: {
    getHtml() {
      return this.$refs.tuiEditor.invoke("getHtml");
    },
    getAvatar(avatar) {
      return `https://dsapi.1lo.li/assets/avatars/${avatar}`;
    },
    getConsultationTypeDisplay(t) {
      if (t == "online" || t == "ONLINE") {
        return "Online Consultation";
      }
      return "Clinic Consultation";
    },
    getTimeDisplay(time) {
      return moment(time).format("YYYY-MM-DD h:mm A");
    },
    showSnackbarMessage(message) {
      this.snackbar = false;
      setTimeout(() => {
        this.snackbarMessage = message;
        this.snackbar = true;
      }, 50);
    },
    selectConsultation(consultation) {
      this.selectedConsultation = consultation;
    },
    async print() {
      // printJS("print-test", "html");
      // console.log(this.preview)
      try {
        // const result = await this.$apollo.mutate({
        //   mutation: gql`
        //     mutation renderMarkdown($md: String!) {
        //       renderMarkdown(markdown: $md) {
        //         message
        //         success
        //         pdfUri
        //       }
        //     }
        //   `,
        //   variables: {
        //     md: this.preview
        //   }
        // });
        // console.log(data);
        // printJS("viewer", "html");
        html2canvas(document.querySelector("#viewer"), { scale: 1 }).then(
          canvas => {
            printJS(canvas.toDataURL(), "image");
          }
        );
      } catch (err) {
        console.dir(err);
        this.showSnackbarMessage("Error trying to print document");
      }
    }
  },
  computed: {
    filterItems() {
      if (this.consultations) {
        return this.consultations.filter(
          consultation =>
            consultation.patient.name
              .toUpperCase()
              .indexOf(this.keyword.toUpperCase()) >= 0
        );
      }
      return [];
    },
    preview() {
      let output = "";
      if (this.selectedTemplate && this.selectedConsultation) {
        const c = this.selectedConsultation;
        output = this.selectedTemplate.template;
        // Doctor name
        output = output.replace(/{{doctorName}}/g, this.doctor.name);
        // Patient name
        output = output.replace(/{{patientName}}/g, c.patient.name);
        // Consultation time
        output = output.replace(
          /{{consultationTime}}/g,
          this.getTimeDisplay(c.startTime)
        );
        // Consultation note
        output = output.replace(/{{consultationNote}}/g, c.note);
        // Diseases
        let diseaseStr = "";
        if (c.diseases.length > 0) {
          diseaseStr = c.diseases[0].name;
          for (let i = 1; i < c.diseases.length; i++) {
            if (i == c.diseases.length - 1) {
              diseaseStr += ` and ${c.diseases[i].name}`;
            } else {
              diseaseStr += `, ${c.diseases[i].name}`;
            }
          }
        }
        output = output.replace(/{{diseases}}/g, diseaseStr);
        // Prescription
        let prescription = JSON.parse(c.prescription);
        let prescriptionStr = "";
        // Render JSON to GFM table
        if (prescription.length > 0) {
          let keys = Object.keys(prescription[0]);
          prescriptionStr += "|" + keys.map(k => `${k}|`).join("") + "\n";
          prescriptionStr += "|" + keys.map(k => "---|").join("") + "\n";
          for (let p of prescription) {
            prescriptionStr += "|" + keys.map(k => `${p[k]}|`).join("");
          }
        }
        output = output.replace(/{{prescription}}/g, prescriptionStr);
      } else {
        output = "Please select template and consultation";
      }
      return output;
    }
  },
  apollo: {
    doctor: {
      query: gql`
        query getDoctor($id: ID!) {
          doctor(id: $id) {
            name
          }
        }
      `,
      variables() {
        return {
          id: this.$store.state.selectedDoctor
        };
      },
      update({ doctor }) {
        return doctor;
      },
      error(err) {
        console.dir(err);
      }
    },
    templates: {
      query: gql`
        query getTemplates($id: ID!) {
          doctor(id: $id) {
            templates {
              id
              name
              template
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$store.state.selectedDoctor
        };
      },
      update({ doctor }) {
        return doctor.templates;
      },
      error(err) {
        console.dir(err);
      }
    },
    consultations: {
      query: gql`
        query getConsultations($id: ID!) {
          doctor(id: $id) {
            consultations {
              id
              patient {
                id
                name
                avatar
              }
              diseases {
                id
                name
                description
              }
              startTime
              endTime
              type
              note
              prescription
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$store.state.selectedDoctor
        };
      },
      update({ doctor }) {
        return doctor.consultations;
      },
      error(err) {
        console.dir(err);
      }
    }
  }
};
</script>