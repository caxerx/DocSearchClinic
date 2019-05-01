<template>
  <full-screen-container v-if="templates">
    <div style="height:100%; width:100%; overflow-y: scroll" class="pa-4">
      <v-layout row>
        <v-flex xs3>
          <h3 class="headline mb-3 --text">Calendar Setting</h3>
        </v-flex>
        <v-flex></v-flex>
      </v-layout>
    </div>
  </full-screen-container>
  <full-screen-container v-else>
    <v-layout fill-height justify-center align-center>
      <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </full-screen-container>
</template>
<script>
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import gql from "graphql-tag";

export default {
  components: {
    "full-screen-container": FullScreenContainer
  },
  data() {
    return {
      templates: null
    };
  },
  methods: {},
  apollo: {}
};
</script>
