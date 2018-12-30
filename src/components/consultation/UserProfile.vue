<template>
  <div>
    <view-profile/>
    <v-card>
      <h1>Patient Profile</h1>
      <table>
        <tr>
          <td>Name:</td>
          <td>asd</td>
          <br>
        </tr>
        <tr>
          <td>Gender:</td>
          <td>Male</td>
          <br>
        </tr>
        <tr>
          <td>Email:</td>
          <td>asodijasiod@gmail.com</td>
          <br>
        </tr>
        <tr>
          <td>Phone:</td>
          <td>12345678</td>
          <br>
        </tr>
        <tr>
          <td>Age:</td>
          <td>99</td>
          <br>
        </tr>
        <!-- <tr>
        <td>Allergy:</td>
        <td>
          <div>Allergy1</div>
          <div>Allergy2</div>
          <div>Allergy3</div>
        </td>
        <br>
        </tr>-->
      </table>
      <v-btn color="primary" @click="viewProfile()">Medicine Record</v-btn>
    </v-card>
  </div>
</template>

<script>
import ViewProfile from "@/components/consultation/ViewProfile.vue";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  components: {
    ViewProfile
  },
  methods: {
    ...mapActions(["actionCloseDialog", "actionOpenDialog"]),
    viewProfile() {
      this.dialogType = "viewProfile";
      this.actionOpenDialog("fullscreen");
      //   this.actionSetDatePickerType("viewItemDialog");
    }
  }
};
</script>
