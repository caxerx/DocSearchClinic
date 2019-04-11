<template>
  <div style="height:100%;width:100%">
    <loading-dialog :dialog="dialog"/>
    <v-layout style="height: 90%">
      <v-flex sm2 d-flex style="padding-left:2%">
        <nevigation :queueRecords="computedNewArr(getQueueData.queueRecords)"/>
      </v-flex>
    <v-flex d-flex sm10 style="padding-left:7%;padding-right:3%">
      
      <v-card >
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


export default {
  data: () => ({}),

  components: {
    List,
    Nevigation,
    LoadingDialog
  },

  computed: {
    ...mapGetters({
      getQueueData: "getQueueData"
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

  created() {},

  methods: {
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