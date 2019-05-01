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
            <v-list-tile
              v-for="template in filterItems"
              :key="template.id"
              @click="selectTemplate(template)"
            >
              <v-list-tile-content class="subheading">
                <v-list-tile-title>
                  <span>{{ template.name }}</span>
                </v-list-tile-title>
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
              <v-btn color="primary" :disabled="!selectedTemplate" @click="saveTemplate">Save</v-btn>
              <v-btn color="error" :disabled="!selectedTemplate" @click="deleteTemplate">Delete</v-btn>
            </v-card-title>
            <!-- <v-divider></v-divider> -->
            <tui-editor
              v-model="editorText"
              height="calc(100% - 81px)"
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
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="templateDialog = false">Cancel</v-btn>
          <v-btn color="primary" :disabled="!templateName" @click="executeCreateTemplate">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="450">
      <v-card class="pa-3">
        <v-layout column>
          <v-card-title class="pl-0 headline">Are you sure to delete this template?</v-card-title>
          <v-card-text class="subheading">This cannot be undone.</v-card-text>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="executeDeleteTemplate">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import Editor from "@toast-ui/vue-editor/src/Editor.vue";
import gql from "graphql-tag";
import { setTimeout } from "timers";

export default {
  components: {
    "full-screen-container": FullScreenContainer,
    "tui-editor": Editor
  },
  data() {
    return {
      snackbar: false,
      snackbarMessage: "",
      templateDialog: false,
      templateName: "",
      deleteDialog: false,
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
    showSnackbarMessage(message) {
      this.snackbar = false;
      setTimeout(() => {
        this.snackbarMessage = message;
        this.snackbar = true;
      }, 50);
    },
    checkName(name) {
      return name.length > 0 ? true : "Name cannot be empty";
    },
    createTemplate() {
      this.templateDialog = true;
    },
    deleteTemplate() {
      this.deleteDialog = true;
    },
    async saveTemplate() {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation saveTemplate($id: ID!, $data: TemplateInput!) {
              editTemplate(id: $id, data: $data) {
                id
                name
                template
              }
            }
          `,
          variables: {
            id: this.selectedTemplate.id,
            data: {
              name: this.selectedTemplate.name,
              template: this.editorText,
              doctorId: this.$store.state.selectedDoctor
            }
          }
        });
        this.showSnackbarMessage("Template saved successfully");
        await this.$apollo.queries.templates.refetch();
      } catch (error) {
        console.dir(error);
      }
    },
    async executeCreateTemplate() {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation createTemplate($data: TemplateInput!) {
              createTemplate(data: $data) {
                id
                name
                template
              }
            }
          `,
          variables: {
            data: {
              name: this.templateName,
              template: "",
              doctorId: this.$store.state.selectedDoctor
            }
          }
        });
        this.templateName = "";
        this.showSnackbarMessage("Template created successfully");
        await this.$apollo.queries.templates.refetch();
      } catch (error) {
        console.dir(error);
      }
      this.templateDialog = false;
    },
    async executeDeleteTemplate() {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation deleteTemplate($id: ID!) {
              removeTemplate(id: $id)
            }
          `,
          variables: {
            id: this.selectedTemplate.id
          }
        });
        this.editorText = "";
        this.selectedTemplate = null;
        this.showSnackbarMessage('Template deleted')
        await this.$apollo.queries.templates.refetch();
      } catch (error) {
        console.dir(error);
      }
      this.deleteDialog = false;
    },
    selectTemplate(template) {
      this.selectedTemplate = template;
      this.editorText = template.template;
    }
  },
  computed: {
    filterItems() {
      if (this.templates) {
        return this.templates.filter(
          template =>
            template.name.toUpperCase().indexOf(this.keyword.toUpperCase()) >= 0
        );
      }
      return [];
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