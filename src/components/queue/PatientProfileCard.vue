<template>
  <div>
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
      <v-flex sm4>
        <v-list>
          <v-list-tile avatar>
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
      <v-btn outline color="primary">Edit Profile</v-btn>
    </v-layout>
    <v-divider light></v-divider>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      search: ""
    };
  },
  props:{
    patient:Object,
  },
  components: {},
  computed: {

  },

  methods: {
  
  }
};
</script>
