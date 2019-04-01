<template>
  <v-layout style="height: 90%" v-if="!$apollo.loading">
    <v-flex sm2 d-flex style="padding-left:2%">
      <nevigation :patients="patients" :doctor="doctor"/>
    </v-flex>
    <v-flex d-flex sm10 style="padding-left:7%;padding-right:3%">
      <v-card :style="{'height':computedHeight}">
        <list  />
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import List from "@/components/patientList/List.vue";
import Nevigation from "@/components/patientList/Nevigation.vue";
import gql from "graphql-tag";

const patientsQuery = gql`
  query {
    patients {
      id
      name
      gender
      email
      phoneNo
      dob
      hkid
      consultations {
        id
        consultant {
          name
          workplace {
            name
          }
        }
        note
        startTime
        endTime
      }
      reservations {
        startTime
      }
    }
  }
`;

const doctorQuery = gql`
  query($id: ID!) {
    doctor(id: $id) {
      id
      name
      workplace {
        id
        name
        location
        type
      }
    }
  }
`;

export default {
  data: () => ({}),

  apollo: {
    patients: {
      query: patientsQuery
    },
    doctor: {
      query: doctorQuery,
      variables() {
        return {
          id: 1
        };
      }
    }
  },

  components: {
    List,
    Nevigation
  },

  computed: {
    computedHeight() {
      let windowHeight = window.innerHeight;
      let maxHeight = windowHeight * 0.81 + "px";
      return maxHeight;
    },

    lastReservationDate(){

    }
  },

  watch: {
    computedHeight: function(val) {
      console.log(val);
    }
  },

  created() {},

  methods: {}
};
</script>