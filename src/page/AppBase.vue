<template>
  <div>
    <v-toolbar app color="primary" dark clipped-left permanent prominent>
      <v-btn icon @click="navigationShow=!navigationShow">
        <v-icon>{{navigationShow?"arrow_right":"arrow_left"}}</v-icon>
      </v-btn>
      <v-toolbar-side-icon>
        <v-img src="logo_s.png"></v-img>
      </v-toolbar-side-icon>
      <v-toolbar-title>DocSearch Clinic System</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer
      app
      clipped
      permanent
      touchless
      v-if="!$store.state.removeMainDrawer"
      :mini-variant="navigationShow"
    >
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon v-if="selectedDoctor.avatar==''" size="40">account_circle</v-icon>
            <v-img :src="selectedDoctor.avatar" v-else/>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Dr. {{selectedDoctor.name}}</v-list-tile-title>
            <v-list-tile-sub-title></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="enableDoctorList">
            <v-icon
              @click="toggleDoctorList"
            >{{showDoctorList==0?'arrow_drop_up':'arrow_drop_down'}}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-expansion-panel v-if="enableDoctorList" v-model="showDoctorList">
        <v-expansion-panel-content>
          <v-list>
            <v-list-tile v-for="i in doctorList" :key="i.id" @click="switchDoctor(i.id)">
              <v-list-tile-avatar>
                <v-icon v-if="i.avatar==''" size="40">account_circle</v-icon>
                <v-img :src="getAvatar(i.avatar)" v-else/>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Dr. {{i.name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile @click="linkTo('reservation')">
          <v-list-tile-action>
            <v-icon>date_range</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Reservations</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="linkTo('queue')">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Queues</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="linkTo('patient')">
          <v-list-tile-action>
            <v-icon>bookmarks</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Patients</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group no-action prepend-icon="description">
          <v-list-tile slot="activator">
            <v-list-tile-title>Documents</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="linkTo('template')">
            <v-list-tile-action>
              <v-icon>description</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Document Template</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="linkTo('print')">
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
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="linkTo('calendar')">
            <v-list-tile-action>
              <v-icon>build</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Calendar Setting</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="linkTo('profile')">
            <v-list-tile-action>
              <v-icon>build</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Doctor Profile Setting</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile @click="linkTo('feedback')">
          <v-list-tile-action>
            <v-icon>comment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Received Feedback</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click="linkTo('consultation')">
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>TestConsultation</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  mounted() {
    if (this.$store.state.userId == -1) {
      this.$store.commit("saveRoute", this.$route);
      this.$router.replace("/login");
      return;
    }
  },
  methods: {
    toggleDoctorList() {
      this.showDoctorList == 0
        ? (this.showDoctorList = -1)
        : (this.showDoctorList = 0);
    },
    switchDoctor(id) {
      this.showDoctorList = -1;
    },
    linkTo(link) {
      this.$router.push("/" + link);
    },
    getAvatar(i) {
      return this.$store.state.avatarBase + i;
    }
  },
  watch: {
    navigationShow(val) {
      this.$store.commit("setDrawerSize", val ? 80 : 300);
    }
  },
  data() {
    return {
      navigationShow: false,
      showDoctorList: -1,
      selectedDoctor: {
        avatar: "",
        name: ""
      },
      doctorList: [
        {
          id: 1,
          avatar: "",
          name: ""
        }
      ],
      doctor: {}
    };
  },
  computed: {
    enableDoctorList() {
      //return this.$store.state.role=='S'
      return true;
    }
  },
  apollo: {
    selectedDoctor: {
      query: gql`
        query getDoctor($doctorId: ID!) {
          doctor(id: $doctorId) {
            name
            avatar
          }
        }
      `,
      variables() {
        return {
          doctorId: this.$store.state.selectedDoctor
        };
      },
      update: data => data.doctor
    },
    doctorList: {
      query: gql`
        query getWorkplaceDoctor($id: ID!) {
          workplace(id: $id) {
            id
            doctors {
              id
              name
              avatar
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$store.state.workplace
        };
      },
      skip() {
        return !this.enableDoctorList;
      },
      update: data => data.workplace.doctors
    }
  }
};
</script>
