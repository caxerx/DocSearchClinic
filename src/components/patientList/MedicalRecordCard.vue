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
                    <div class="custAlign">{{ consultation.startTime | moment("utc","DD")}}</div>
                  </v-list-tile-title>
                  <v-list-tile-title
                    style="overflow:unset"
                  >{{ consultation.startTime | moment("utc","MMM'YY")}}</v-list-tile-title>
                </v-flex>
                <div style="padding-left:10px"></div>
                <v-divider vertical/>
                <v-flex sm8 style="padding-left:15px">
                  <span>Appointment with&nbsp;</span>
                  <b class="black--text">{{patient.name}}</b>
                  <v-list-tile-sub-title>{{ consultation.startTime | moment("utc","h:mm a")}} for {{computedDuration(consultation.startTime,consultation.endTime)}} mins</v-list-tile-sub-title>
                </v-flex>
                <v-flex sm1>
                  <v-btn icon small>
                    <v-icon>local_printshop</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex sm3>
                  <v-menu offset-y open-on-hover>
                    <v-btn outline small slot="activator" color="orange">
                      Add Record
                      <v-icon>arrow_drop_down</v-icon>
                    </v-btn>
                    <v-list>
                      <div v-for="(item, index) in items" :key="index">
                        <v-btn flat @click="showItem(item.name,index)">{{item.title}}</v-btn>
                      </div>
                    </v-list>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider/>
        <div :id="consultation.id">
          <v-list v-if="showPrescriptions">
            <prescriptions v-model="showPrescriptions"></prescriptions>
          </v-list>
          <v-list v-else-if="showClincalNotes">
            <clincal-notes v-model="showClincalNotes" :note="consultation.note"></clincal-notes>
          </v-list>
          <v-list v-else-if="isEmptyRecord(consultation)">
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
let moment = require("moment");

export default {
  data() {
    return {
      search: "",
      items: [
        { name: "prescriptions", title: "Prescriptions" },
        { name: "clincalNotes", title: "CLincal Notes" }
      ],
      showPrescriptions: false,
      showClincalNotes: false
    };
  },
  props: {
    consultation: Object,
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
  watch:{
    patient:function(val){
      this.showPrescriptions = false;
      this.showClincalNotes = false;
    }
  },
  methods: {
    isEmptyRecord(c) {
      if(c.note===null||c.note===""){
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
      this.showPrescriptions = false;
      this.showClincalNotes = false;
    },

    showItem(name, id) {
      if (name === "prescriptions") {
        this.showPrescriptions = true;
        this.showClincalNotes = false;
      } else if (name === "clincalNotes") {
        this.showPrescriptions = false;
        this.showClincalNotes = true;
      }
    },
    computedDuration(startTime, endTime) {
      let stime = moment.utc(startTime);
      let etime = moment.utc(endTime);
      let duration = etime.diff(stime, "minutes");
      return duration;
    },
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