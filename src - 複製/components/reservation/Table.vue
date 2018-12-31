<template>
  <div>
    <h2>{{date}}</h2>
    <v-data-table
      :items="timeList"
      id="createResTable"
      class="elevation-1"
      :headers="headers"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.startTime }}</td>
        <td class="text-xs-left">{{ props.item.endTime }}</td>
        <td
          class="text-xs-left"
          v-if="props.item.status"
          @click="selectTime(props.item.startTime,props.item.endTime)"
        >
          <v-btn color="info">available</v-btn>
        </td>
        <td class="text-xs-left" v-else>
          <v-btn disabled>available</v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      reservationData:"getReservationData"
    }),

    date(){
      return this.reservationData.date;
    },
    timeList(){
      return this.reservationData.timeList;
    },
    headers(){
      return this.reservationData.headers;
    }


    // rowsPerPageItems(){
    //   return [ 9, 20, 30, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ];
    // },
 
  },

  methods: {
    ...mapActions(["actionSetTime"]),
    selectTime(startTime, endTime) {
      this.actionSetTime(startTime + " - " + endTime);
    }
  }
};
</script>

<style>
#createResTable {
  max-height: 530px;
  overflow-y: auto;
}
</style>