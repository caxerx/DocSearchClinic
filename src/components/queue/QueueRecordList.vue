<template>
  <div class="custlayout">
    <v-toolbar flat>
      <v-tooltip bottom>
        <v-btn icon slot="activator">
          <v-icon color="success">meeting_room</v-icon>
        </v-btn>
        <span>Process Queue</span>
      </v-tooltip>

      <v-tooltip bottom>
        <v-btn icon slot="activator">
          <v-icon color="error">delete</v-icon>
        </v-btn>
        <span>Remove From Queue</span>
      </v-tooltip>
    </v-toolbar>
    <v-divider></v-divider>
    <div class="px-4 py-2">Check-in History</div>
    <v-divider></v-divider>
    <div>
      <div v-for="(queueRecord,index) in computedNewArr(patient.queueRecords)" :key="index" class="mt-2">
        <queue-record-card :queueRecord="queueRecord" :icon="icon" :patient="patient"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import QueueRecordCard from "@/components/queue/QueueRecordCard.vue";

export default {
  data() {
    return {
      search: "",
      showList: [],
      icon: "https://randomuser.me/api/portraits/men/84.jpg"
    };
  },
  components: {
    QueueRecordCard
  },
  props: {
    patient: Object
  },
  computed: {
    ...mapGetters({})
  },

  methods: {
    ...mapActions(["actionReset"]),
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

<style scoped>
.custlayout {
  height: 85%;
  overflow-y: auto;
  padding-bottom: 10%;
}
</style>


