<template>
  <v-card class="vcard">
    <container>
      <div slot="content">
        <h1 class="headline mb primary--text">Clinc Queue List</h1>
        <br>
        <v-layout row wrap>
          <v-flex xs4>
            <date-picker/>
          </v-flex>
        </v-layout>
        <!-- table  -->
        <data-table/>
      </div>
    </container>
  </v-card>
</template>


<script>
import DataTable from "@/components/queue/Table.vue";
import DatePicker from "@/components/queue/DatePicker.vue";
import Container from "@/components/Container.vue";

export default {
  data: () => ({}),

  components: {
    DataTable,
    Container,
    DatePicker
  },

  computed: {},

  watch: {},

  created() {},

  methods: {}
};
</script>