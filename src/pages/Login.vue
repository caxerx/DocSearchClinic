<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            just click login btn, cannot not input
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="name"
                label="name"
                type="text"
                :rules="nameRules"
                v-model="name"
                required
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                :rules="pwdRules"
                v-model="pwd"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer style="color:red">{{errMsg}}</v-spacer>

            <v-btn color="primary" @click="check">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>




<script>
import axios from "axios";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [v => !!v || "Name is required"],
    pwd: "",
    pwdRules: [v => !!v || "Password is required"],
    errMsg: "",
  }),

  created: function() {
    if (
      this.$cookies.get("clincUserId") !== null &&
      this.$cookies.get("clincUserId") !== ""
    ) {
      console.log(this.$cookies.get("clincUserId"));
      this.login();
    }
  },

  methods: {
    ...mapActions([
      "actionLogin",
      "actionLoginFail",
    ]),

    check() {
      // if (this.$refs.form.validate()) {

      // }
      this.login();
    },
    login() {
      this.setCookie(4);
     
      this.actionLogin(true);
      
    },
    setCookie(id) {
      this.$cookies.set("clincUserId", id, {
        expires: "1d"
      });
    }
  }
};
</script>


