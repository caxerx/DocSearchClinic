<template>
    <v-layout fill-height>
      <v-flex sm3 >
      <nevigation/>
      </v-flex>
      <v-flex sm9>
        <v-card style="height: 100%">
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
  data: () => ({}),

  components: {
    List,
    Container,
    Nevigation
  },

  computed: {},

  watch: {},

  created() {},

  methods: {}
};
</script>