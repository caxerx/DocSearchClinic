<template>
  <v-container>
    <v-layout>
      <v-flex xs6 sm3>
        <v-card flat color style="padding: 10px">
          <v-card-title>
            <h3>Default Appointment Duration</h3>
          </v-card-title>
          <v-select :items="AppointmentDuration" box label="Box style"></v-select>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout style="padding-top: 50px">
      <v-flex>
        <v-card flat color style="padding:10px">
          <v-card-title>Work Timings</v-card-title>
          <worktime/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Worktime from "@/components/setting/Worktime.vue";
export default {
  data: () => ({
    AppointmentDuration: ["10 min", "15 min", "20min"],
    
  }),
  components: {
   
    Worktime
  }
};
</script>
