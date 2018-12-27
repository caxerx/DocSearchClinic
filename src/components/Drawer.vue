<template>
  <div>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" fixed app>
        <v-list dense>
          <!-- <v-list-tile @click="home">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>-->
          <v-list-tile @click="about">
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>About</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-group no-action prepend-icon="date_range">
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
            <v-list-tile @click="settingReservation">
              <v-list-tile-action>
                <v-icon>settings</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Reservation Setting</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-group no-action prepend-icon="format_list_bulleted">
            <v-list-tile slot="activator">
              <v-list-tile-title>Queue</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="reservationList">
              <v-list-tile-action>
                <v-icon>list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Reservation List</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="onlineQueueList">
              <v-list-tile-action>
                <v-icon>list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Online Queue List</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="clincQueueList">
              <v-list-tile-action>
                <v-icon>list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Clinc Queue List</v-list-tile-title>
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
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  data: () => ({
    drawer: null
  }),

  components: {},

  computed: {
    ...mapGetters({
      isSuccess: "getIsSuccess"
    })
  },
  methods: {
    ...mapActions([
      "actionLogout",
      "actionInitializeReservationList",
      "actionDatePickerType",
      "actionSetDefaultReservation",
      "actionSetDatePickerType",
    ]),

    home() {
      this.$router.push("/home");
    },
    reservation() {
      this.actionSetDefaultReservation();
      this.$router.push("/createReservation");
    },
    settingReservation() {
      this.$router.push("/settingReservation");
    },

    viewReservation() {
      this.$router.push("/viewReservation");
    },
    reservationList() {
      this.actionSetDatePickerType("reservationList");
      this.actionInitializeReservationList();
      this.actionSetDefaultReservation();
      this.$router.push("/reservationList");
    },
    onlineQueueList() {
      this.actionSetDatePickerType("onlineQueueList");
      this.$router.push("/onlineQueueList");
    },
    clincQueueList() {
      this.actionSetDatePickerType("clincQueueList");
      this.$router.push("/clincQueueList");
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


