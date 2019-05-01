<template>
  <full-screen-container v-if="templates">
    <div style="height:100%; width:100%; overflow-y: scroll" class="pa-4">
      <v-layout row fill-height>
        <v-flex xs3 pr-3>
          <h3 class="headline mb-3 --text">Document Template</h3>
          <v-layout mb-3 align-center>
            <span class="subheading">Template list</span>
            <v-spacer></v-spacer>
            <v-btn outline color="primary" @click="createTemplate">Create</v-btn>
          </v-layout>
          <v-text-field solo prepend-inner-icon="search" placeholder="Search" v-model="keyword"></v-text-field>
          <v-divider class="mb-3"></v-divider>
          <v-list style="background-color:transparent;">
            <v-list-tile v-for="(template, i) in templates" :key="i">
              <v-list-tile-title
                class="subheading selected-template"
                @click="()=>{}"
              >{{ template.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex>
          <v-card height="100%">
            <v-card-text v-if="selectedTemplate"></v-card-text>
            <v-card-title>No template selected</v-card-title>
            <!-- <v-divider></v-divider> -->
            <tui-editor
              v-model="editorText"
              height="calc(100% - 51px)"
              mode="wysiwyg"
              :options.sync="editorOptions"
            ></tui-editor>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <v-dialog v-model="templateDialog" max-width="400">
      <v-card class="pa-3">
        <v-layout column>
          <v-card-title class="pl-0 headline">Create template</v-card-title>
          <v-text-field
            v-model="templateName"
            label="Name"
            placeholder="Enter template name"
            :rules="[checkName]"
          ></v-text-field>
          <v-btn color="primary" :disabled="!templateName">Create</v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </full-screen-container>
  <full-screen-container v-else>
    <v-layout fill-height justify-center align-center>
      <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </full-screen-container>
</template>
<script>
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import Editor from "@toast-ui/vue-editor/src/Editor.vue";
import gql from "graphql-tag";

export default {
  components: {
    "full-screen-container": FullScreenContainer,
    "tui-editor": Editor
  },
  data() {
    return {
      templateDialog: false,
      templateName: "",
      keyword: "",
      templates: null,
      selectedTemplate: null,
      editorText: "",
      editorOptions: {
        useDefaultHTMLSanitizer: true,
        usageStatistics: false
      }
    };
  },
  methods: {
    checkName(name) {
      return name.length > 0 ? true : "Name cannot be empty";
    },
    createTemplate() {
      this.templateDialog = true;
    }
  },
  apollo: {
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
    }
  }
};
</script>