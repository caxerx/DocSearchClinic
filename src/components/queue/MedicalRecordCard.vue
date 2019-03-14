<template>
  <v-layout row>
    <v-flex sm1>
      <v-layout justify-center style="padding-top:15px">
        <v-avatar>
          <img :src="icon">
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
                  <v-list-tile-title>
                    <div class="custAlign">{{ getDate(medicalRecord.date) | moment("DD")}}</div>
                  </v-list-tile-title>
                  <v-list-tile-title
                    style="overflow:unset"
                  >{{ getDate(medicalRecord.date) | moment("MMM'YY")}}</v-list-tile-title>
                </v-flex>
                <div style="padding-left:10px"></div>
                <v-divider vertical/>
                <v-flex sm8 style="padding-left:15px">
                  <span>Appointment with&nbsp;</span>
                  <b class="black--text">{{patient.name}}</b>
                  <v-list-tile-sub-title>{{formatAMPM(medicalRecord.time)}} for {{medicalRecord.duration}} mins</v-list-tile-sub-title>
                </v-flex>

                <v-flex sm1 offset-xs2>
                  <v-btn icon>
                    <v-icon color="primary">info</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider/>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import Prescriptions from "@/components/queue/Prescriptions.vue";
import ClincalNotes from "@/components/queue/ClincalNotes.vue";

export default {
  data() {
    return {
      search: "",
      items: [
        { name: "prescriptions", title: "Prescriptions" },
        { name: "clincalNotes", title: "CLincal Notes" }
      ],
      showPrescriptions: {},
      showClincalNotes: {}
    };
  },
  props: {
    medicalRecord: Object,
    icon: String,
    patient: Object
  },
  components: {
    Prescriptions,
    ClincalNotes
  },
  computed: {
    ...mapGetters({})
  },

  methods: {
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
    },

    isEmptyRecord(medicalRecord) {
      if (
        medicalRecord.prescriptions.length == 0 &&
        medicalRecord.clincalNotes.length == 0
      ) {
        return true;
      }

      return false;
    },

    isShowPrescriptions(id) {
      if (id === this.showPrescriptions.id) {
        return true;
      }

      return false;
    },
    isShowClincalNotes(id) {
      if (id === this.showClincalNotes.id) {
        return true;
      }

      return false;
    },
    cancelShow(id) {
      this.showPrescriptions = {};
      this.showClincalNotes = {};
    },

    showItem(name, id) {
      if (name === "prescriptions") {
        this.showPrescriptions = {
          name: name,
          id: id
        };
        this.showClincalNotes = {};
      } else if (name === "clincalNotes") {
        this.showClincalNotes = {
          name: name,
          id: id
        };
        this.showPrescriptions = {};
      }
    },

    cancelClincalNotes(val) {
      this.showClincalNotes = val;
    },

    cancelPrescriptions(val) {
      this.showPrescriptions = val;
    }
  }
};
</script>

<style scoped>
.custAlign {
  width: 50%;
  margin: 0 auto;
}

.textAlign {
  text-align: center;
}
</style>