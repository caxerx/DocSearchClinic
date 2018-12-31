<template>
  <div>
    <!-- {{isSuccess}}
    <br>
    <button @click="actionLoginSuccess">Success</button>
    <br>
    <button @click="actionLoginFail">Fail</button><br>-->
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
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
      </v-content>
    </v-app>
  </div>
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
    errMsg: ""
  }),
  methods: {
    ...mapActions(["actionLogin", "actionLoginFail", "actionLoginSuccess"]),

    loginSuccess() {
      this.$router.push("/about");
      this.actionLogin(true);
    },

    loginFail() {
      this.actionLogin(false);
    },

    check() {
      if (this.$refs.form.validate()) {
        if (this.name == "test" && this.pwd == "test") {
          console.log("loginSuccess()");
          this.loginSuccess();
          // this.$router.push({ name: "app" });
        } else {
          console.log("loginFail()");
          this.loginFail();
        }
      } else {
        console.log("loginFail()");
        this.loginFail();
      }
    }
  }
};
</script>


