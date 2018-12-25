<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap justify-space-around>
      <v-flex xs6>
        <reservation-form/>
      </v-flex>
      <v-flex xs6>
          <reservation-table/>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import ReservationForm from "@/components/reservation/Form.vue";
import ReservationTable from "@/components/reservation/Table.vue";



export default {
  name: "App",
  components: {
    ReservationForm,
    ReservationTable,
  },

  computed: {
    
  },

  data: () => ({})
};
</script>