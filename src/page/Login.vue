<template>
  <v-content class="primary">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12>
          <v-container style="max-width: 500px;">
            <v-layout row justify-center align-center pb-3>
              <v-flex>
                <img src="/logo_s.png">
              </v-flex>
              <v-flex>
                <p
                  class="font-weight-thin display-1 white--text text-xs-center ma-0"
                >DocSearch Clinic System</p>
              </v-flex>
            </v-layout>

            <!--Login-->
            <v-card class="elevation-12">
              <v-container class="px-4">
                <v-form @submit.prevent="login" ref="loginForm" v-model="valid" lazy-validation>
                  <p class="headline text-xs-center primary--text mb-4">Restricted Area</p>
                  <v-text-field
                    outline
                    prepend-inner-icon="person"
                    name="login"
                    label="Username"
                    type="text"
                    v-model="loginInfo.userId"
                    required
                    :rules="userIdRules"
                    validate-on-blur
                  ></v-text-field>
                  <v-text-field
                    outline
                    id="password"
                    prepend-inner-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="loginInfo.password"
                    autocomplete="current-password"
                    required
                    :rules="passwordRules"
                    validate-on-blur
                  ></v-text-field>
                  <v-flex>
                    <v-expansion-panel v-model="loginFailed" class="elevation-0">
                      <v-expansion-panel-content>
                        <v-alert outline :value="true" color="error" icon="warning">Login Failed</v-alert>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-flex>
                  <v-layout class="align-center justify-center mt-3">
                    <v-btn depressed color="primary" type="submit" @click="login">Login</v-btn>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>




<script>
import gql from "graphql-tag";

export default {
  name: "Login",
  created() {
    let localStorageId = localStorage.getItem("userId");
    if (localStorageId > 0) {
      this.$store.commit("loggedInAs", {
        userId: localStorageId,
        role: localStorage.getItem("rold"),
        selectedDoctor: localStorage.getItem("selectedDoctor"),
        workplace: localStorage.getItem("workplace")
      });
      this.$router.replace("/");
    }
  },
  data: () => ({
    valid: true,
    loginInfo: {
      userId: "",
      password: ""
    },
    passwordRules: [v => !!v || "Password is required"],
    userIdRules: [v => !!v || "Username is required"],
    doctorLoginTrigger: false,
    staffLoginTrigger: false,
    staffLogin: -1,
    doctorLogin: -1
  }),
  methods: {
    login() {
      this.doctorLoginTrigger = true;
      this.staffLoginTrigger = true;
      this.$apollo.queries.doctorLogin.refetch();
      this.$apollo.queries.staffLogin.refetch();
    }
  },
  computed: {
    loginFailed() {
      if (this.staffLogin == -1 || this.doctorLogin == -1) {
        return -1;
      }
      if (!this.staffLogin.success && !this.doctorLogin.success) {
        return 0;
      } else {
        if (this.staffLogin.success) {
          let staffId = this.staffLogin.staff.id;
          localStorage.setItem("userId", staffId);
          localStorage.setItem("role", "S");
          localStorage.setItem("workplace", this.staffLogin.workplace.id);
          localStorage.setItem(
            "selectedDoctor",
            this.staffLogin.workplace.doctors[0].id
          );
          this.$store.commit("loggedInAs", {
            userId: staffId || -1,
            role: "S",
            workplace: this.staffLogin.workplace.id || -1,
            selectedDoctor: this.staffLogin.workplace.doctors[0].id || -1
          });
        } else {
          let doctorId = this.doctorLogin.doctor.id;
          localStorage.setItem("userId", doctorId);
          localStorage.setItem("role", "D");
          localStorage.setItem("selectedDoctor", doctorId);
          localStorage.setItem(
            "workplace",
            this.doctorLogin.doctor.workplace.id
          );
          this.$store.commit("loggedInAs", {
            userId: doctorId || -1,
            role: "D",
            selectedDoctor: doctorId || -1,
            workplace: this.doctorLogin.doctor.workplace.id || -1
          });
        }
        return -1;
      }
    }
  },
  apollo: {
    doctorLogin: {
      query: gql`
        query doctorLogin($username: String!, $password: String!) {
          doctorLogin(username: $username, password: $password) {
            success
            doctor {
              id
              name
              workplace {
                id
              }
            }
          }
        }
      `,
      variables() {
        return {
          username: this.loginInfo.userId,
          password: this.loginInfo.password
        };
      },
      skip() {
        return !this.doctorLoginTrigger;
      },
      result() {
        this.doctorLoginTrigger = false;
      }
    },
    staffLogin: {
      query: gql`
        query staffLogin($username: String!, $password: String!) {
          staffLogin(username: $username, password: $password) {
            success
            staff {
              id
              name
              workplace {
                id
                doctors {
                  id
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          username: this.loginInfo.userId,
          password: this.loginInfo.password
        };
      },
      skip() {
        return !this.staffLoginTrigger;
      },
      result() {
        this.staffLoginTrigger = false;
      }
    }
  }
};
</script>
