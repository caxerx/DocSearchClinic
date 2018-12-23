<template>
  <v-layout>
    <v-flex xs12 sm7 offset-sm1>
      <h1>Your Reservation</h1><br/>
      <v-data-table
        id="viewResTable"
        :items="details"
        class="elevation-1"
        hide-actions
        hide-headers
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left" style="word-break: break-all;">{{ props.item.detail }}</td>
        </template>
      </v-data-table><br/>

     <v-btn small color="error">Cancel</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      details: [
        {
          value: false,
          name: "Date",
          detail: "2018-10-15"
        },
        {
          value: false,
          name: "Time",
          detail: "10:10 - 10:20"
        },
        {
          value: false,
          name: "Note",
          detail:
            "asdasdsaoidjosiajdoiasjdiosajdiosjaoidasdisoajdoiajsodijsaoidasdsaoijdoisajdoisajdoiajsodijsaoidjasoidjsaoijdoisajdoisajdoisajodijsaasdoijasdiojasiodjasoidjoiasjdioajsdoijsaoid"
        }
      ]
    };
  }
};
</script>

<style>
#viewResTable {
  max-width: 600px;
  
}
</style>