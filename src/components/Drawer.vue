<template>
  <div>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" fixed app>
        <v-list dense>
          <v-list-tile @click="home">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="about">
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>About</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-group  no-action prepend-icon="date_range">
            <v-list-tile slot="activator">
              <v-list-tile-title>Reservation</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="reservation">
              <v-list-tile-action>
                <v-icon>add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Create Reservation</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
             <v-list-tile @click="viewReservation">
              <v-list-tile-action>
                <v-icon>remove_red_eye</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>View Reservation</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="indigo" fixed dark app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Clinc System</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>person</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon @click="logout">exit_to_app</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>

    <!-- <router-link to="/home">Home</router-link>|
    <router-link to="/about">About</router-link>|
    <button @click="logout">Logout</button>
    <router-view/>-->
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  data: () => ({
    drawer: null
  }),
  methods: {
    ...mapActions(["actionLogout", "actionSetDefaultTableData"]),

    home() {
      this.$router.push("/home");
    },
    reservation() {
      this.actionSetDefaultTableData();
      this.$router.push("/reservation");
    },

    viewReservation(){
      this.$router.push("/viewReservation");
    },
    about() {
      this.$router.push("/about");
    },
    logout() {
      this.$router.push("/");
      this.actionLogout();
    }
  }
};
</script>


