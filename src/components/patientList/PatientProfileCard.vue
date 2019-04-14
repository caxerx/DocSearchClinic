<template>
  <div>
    <view-patient-dialog :dialog="dialog" :patient="patient" v-model="dialog"/>
    <v-layout align-center row fill-height>
      <v-flex sm4>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="@/assets/person.png">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>
                {{patient.name}}
                <span class="grey--text text--lighten-1">({{patient.id}})</span>
              </v-list-tile-title>
              <v-list-tile-sub-title>{{patient.gender}} ． {{patient.dob|moment("utc","YYYY-MM-DD")}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex sm5>
        <v-list>
          <v-list-tile>
            <v-list-tile-sub-title>
              <v-icon small>phone</v-icon>
              {{patient.phoneNo}}
              <br>
              <v-icon small>email</v-icon>
              {{patient.email}}
            </v-list-tile-sub-title>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-spacer/>
      <v-tooltip bottom v-if="patient.allergies.length<1">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="grey" @click="viewPatient()">remove_red_eye</v-icon>
          </v-btn>
        </template>
        <span>No Allergies</span>
      </v-tooltip>
      <v-tooltip bottom v-else>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="info" @click="viewPatient()">remove_red_eye</v-icon>
          </v-btn>
        </template>
        <span>View Allergies</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="success" @click>edit</v-icon>
          </v-btn>
        </template>
        <span>Edit Profile</span>
      </v-tooltip>
    </v-layout>
    <v-divider light></v-divider>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import ViewPatientDialog from "@/components/dialog/viewPatientDialog.vue";
export default {
  data() {
    return {
      search: "",
      dialog: false
    };
  },
  props: {
    patient: Object
  },
  components: {
    ViewPatientDialog
  },
  computed: {},

  methods: {
    viewPatient() {
      this.dialog = true;
    }
  }
};
</script>
