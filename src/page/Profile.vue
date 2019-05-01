<template>
  <full-screen-container v-if="doctor">
    <div style="height:100%; width:100%; overflow-y: scroll" class="pa-4">
      <h3 class="headline mb --text">Profile Setting</h3>
      <v-layout row>
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
              <v-flex xs12 md6 pr-3>
                <v-text-field prepend-icon="phone" v-model="doctor.phoneNo" label="Phone number"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-menu
                  v-model="dobMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      prepend-icon="today"
                      v-model="doctor.dob"
                      readonly
                      label="Date of birth"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="doctor.dob" @input="dobMenu = false"></v-date-picker>
                </v-menu>
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
              <v-flex xs12 md6 pr-3>
                <v-select
                  :items="languages"
                  prepend-icon="language"
                  v-model="doctor.language"
                  label="Language"
                ></v-select>
              </v-flex>
              <v-flex xs12 md6>
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
            <v-img
              class="mb-4"
              v-if="doctor.avatar"
              aspect-ratio="1"
              :src="getAvatar(doctor.avatar)"
            ></v-img>
            <v-img
              class="mb-4"
              v-else
              aspect-ratio="1"
              :src="require('@/asset/avatar-placeholder.png')"
            ></v-img>
            <v-btn color="primary" @click="changeAvatar">Change avatar</v-btn>
            <v-btn color="primary" @click="changePassword">Change password</v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn color="primary" @click="saveProfile">
              <v-progress-circular indeterminate v-if="savingProfile"></v-progress-circular>
              <template v-else>Save profile</template>
            </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <!-- Change avatar dialog -->
    <v-dialog v-model="avatarDialog" max-width="600">
      <v-card class="pa-3">
        <h1 class="headline">Change avatar</h1>
        <v-layout row align-center>
          <v-text-field v-if="avatarFile" :value="avatarFile.name" readonly label="File name"></v-text-field>
          <v-text-field v-else placeholder="No files selected" readonly label="File name"></v-text-field>
          <upload-btn
            accept="image/png, image/jpeg"
            class="pa-0"
            title="Select file"
            :fileChangedCallback="avatarFileChanged"
          ></upload-btn>
          <v-btn :disabled="!avatarFile" color="primary" @click="uploadAvatar">
            <v-progress-circular indeterminate v-if="avatarUploading"></v-progress-circular>
            <template v-else>Upload</template>
          </v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
    <!-- Change password dialog -->
    <v-dialog v-model="passwordDialog" max-width="400">
      <v-card class="pa-4">
        <v-form @submit.prevent="setPassword">
          <h1 class="headline mb-2">Change password</h1>
          <v-layout column>
            <v-text-field label="Current password" type="password" v-model="oldPassword"></v-text-field>
            <v-text-field label="New password" type="password" v-model="newPassword"></v-text-field>
            <v-text-field
              class="mb-2"
              label="Confirm password"
              type="password"
              v-model="confirmPassword"
              :rules="[checkPassword]"
            ></v-text-field>
            <v-btn :disabled="!passwordMatch" color="primary" @click="setPassword">Change password</v-btn>
          </v-layout>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar">{{ snackbarMessage }}</v-snackbar>
  </full-screen-container>
  <full-screen-container v-else>
    <v-layout align-center justify-center fill-height>
      <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </full-screen-container>
</template>
<script>
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import UploadButton from "vuetify-upload-button";
import gql from "graphql-tag";

export default {
  components: {
    "full-screen-container": FullScreenContainer,
    "upload-btn": UploadButton
  },
  data() {
    return {
      doctor: null,
      snackbar: false,
      snackbarMessage: "",
      dobMenu: false,
      // Change Avatar
      avatarDialog: false,
      avatarFile: null,
      avatarUploading: false,
      // Change password
      passwordDialog: false,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      changingPassword: false,
      // Profile
      savingProfile: false,
      specialties: [
        { text: "General Pratice", value: "general_practice" },
        { text: "Cardiology", value: "cardiology" },
        { text: "Dentistry", value: "dentistry" },
        { text: "Dietetics", value: "dietetics" }
      ],
      languages: [
        { text: "English", value: "english" },
        { text: "Spanish", value: "spanish" },
        { text: "Mandarin", value: "mandarin" },
        { text: "Cantonese", value: "cantonese" }
      ]
    };
  },
  computed: {
    passwordMatch() {
      return !!this.newPassword && this.newPassword === this.confirmPassword;
    }
  },
  methods: {
    getAvatar(avatar) {
      return `https://dsapi.1lo.li/assets/avatars/${avatar}`;
    },
    changeAvatar() {
      this.avatarDialog = true;
    },
    avatarFileChanged(file) {
      // console.log(file);
      this.avatarFile = file;
    },
    uploadAvatar() {
      const vars = {
        id: this.$store.state.userId,
        avatar: this.avatarFile
      };
      this.avatarUploading = true;
      // console.log(vars);
      this.$apollo
        .mutate({
          mutation: gql`
            mutation uploadDoctorAvatar($id: ID!, $avatar: Upload!) {
              uploadDoctorAvatar(doctorId: $id, file: $avatar) {
                success
                message
                mimetype
                filename
              }
            }
          `,
          variables: vars
        })
        .then(({ data: { uploadDoctorAvatar: { message } } }) => {
          // console.log(result);
          this.snackbar = true;
          this.snackbarMessage = message;
        })
        .catch(err => {
          this.snackbar = true;
          this.snackbarMessage = "Error uploading avatar";
          console.log(err);
        })
        .finally(() => {
          this.avatarUploading = false;
          this.avatarDialog = false;
        });
    },
    changePassword() {
      this.oldPassword = this.newPassword = this.confirmPassword = "";
      this.passwordDialog = true;
    },
    checkPassword() {
      if (this.newPassword === this.confirmPassword) {
        return true;
      } else {
        return "New password and confirm password does not match";
      }
    },
    setPassword() {
      if (!this.passwordMatch) return;
      this.changingPassword = true;
      this.$apollo
        .mutate({
          mutation: gql`
            mutation setPassword(
              $oldPassword: String!
              $newPassword: String!
              $id: ID!
            ) {
              changePassword(
                oldPassword: $oldPassword
                newPassword: $newPassword
                userType: doctor
                id: $id
              ) {
                success
                message
              }
            }
          `,
          variables: {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            id: this.$store.state.userId
          }
        })
        .then(({ data: { changePassword: { message } } }) => {
          this.snackbar = true;
          this.snackbarMessage = message;
        })
        .catch(err => {
          console.dir(err);
          this.snackbar = true;
          this.snackbarMessage = "Error changing password";
        })
        .finally(() => {
          this.changingPassword = false;
          this.passwordDialog = false;
        });
    },
    saveProfile() {
      this.savingProfile = true;
      this.$apollo
        .mutate({
          mutation: gql`
            mutation saveProfile($id: ID!, $data: DoctorInput!) {
              editDoctor(id: $id, data: $data) {
                id
                name
                dob
                email
                gender
                phoneNo
                hkid
                language
                specialty
                experience
                academic
              }
            }
          `,
          variables: {
            id: this.$store.state.userId,
            data: {
              name: this.doctor.name,
              dob: this.doctor.dob,
              email: this.doctor.email,
              gender: this.doctor.gender,
              phoneNo: this.doctor.phoneNo,
              hkid: this.doctor.hkid,
              language: this.doctor.language,
              specialty: this.doctor.specialty,
              experience: this.doctor.experience,
              academic: this.doctor.academic
            }
          }
        })
        .then(() => {
          this.snackbar = true;
          this.snackbarMessage = "Profile saved successfully";
        })
        .catch(err => {
          console.dir(err);
          this.snackbar = true;
          this.snackbarMessage = "Error saving profile";
        })
        .finally(() => {
          this.savingProfile = false;
        });
    }
  },
  apollo: {
    doctor: {
      query: gql`
        query getDoctor($doctorId: ID!) {
          doctor(id: $doctorId) {
            avatar
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
        return { doctorId: this.$store.state.selectedDoctor };
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

