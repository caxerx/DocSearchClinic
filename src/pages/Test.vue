<template>
  <div class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="indigo"
          dark
          v-on="on"
        >
          Menu as Popover
        </v-btn>
      </template>

        <v-card color="grey lighten-4" min-width="350px" flat>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>
                      <a href="/">{{patient.name}}</a>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>{{patient.details}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <br>
                <v-list-tile-action class="text-md-center">
                  <div style="width:70%;display: block;margin-left: auto;margin-right: auto;">
                    <v-btn flat block outline>Check-in</v-btn>
                  </div>
                </v-list-tile-action>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                <v-list-tile>
                  <v-list-tile-sub-title>
                    <v-icon>phone</v-icon>
                    {{patient.phoneNo}}
                    <br>
                    <v-icon>email</v-icon>
                    {{patient.email}}
                  </v-list-tile-sub-title>
                </v-list-tile>
              </v-list>

              <v-list>
                <v-list-tile>
                  <v-list-tile-title>
                    <b>{{formatAMPM(patient.time)}}</b>
                    for {{patient.duration}} mins
                  </v-list-tile-title>
                  <v-spacer></v-spacer>
                  <v-list-tile-action>
                    <v-btn icon left>
                      <v-icon color="success">edit</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-btn icon left>
                      <v-icon color="error">cancel</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true
    })
  }
</script>