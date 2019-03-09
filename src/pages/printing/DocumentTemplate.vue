<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md6>
        <v-card class="mb-2">
          <v-card-title class="headline">Placeholder List</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 lg6>{DoctorName} - Doctor Name</v-flex>
              <v-flex xs12 lg6>{DoctorTel} - Doctor Telephone</v-flex>
              <v-flex xs12 lg6>{DocContent} - Document Content</v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Template Editor</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>save</v-icon>
            </v-btn>
          </v-toolbar>
          <editor mode="wysiwyg" :options="editorOptions" v-model="docTemplate" ref="tuiEditor"></editor>
        </v-card>
      </v-flex>
      <v-divider vertical class="mx-2"></v-divider>
      <v-flex md5>
        <span class="headline">Preview</span>
          <v-sheet color="white" class="pa-3">
            <div v-html="previewHtml" style="width:100%"></div>
          </v-sheet>
      </v-flex>
    </v-layout>
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
  watch: {
    docTemplate() {
      this.preview();
    }
  },
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

<style>
img {
  max-width: 100%;
  max-height: 100%;
}
</style>