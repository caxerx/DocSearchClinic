<template>
  <div>
    <v-data-table :items="contents" id="createResTable" class="elevation-1" :headers="headers" :rows-per-page-items="rowsPerPageItems" hide-actions>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.text }}</td>
        <td
          class="text-xs-left"
          v-if="props.item.status"
          @click="selectTime(props.item.startTime,props.item.endTime)"
        >
          <v-btn color="info">available</v-btn>
        </td>
        <td class="text-xs-left" v-else >  <v-btn  disabled>available</v-btn></td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data() {
    return {

    };
  },

  computed: {
    ...mapGetters({
      date: "getDate",
      contents:"getContents"
    }),
    
    rowsPerPageItems(){
      return [ 9, 20, 30, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ];
    },
    headers() {
      var headers = [];
      headers.push({ text: "", sortable: false });
      //first header must be date
      var dateStr = this.date + "";
      headers.push({
        text: dateStr,
        align: "left",
        sortable: false
      });
      return headers;
    },
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
  max-height: 550px;
  overflow-y: auto;
}
</style>