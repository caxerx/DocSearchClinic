<template>
  <div>
    <!-- dialog  -->
    <div v-if="dialogType=='medicalRecordList'">
      <medical-record-list/>
    </div>
    <v-flex xs4>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-flex>

    <v-card v-for="(patient,index) in patientList" :key="index" style="margin-top:20px">
      <v-layout row wrap>
        <v-flex xs4 sm2>
          <v-card-title>
            <img src="@/assets/person.png" class="icon">
          </v-card-title>
        </v-flex>
        <v-flex xs6 sm7>
          <v-card-text>
            <h3 class="headline mb primary--text">{{patient.name}}</h3>
          </v-card-text>
          <v-card-text>
            <div>
              <span class="left_text">gender:</span>
              <span class="right_text">{{patient.gender}}</span>
            </div>
            <div>
              <span class="left_text">email :</span>
              <span class="right_text">{{patient.email}}</span>
            </div>
            <div>
              <span class="left_text">phoneNo :</span>
              <span class="right_text">{{patient.phoneNo}}</span>
            </div>
            <div>
              <span class="left_text">dob:</span>
              <span class="right_text">{{patient.dob}}</span>
            </div>
            <div>
              <span class="left_text">hkid:</span>
              <span class="right_text">{{patient.hkid}}</span>
            </div>
            <div>
              <span class="left_text">allergy:</span>
              <span class="right_text">{{patient.allergy}}</span>
            </div>
          </v-card-text>
        </v-flex>
        <v-card-actions style="width:100%">
          <v-spacer></v-spacer>
          <v-btn color="info">
            <v-icon>local_phone</v-icon>Contact
          </v-btn>
          <v-btn color="info" @click="viewMedicalRecord(patient)">
            <v-icon>remove_red_eye</v-icon>Medical Record
          </v-btn>
        </v-card-actions>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import MedicalRecordList from "@/components/patientList/MedicalRecordList.vue";

export default {
  data: () => ({
    search: "",
    dialogType:"",
    patientList: [
      {
        name: "patient1",
        gender: "Male",
        email: "ikouhaha888@gmail.com",
        phoneNo: "12345678",
        dob: "09/09/1999",
        hkid: "R1234567(7)",
        allergy: "1,2,3,4,5"
      },
      {
        name: "patient2",
        gender: "Male",
        email: "ikouhaha888@gmail.com",
        phoneNo: "12345678",
        dob: "09/09/1999",
        hkid: "R1234567(7)",
        allergy: "1,2,3,4,5"
      },
      {
        name: "patient3",
        gender: "Male",
        email: "ikouhaha888@gmail.com",
        phoneNo: "12345678",
        dob: "09/09/1999",
        hkid: "R1234567(7)",
        allergy: "1,2,3,4,5"
      }
    ]
  }),

  computed: {
    // formTitle() {
    //   return this.editedIndex === -1 ? "New Item" : "Edit Item";
    // }
    ...mapGetters({})
  },

  components: {
    MedicalRecordList
  },

  //   watch: {
  //     dialog(val) {
  //       val || this.close();
  //     }
  //   },

  methods: {
    ...mapActions([
      "actionCloseDialog",
      "actionOpenDialog",
      "actionViewMedicalListFromPatientList"
    ]),

    viewMedicalRecord(patient) {
      this.dialogType = "medicalRecordList";
      this.actionOpenDialog("fullscreen");
      this.actionViewMedicalListFromPatientList(patient);
    }
  }
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
.left_text {
  width: 20%;
  display: inline-block;
}
.right_text {
  display: inline-block;
  width: 70%;
}
</style>
