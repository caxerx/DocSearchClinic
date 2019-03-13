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
                  <v-list-tile-title>{{ getDate(medicalRecord.date) | moment("MMM'YY")}}</v-list-tile-title>
                </v-flex>
                <div style="padding-left:10px"></div>
                <v-divider vertical/>
                <v-flex sm8 style="padding-left:15px">
                  <span>Appointment with&nbsp;</span>
                  <b class="black--text">{{patient.name}}</b>
                  <v-list-tile-sub-title>{{formatAMPM(medicalRecord.time)}} for {{medicalRecord.duration}} mins</v-list-tile-sub-title>
                </v-flex>
                <v-flex sm1>
                  <v-btn icon small>
                    <v-icon>local_printshop</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex sm3>
                  <v-menu offset-y open-on-hover>
                    <v-btn outline small slot="activator" color="orange">Add Record
                      <v-icon>arrow_drop_down</v-icon>
                    </v-btn>
                    <v-list>
                      <div v-for="(item, index) in items" :key="index">
                        <v-btn flat @click="showItem(item.name,medicalRecord.id)">{{item.title}}</v-btn>
                      </div>
                    </v-list>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider/>
        <div :id="medicalRecord.id">
          <v-list v-if="isShowPrescriptions(medicalRecord.id)">
            <prescriptions>
              <v-btn slot="cancelShow" @click="cancelShow(medicalRecord.id)">Cancel</v-btn>
            </prescriptions>
          </v-list>
          <v-list v-else-if="isShowClincalNotes(medicalRecord.id)">
            <clincal-notes>
              <v-btn slot="cancelShow" @click="cancelShow(medicalRecord.id)">Cancel</v-btn>
            </clincal-notes>
          </v-list>
          <v-list v-else-if="isEmptyRecord(medicalRecord)">
            <v-layout justify-center>No records added yet</v-layout>
          </v-list>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import Prescriptions from "@/components/patientList/Prescriptions.vue";
import ClincalNotes from "@/components/patientList/ClincalNotes.vue";

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
    }
  }
};
</script>

<style scoped>
.custAlign {
  width: 80%;
  margin: 0 auto;
}

.textAlign {
  text-align: center;
}
</style>