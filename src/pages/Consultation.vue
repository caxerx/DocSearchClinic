<template>
  <v-layout row fill-height>
    <v-flex xs6>
      <v-layout fill-height column>
        <v-flex xs6>
          <v-card style="max-height:100%;min-height:100%">
            <v-card-title class="title">Patient Profile</v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-title>Patient Name: Dennis Au Yeung</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>Gender: Male</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>Date of Birth: 2014-10-20</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>Consultation Type: Psychology Consultants</v-list-tile-title>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary">View Medical Record</v-btn>
            </v-card-actions>
            <v-divider></v-divider>
          </v-card>
        </v-flex>
        <v-flex xs6 style="background: black"></v-flex>
      </v-layout>
    </v-flex>
    <v-divider vertical></v-divider>
    <v-flex xs6>
      <v-navigation-drawer permanent right absolute style="width:50%; height:75%">
        <v-list>
          <div v-for="i in 10" :key="i">
            <v-list-tile>
              <v-list-tile-avatar>
                <v-avatar>
                  <v-icon>account_circle</v-icon>
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Any Problem?</v-list-tile-title>
                <v-list-tile-sub-title>Dr. Michael Wang</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title class="text-xs-right">I don't feel well</v-list-tile-title>
                <v-list-tile-sub-title class="text-xs-right">Dennis Au Yeung</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-avatar>
                <v-avatar>
                  <v-icon>accessibility</v-icon>
                </v-avatar>
              </v-list-tile-avatar>
            </v-list-tile>
            <v-divider></v-divider>
          </div>
        </v-list>
      </v-navigation-drawer>
      <v-card flat style="height:25%;top:75%" absolute>
        <v-layout fill-height column align-content-end>
          <v-divider></v-divider>
          <v-textarea label="Message" solo hide-details></v-textarea>
          <v-card-actions>
            <span class="subtitle grey--text">Message Max Length: 200</span>
            <v-spacer></v-spacer>
            <v-btn flat>Send</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  data: () => ({}),

  components: {},

  methods: {}
};
</script>

<style>
.dark {
  background-color: black;
}
</style>