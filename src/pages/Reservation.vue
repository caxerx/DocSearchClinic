<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs4>
        <reservation-form/>
      </v-flex>
      <v-flex xs8>
        <v-card>
          <v-card-text>6asdsad</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import ReservationForm from "@/components/ReservationForm.vue";



export default {
  name: "App",
  components: {
    ReservationForm,
  },

  computed: {
    
  },

  data: () => ({})
};
</script>