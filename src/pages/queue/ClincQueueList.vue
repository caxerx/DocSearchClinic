<template>
  <div style="height:100%;width:100%">
    <loading-dialog :dialog="dialog"/>
    <v-layout style="height: 90%" v-if="!$apollo.loading">
      <v-flex sm2 d-flex style="padding-left:2%">
        <nevigation :queueRecords="computedNewArr(doctor.currentQueue)"/>
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
import List from "@/components/queue/List.vue";
import Nevigation from "@/components/queue/Nevigation.vue";
import LoadingDialog from "@/components/dialog/loadingDialog";
import gql from "graphql-tag";
import { mapGetters, mapActions, mapState } from "vuex";

const doctorQuery = gql`
  query($id: ID!) {
    doctor(id: $id) {
      id
      name

      currentQueue {
        id
        patient {
          id
          name
          gender
          email
          phoneNo
          dob
          hkid
          queueRecords {
            id
            startTime
            endTime
            status
          }
        }
        startTime
        endTime
      }
    }
  }
`;

export default {
  data: () => ({}),

  components: {
    List,
    Nevigation,
    LoadingDialog
  },
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
  computed: {
    ...mapGetters({
      getSelectDoctor: "getSelectDoctor",
      getRefreshNow:'getRefreshNow'
    }),

    dialog: {
      get() {
        if (this.$apollo.loading) {
          return true;
        } else {
          return false;
        }
      },
      set(val) {
        this.dialog = val;
      }
    }
  },
  watch: {
    getRefreshNow: function(val) {
      if (val) {
        this.$apollo.queries.doctor.refetch();
        this.actionSetRefreshNow(false);
      }
    }
  },

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