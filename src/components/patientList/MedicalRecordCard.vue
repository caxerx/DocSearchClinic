<template>
  <div class="custlayout">
    <div v-for="(medicalRecord,index) in medicalRecordList" :key="index">
      <v-layout row style="margin-top:20px;">
        <v-flex sm1>
          <v-layout justify-center style="padding-top:15px">
            <v-avatar>
              <img src="https://randomuser.me/api/portraits/men/84.jpg">
            </v-avatar>
          </v-layout>
        </v-flex>
        <v-flex sm11>
          <v-card style="margin-right:15px">
            <v-list>
              <v-list-tile>
                <v-list-tile-content>
                  <v-layout style="width:100%">
                    <v-flex sm1>
                      <v-list-tile-title><div class="custAlign">{{ getDate(medicalRecord.date) | moment("DD")}}</div></v-list-tile-title>
                      <v-list-tile-title>{{ getDate(medicalRecord.date) | moment("MMM'YY")}}</v-list-tile-title>
                    </v-flex>
                    <v-divider vertical/>
                    <v-flex sm9 style="padding-left:15px">
                      <span>Appointment with&nbsp;</span>
                      <b class="black--text">{{patient.name}}</b>
                      <v-list-tile-sub-title>{{formatAMPM(medicalRecord.time)}} for {{medicalRecord.duration}} mins</v-list-tile-sub-title>
                    </v-flex>
                    <v-flex sm2>
                      <v-btn outline small color="orange">Add Record</v-btn>
                    </v-flex>
                  </v-layout>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider/>
            <v-list>
              <v-layout justify-center>No records added yet</v-layout>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      search: ""
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      getPatientListData: "getPatientListData"
    }),

    medicalRecordList() {
      return this.getPatientListData.patient.medicalRecordList;
    },

    patient() {
      return this.getPatientListData.patient;
    }
  },

  methods: {
    ...mapActions(["actionReset"]),
    getDate(date) {
      let d = new Date(date);
      return d;
    },

    formatAMPM(time) {
      var hours = time.split(":")[0];
      var minutes = time.split(":")[1];
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 && minutes != "00" ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + "  " + ampm;
      return strTime;
    }
    // getDateStr(date) {
    //   let d = new Date(date);
    //   let day = d.getDate();
    //   let month = d.toLocaleString("en-us", { month: "short" });
    //   return day+" "+month;
    // }
  }
};
</script>

<style scoped>


.custAlign {
  width: 60%;
  margin: 0 auto;
}

.custlayout {
  height: 85%;
  overflow-y: auto;
  padding-bottom: 10%;
}
.textAlign {
  text-align: center;
}
</style>


