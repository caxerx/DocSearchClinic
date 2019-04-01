<template>
  <div style="height:100%">
    <v-layout
      v-if="!isClickPatient($route.query.id)"
      align-center
      justify-center
      fill-height
    >Select a patient to view details</v-layout>
    <div v-else style="height:100%">
      <div v-if="patient!=null" style="height:100%">
        <div v-if="isRecordEmpty()" style="height:100%">
          <patient-profile-card :patient="patient"/>
          <v-layout align-center justify-center style="height:80%">No Records in this Patient</v-layout>
        </div>

        <div v-else style="height:100%">
          <patient-profile-card :patient="patient"/>

          <medical-record-list :patient="patient"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

import MedicalRecordList from "@/components/patientList/MedicalRecordList.vue";
import PatientProfileCard from "@/components/patientList/PatientProfileCard.vue";
import gql from "graphql-tag";

const patientQuery = gql`
  query($id: ID!) {
    patient(id: $id) {
      id
      name
      gender
      dob
      email
      phoneNo
      consultations {
        id
        consultant {
          name
        }
        note
        startTime
        endTime
      }
    }
  }
`;

export default {
  data: () => ({
    search: "",
    dialogType: "",
    skipQuery: true
  }),

  apollo: {
    patient: {
      query: patientQuery,
      variables() {
        return {
          id: this.id
        };
      },
      skip() {
        return this.skipQuery;
      }
    }
  },

  computed: {
    // formTitle() {
    //   return this.editedIndex === -1 ? "New Item" : "Edit Item";
    // }

    id() {
      return this.$route.query.id;
    }
  },

  components: {
    MedicalRecordList,
    PatientProfileCard
  },

  created() {
    this.actionQueryPatientFromPatientList(this.id);
  },

  watch: {
    id: function(val) {
      this.actionQueryPatientFromPatientList(this.id);
    }
  },

  methods: {
    ...mapActions(["actionQueryPatientFromPatientList"]),
    isClickPatient(id) {
      if (id === undefined) {
        return false;
      } else {
        this.startQuery();
        return true;
      }
    },
    isRecordEmpty() {
      if (this.patient.consultations.length < 1) {
        return true;
      }

      return false;
    },
    startQuery() {
      this.$apollo.queries.patient.skip = false;
      this.$apollo.queries.patient.refetch();
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
