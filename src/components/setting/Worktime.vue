<template>
  <v-list two-line>
    <template v-for="(item, index) in worktimes">
      <v-list-tile :key="item.doctor" avatar ripple @click="toggle(index)">
        <v-list-tile-content>
          <v-list-tile-title>{{ item.doctor }}</v-list-tile-title>
          <v-list-tile-sub-title v-for="(time, index) in item.times" :key="index">
          <span v-for="(date, i) in item.times" :key="i"> {{time.date[i]}}, </span>  
          <span v-for="(timeAm, j) in item.times" :key="j"> {{time.timeAm[j]}} </span> 
           <span v-for="(timePm, k) in item.times" :key="k"> {{time.timePm[k]}} </span> 
          
           
           

          </v-list-tile-sub-title>
        </v-list-tile-content>

       
      </v-list-tile>
      <v-divider v-if="index + 1 < worktimes.length" :key="index"></v-divider>
    </template>
  </v-list>
</template>
<script>
export default {
  data: () => ({
    selected: [2],
    worktimes: [
      {
        doctor: "a",
        times: [
          {
            id: 0,
            date: ["mon", "tue", "wed"],
            timeAm: ["10:00", "12:00"],
            timePm: ["13:00", "20:00"]
          },

          {
            id: 1,
            date: ["sat", "sun"],
            timeAm: ["10:00", "12:00"],
            timePm: ["13:00", "20:00"]
          }
        ]
      },
      {
        doctor: "b",
        times: [
          {
            id: 0,
            date: ["mon", "tue", "wed"],
            timeAm: ["10:00", "12:00"],
            timePm: ["13:00", "20:00"]
          },

          {
            id: 1,
            date: ["thur", "fri"],
            timeAm: ["9:00", "12:00"],
            timePm: ["13:00", "20:00"]
          }
        ]
      }
    ]
  }),
  components: {
    
  },
   methods: {
    toggle (index) {
      const i = this.selected.indexOf(index)

      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    }
  }
};
</script>


   