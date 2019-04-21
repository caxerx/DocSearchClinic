<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
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
