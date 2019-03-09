<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app permanent clipped>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar @click="toggleDoctorList">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Dr. Wang Michael</v-list-tile-title>
              <v-list-tile-sub-title>MD Clinic</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{doctorList==0?'arrow_drop_up':'arrow_drop_down'}}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-expansion-panel v-model="doctorList">
        <v-expansion-panel-content>
          <v-list>
            <v-list-tile @click="toggleDoctorList">
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Dr. Michael Wang</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="toggleDoctorList">
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/84.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Dr. Dennis Au Yeung</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile @click="linkTo('about')">
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
          <v-list-tile @click="linkTo('settingReservation')">
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
          <v-list-tile @click="linkTo('reservationList')">
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Reservation List</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="linkTo('clincQueueList')">
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Clinc Queue List</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile @click="linkTo('consultation')">
          <v-list-tile-action>
            <v-icon>mode_comment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Online Consultation</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="linkTo('patientList')">
          <v-list-tile-action>
            <v-icon>bookmarks</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Patient List</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group no-action prepend-icon="print">
          <v-list-tile slot="activator">
            <v-list-tile-title>Printing</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="linkTo('sickLeave')">
            <v-list-tile-action>
              <v-icon>description</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sick Leave</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="linkTo('referralLetter')">
            <v-list-tile-action>
              <v-icon>description</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Referral Letter</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile @click="linkTo('feedBack')">
          <v-list-tile-action>
            <v-icon>comment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>FeedBack</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" fixed dark app clipped-left>
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
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  data: () => ({
    drawer: null,
    doctorList: 0
  }),

  components: {},

  computed: {
    ...mapGetters({
      isSuccess: "getIsSuccess"
    })
  },
  methods: {
    toggleDoctorList() {
      this.doctorList = this.doctorList == 0 ? 1 : 0;
    },
    ...mapActions(["actionLogout"]),

    linkTo(link) {
      this.$router.push("/" + link);
    },

    logout() {
      this.$router.push("/");
      this.actionLogout();
    }
  }
};
</script>


