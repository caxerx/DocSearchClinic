<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>
<script>

import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: mapState(["userId"]),
  watch: {
    userId(nv, ov) {
      if (nv == -1) {
        this.$router.replace("/login");
      } else {
        this.$router.replace("/");
      }
    }
  }
};
</script>
