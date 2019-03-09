<template>
  <v-container>
    <v-card class="mb-2">
      <v-card-title class="headline">Placeholder List</v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 md6 xl3>{DoctorName} - Doctor Name</v-flex>
          <v-flex xs12 md6 xl3>{DoctorTel} - Doctor Telephone</v-flex>
          <v-flex xs12 md6 xl3>{DocContent} - Document Content</v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>Template Editor</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="preview">
          <v-icon>visibility</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>save</v-icon>
        </v-btn>
      </v-toolbar>
      <editor mode="wysiwyg" :options="editorOptions" v-model="docTemplate" ref="tuiEditor"></editor>
    </v-card>
    <div v-html="previewHtml"></div>
  </v-container>
</template>

<script>
import { Editor } from "@toast-ui/vue-editor";
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";

export default {
  components: {
    editor: Editor
  },
  data: () => ({
    previewHtml: "",
    docTemplate: "",
    editorOptions: {
      minHeight: "200px",
      language: "en_US",
      useCommandShortcut: true,
      useDefaultHTMLSanitizer: true,
      usageStatistics: true,
      hideModeSwitch: true,
      toolbarItems: [
        "heading",
        "bold",
        "italic",
        "strike",
        "divider",
        "hr",
        "quote",
        "divider",
        "ul",
        "ol",
        "task",
        "indent",
        "outdent",
        "divider",
        "table",
        "image",
        "link"
      ]
    }
  }),
  methods: {
    preview() {
      this.previewHtml = this.$refs.tuiEditor.invoke("getHtml");
      while (this.previewHtml.search("{DoctorName}") > 0) {
        this.previewHtml = this.previewHtml.replace(
          "{DoctorName}",
          "Michael Wang"
        );
      }

      while (this.previewHtml.search("{DoctorTel}") > 0) {
        this.previewHtml = this.previewHtml.replace(
          "{DoctorTel}",
          "+852 2338 2338"
        );
      }

      while (this.previewHtml.search("{DocContent}") > 0) {
        this.previewHtml = this.previewHtml.replace("{DocContent}", "<br><br>");
      }
    }
  }
};
</script>
