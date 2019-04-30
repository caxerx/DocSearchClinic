<template>
  <full-screen-container>
    <div style="height:100%; width:100%; overflow-y: scroll" class="pa-4">
      <h3 class="headline mb --text">Profile Setting</h3>
      <v-layout v-if="doctor" row>
        <!-- Doctor information -->
        <v-flex xs8 pr-3>
          <v-container grid-list-xs>
            <v-layout row wrap>
              <v-flex xs12>
                <h4 class="title mb-3">Personal Information</h4>
              </v-flex>
              <v-flex xs12 md8 pr-3>
                <v-text-field prepend-icon="account_circle" v-model="doctor.name" label="Name"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-radio-group :column="false" v-model="doctor.gender">
                  <v-radio value="M" label="Male"></v-radio>
                  <v-radio value="F" label="Female"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="email"
                  type="email"
                  v-model="doctor.email"
                  label="Email"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 pr-3>
                <v-text-field prepend-icon="phone" v-model="doctor.phoneNo" label="Phone number"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field prepend-icon="today" v-model="doctor.dob" label="Date of birth"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="credit_card"
                  v-model="doctor.hkid"
                  label="Hong Kong identity card number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <h4 class="title mb-3">Doctor Information</h4>
              </v-flex>
              <v-flex xs6 pr-3>
                <v-select
                  :items="languages"
                  prepend-icon="language"
                  v-model="doctor.language"
                  label="Language"
                ></v-select>
              </v-flex>
              <v-flex xs6>
                <v-select
                  :items="specialties"
                  prepend-icon="business_center"
                  v-model="doctor.specialty"
                  label="Specialty"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="timelapse"
                  v-model="doctor.experience"
                  label="Work experience"
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  prepend-icon="school"
                  v-model="doctor.academic"
                  label="Acadamic experience"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-divider vertical></v-divider>
        <!-- Avatar -->
        <v-flex xs4 pl-5 py-3 pr-3>
          <v-layout column>
            <v-img v-if="doctor.avatar" aspect-ratio="1" :src="doctor.avatar"></v-img>
            <v-img
              class="mb-4"
              v-else
              aspect-ratio="1"
              :src="require('@/asset/avatar-placeholder.png')"
            ></v-img>
            <v-btn color="primary">Change avatar</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout v-else>Loading...</v-layout>
    </div>
  </full-screen-container>
</template>
<script>
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import gql from "graphql-tag";

export default {
  components: {
    "full-screen-container": FullScreenContainer
  },
  data() {
    return {
      specialties: [
        { text: "General Pratice", value: "general_practice" },
        { text: "Cardiology", value: "cardiology" },
        { text: "Dentistry", value: "dentistry" },
        { text: "Dietetics", value: "dietetics" }
      ],
      languages: [
        { text: "English", value: "english" },
        { text: "Spanish", value: "spanish" },
        { text: "Mandarin", value: "Mandarin" },
        { text: "Cantonese", value: "Cantonese" }
      ],
      doctor: null
      // Basic info
      // name: "",
      // gender: "",
      // email: "",
      // phoneNo: "",
      // dob: "",
      // hkid: "",
      // specialty: "",
      // language: "",
      // academic: "",
      // experience: "",
      // workplace: null
      // TODO: Avatar
      // TODO: Change password
    };
  },
  methods: {},
  apollo: {
    doctor: {
      query: gql`
        query getDoctor($doctorId: ID!) {
          doctor(id: $doctorId) {
            name
            gender
            email
            phoneNo
            dob
            hkid
            specialty
            language
            academic
            experience
            workplace {
              id
              name
              location
            }
          }
        }
      `,
      variables() {
        return { doctorId: this.$store.state.userId };
      },
      update({ doctor }) {
        doctor.dob = doctor.dob.substr(0, 10);
        return doctor;
      }
    }
  },
  created() {}
};
</script>

