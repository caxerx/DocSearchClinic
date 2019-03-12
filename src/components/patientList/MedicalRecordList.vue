<template>
  <full-screen-dialog>
    <div slot="title">{{name}} Profile</div>
    <div slot="content">
      <!-- search and add item -->
      <h1>Medicine Record List</h1>
      <v-layout row wrap justify-space-between>
        <v-flex xs4>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-flex>
        <v-flex xs2 style="text-align:right">
          <v-btn @click="newRecord" color="primary" dark class="mb-2">New Record</v-btn>
        </v-flex>
      </v-layout>
      <br>
      <!-- medical record list -->
      <v-card
        v-for="(content,index) in contents"
        :key="index"
        style="margin-bottom:2%;padding-left:2%"
      >
        <v-layout row wrap>
          <v-flex sm1>
            <v-layout justify-center row pt-5>
              <v-card color="blue-grey lighten-5">
                <div id="dateDiv">
                  <div class="headline text-md-center">{{getDay(content.date)}}</div>
                  <span class="headline grey--text">{{getMonth(content.date)}}</span>
                </div>
              </v-card>
            </v-layout>
          </v-flex>
          <v-flex sm11>
            <v-card-text>
              <div class="headline">{{content.clinc}}</div>
              <div class="grey--text">{{content.date}}, {{content.startTime}}</div>
              <span class="grey--text">{{content.doctor}}</span>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="setShow(index)">
                <v-icon>{{ showList[index].show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-slide-y-transition>
              <v-card-text>
                <div v-show="showList[index].show">
                  <hr>
                  <div class="font-weight-bold">Symptoms:</div>
                  <div
                    v-for="symptom in content.symptom"
                    :key="symptom"
                    class="font-weight-regular"
                  >{{symptom}}</div>
                  <br>
                  <div class="font-weight-bold">Medications</div>
                  <div
                    v-for="medicine in content.medicine"
                    :key="medicine"
                    class="font-weight-regular"
                  >{{medicine}}</div>
                  <br>
                  <div class="font-weight-bold">Price:</div>
                  <div class="font-weight-regular">{{content.amount}}</div>
                </div>
              </v-card-text>
            </v-slide-y-transition>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
  </full-screen-dialog>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import FullScreenDialog from "@/components/FullScreenDialog.vue";
import NormalDialog from "@/components/Dialog.vue";
import Container from "@/components/Container.vue";

export default {
  data: () => ({
    dialogType: "",
    search: "",
    date: new Date().toISOString().substr(0, 10),
    showList: [],
    show: ""
  }),

  computed: {
    ...mapGetters({
      patientListData: "getPatientListData"
    }),

    name() {
      return this.patientListData.patient.name;
    },

    headers() {
      return this.patientListData.headers;
    },
    contents() {
      console.log(this.patientListData);
        //   also set the list
      for (let i = 0; i < this.patientListData.contents.length; i++) {
        this.showList.push({ index: i, show: false });
      }
      return this.patientListData.contents;
    }
  },

  components: {
    FullScreenDialog,
    Container,
    NormalDialog
  },

  methods: {
    ...mapActions(["actionOpenDialog", "actionCloseDialog"]),
    newRecord() {
      this.actionOpenDialog("normal");
    },
    close(type) {
      console.log(type);
      if (type === "fullscreen") {
        this.actionCloseDialog("fullscreen");
      } else if (type === "normal") {
        this.actionCloseDialog("normal");
      }
    },
    getDay(date) {
      let d = new Date(date);
      return d.getDate();
    },
    getMonth(date) {
      let d = new Date(date);
      let month = d.toLocaleString("en-us", { month: "short" });
      return month;
    },
    setShow(index) {
      this.showList[index].show = !this.showList[index].show;
    }
  }
};
</script>
