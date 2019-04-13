<template>
  <div style="height:100%;width:100%">
    <loading-dialog :dialog="dialog"/>
    <v-layout style="height: 90%" v-if="!$apollo.loading">
      <v-flex sm2 d-flex style="padding-left:2%">
        <nevigation :reservations="computedNewArr(doctor.reservations)" :doctor="doctor"/>
      </v-flex>
      <v-flex d-flex sm10 style="padding-left:7%;padding-right:3%">
        <v-card>
          <list/>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import List from "@/components/patientList/List.vue";
import { mapGetters, mapActions, mapState } from "vuex";
import LoadingDialog from "@/components/dialog/loadingDialog.vue";
import Nevigation from "@/components/patientList/Nevigation.vue";
import gql from "graphql-tag";
let moment = require("moment");

const doctorQuery = gql`
  query($id: ID!) {
    doctor(id: $id) {
      id
      name
      workplace {
        id
        name
        location
        type
      }
      reservations {
        startTime
        patient {
          id
          name
          gender
          email
          phoneNo
          dob
          hkid
          consultations {
            id
            consultant {
              name
              workplace {
                name
              }
            }
            note
            startTime
            endTime
          }
          allergies {
            name
            description
          }
        }
      }
    }
  }
`;

export default {
  data: () => ({}),

  apollo: {
    doctor: {
      query: doctorQuery,
      variables() {
        return {
          id: this.getSelectDoctor.id
        };
      },
      update(data) {
        return data.doctor;
      }
    }
  },

  components: {
    List,
    Nevigation,
    LoadingDialog
  },
  computed: {
    // computedHeight() {
    //   let windowHeight = window.innerHeight;
    //   let maxHeight = windowHeight * 0.81 + "px";
    //   return maxHeight;
    // },
    ...mapGetters({
      getSelectDoctor: "getSelectDoctor",
      getRefreshNow:"getRefreshNow"
    }),
    dialog: {
      get() {
        if (this.$apollo.queries.doctor.loading) {
          return true;
        } else {
          return false;
        }
      },
      set(val) {
        this.dialog = val;
      }
    },
    lastReservationDate() {}
  },

  watch: {
    getRefreshNow: function(val) {
      if (val) {
        this.$apollo.queries.doctor.refetch();
        this.actionSetRefreshNow(false);
      }
    }
  },

  created() {},

  methods: {
    ...mapActions(["actionSetRefreshNow"]),
    computedNewArr(arr) {
      let newArr = arr.slice();

      newArr.sort(function(a, b) {
        let atime = new Date(a.startTime);
        let btime = new Date(b.startTime);
        return btime - atime;
      });

      return newArr;
    }
  }
};
</script>