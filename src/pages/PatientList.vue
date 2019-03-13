<template>
  <v-layout style="height: 90%">
    <v-flex sm3>
      <nevigation/>
    </v-flex>
    <v-flex sm8>
      <v-card :style="{'height':computedHeight}">
        <list/>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import List from "@/components/patientList/List.vue";
import Nevigation from "@/components/patientList/Nevigation.vue";
import Container from "@/components/Container.vue";

export default {
  data: () => ({
  }),

  components: {
    List,
    Container,
    Nevigation
  },

  computed: {
    computedHeight() {
      let windowHeight = window.innerHeight;
      let maxHeight = windowHeight * 0.81 + "px";
      return maxHeight;
    }
  },

  watch: {
    computedHeight: function(val) {
      console.log(val);
    }
  },

  created() {},

  methods: {}
};
</script>