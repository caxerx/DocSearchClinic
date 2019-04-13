<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title v-if="isDoctor">Doctor Login</v-toolbar-title>
            <v-toolbar-title v-if="!isDoctor">Staff Login</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat icon @click="isDoctor = !isDoctor">
              <v-icon>repeat</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="name"
                :label="computedHints"
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

            <v-btn color="primary" @click="check" :disabled="dialog" :loading="dialog">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>




<script>
import axios from "axios";
import { mapGetters, mapActions, mapState } from "vuex";
import gql from "graphql-tag";

const doctorLoginQuery = gql`
  query($username: String!, $password: String!) {
    doctorLogin(username: $username, password: $password) {
      success
      message
      doctor {
        id
        name
        workplace {
          id
          name
        }
      }
    }
  }
`;
const staffLoginQuery = gql`
  query($username: String!, $password: String!) {
    staffLogin(username: $username, password: $password) {
      success
      message
      staff {
        id
        name
      }
      # workplace {
      #   id
      #   name
      # }
    }
  }
`;

const workplaceQuery = gql`
  query($id:ID!){
    workplace(id:$id){
      name
      doctors{
        id
        name
      }
    }
  }
`
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [v => !!v || "Name is required"],
    pwd: "",
    pwdRules: [v => !!v || "Password is required"],
    errMsg: "",
    isDoctor: true
  }),

  created: function() {},
  computed: {
    ...mapGetters({
      getSelectDoctor: "getSelectDoctor",
      getLogin: "getLogin"
    }),
    computedHints() {
      if (this.isDoctor) {
        return "Doctor name";
      } else {
        return "Staff name";
      }
    },

    dialog: {
      get() {
        if (this.$apollo.loading) {
          return true;
        } else {
          return false;
        }
      },
      set(val) {
        this.dialog = val;
      }
    }
  },
  apollo: {
    workplace: {
      query: workplaceQuery,

      variables() {
        return {
          id: this.getLogin.workplace.id
        };
      },
      skip() {
        return true;
      },
      update(data) {
        this.$apollo.queries.workplace.skip = true;
        this.actionSetWorkPlaceForDrawer(data.workplace);
        this.actionSetLoginSuccess(true);
        return data.workplace;
      }
    },

    doctorLogin: {
      query: doctorLoginQuery,
      variables() {
        return {
          username: this.name,
          password: this.pwd
        };
      },
      skip() {
        return true;
      },
      update(data) {
        this.$apollo.queries.doctorLogin.skip = true;
        if (data.doctorLogin.success) {
          this.actionSetLogin(data.doctorLogin.doctor);
          this.actionSetSelectDoctor(data.doctorLogin.doctor)
          this.$apollo.queries.workplace.skip = false;
        } else {
          this.errMsg = data.doctorLogin.message;
        }
        return data.doctorLogin;
      }
    },
    staffLogin: {
      query: staffLoginQuery,
      variables() {
        return {
          username: this.name,
          pwd: this.pwd
        };
      },
      skip() {
        return true;
      },
      update(data) {
        this.$apollo.queries.staffLogin.skip = true;
        this.errMsg = data.staffLogin.message;
        return data.staffLogin;
      }
    }
  },
  methods: {
    ...mapActions([
      "actionSetLogin",
      "actionSetQueueRecordsFromQueue",
      "actionSetWorkPlaceForDrawer",
      "actionSetLoginSuccess",
      "actionSetSelectDoctor"
    ]),

    check() {
      this.errMsg = "";
      this.$router.push("/")
      if (this.isDoctor) {
        this.$apollo.queries.doctorLogin.skip = false;
      }

      if (!this.isDoctor) {
        this.$apollo.queries.staffLogin.skip = false;
      }
    }
  }
};
</script>


