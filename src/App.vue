<template>
  <v-app>
    <v-content v-if="!getLoginIsSuccess">
      <login/>
    </v-content>
    <v-content v-else>
      <drawer/>
    </v-content>
  </v-app>
</template>

<script>
import Login from "@/pages/Login.vue";
import Drawer from "@/components/Drawer";

import { mapGetters, mapActions, mapState } from "vuex";
import gql from "graphql-tag";

export default {
  components: {
    Drawer,
    Login
  },
  computed:{
    ...mapGetters({
      getLoginIsSuccess:"getLoginIsSuccess"
    }),

  }

};
</script>
