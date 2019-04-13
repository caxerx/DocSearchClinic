<template>
  <div style="width:100%;height:100%" class="indigo lighten-5">
    <v-navigation-drawer v-model="drawer" permanent app clipped>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <div v-if="!$apollo.loading">
            <v-list-tile avatar @click="toggleDoctorList">
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <!-- tempoary set user is doctor 1 -->
                <v-list-tile-title>Dr. {{getLogin.name}}</v-list-tile-title>
                <v-list-tile-sub-title style="width:150px">{{getLogin.workplace.name}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{doctorList==0?'arrow_drop_up':'arrow_drop_down'}}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </div>
        </v-list>
      </v-toolbar>
      <v-expansion-panel v-model="doctorList">
        <v-expansion-panel-content>
          <v-list v-if="!$apollo.loading">
            <div v-for="(doctor,index) in getWorkPlace.doctors" :key="index">
              <v-list-tile @click="toggleDoctor(doctor)">
                <v-list-tile-avatar>
                  <img src="https://randomuser.me/api/portraits/men/85.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{doctor.name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </div>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-divider></v-divider>
      <v-list dense>

        <v-list-group no-action prepend-icon="date_range">
          <v-list-tile slot="activator">
            <v-list-tile-title>Reservation</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="linkTo('reservationList')">
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Reservation List</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-group no-action prepend-icon="format_list_bulleted">
          <v-list-tile slot="activator">
            <v-list-tile-title>Queue</v-list-tile-title>
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

        <v-list-tile @click="linkTo('patientList')">
          <v-list-tile-action>
            <v-icon>bookmarks</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Patient List</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group no-action prepend-icon="description">
          <v-list-tile slot="activator">
            <v-list-tile-title>Documents</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="linkTo('documentTemplate')">
            <v-list-tile-action>
              <v-icon>description</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Document Template</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="linkTo('documentPrint')">
            <v-list-tile-action>
              <v-icon>print</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Document Print</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-group no-action prepend-icon="build">
          <v-list-tile slot="activator">
            <v-list-tile-title>Setting</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="linkTo('calendarSetting')">
            <v-list-tile-action>
              <v-icon>build</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Calendar Setting</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile @click="linkTo('feedBack')">
          <v-list-tile-action>
            <v-icon>comment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Feedback</v-list-tile-title>
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
    <div style="width:100%;height:100%">
      <!-- breadcrumb -->
      <breadcrumb/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  data: () => ({
    drawer: null,
    doctorList: -1,
    defaultId: 0
  }),

  components: {
    Breadcrumb
  },

  computed: {
    ...mapGetters({
      isSuccess: "getIsSuccess",
      getSelectDoctor: "getSelectDoctor",
      getWorkPlace: "getWorkPlace",
      getLogin:"getLogin"
    }),
  },
  methods: {
    ...mapActions(["actionSetSelectDoctor", "actionSetQueueRecordsFromQueue"]),

    toggleDoctorList() {
      this.doctorList = this.doctorList == 0 ? -1 : 0;
    },
    toggleDoctor(doctor) {
      this.actionSetSelectDoctor(doctor);
    },
    ...mapActions(["actionLogout"]),

    linkTo(link) {
      this.$router.push("/" + link);
    },

    logout() {
      this.$router.push("/");
      this.$router.go(0);
    },
  }
};
</script>