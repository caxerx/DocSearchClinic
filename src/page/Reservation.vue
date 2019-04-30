<template>
  <full-screen-container v-if="!reservations">
    <v-layout align-center justify-center fill-height>
      <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </full-screen-container>
  <full-screen-container v-else>
    <v-layout row fill-height>
      <v-flex xs6>
        <v-layout column>
          <v-flex>
            <v-toolbar flat prominent>
              <v-btn icon @click="$refs.calendar.prev()">
                <v-icon>arrow_left</v-icon>
              </v-btn>
              <v-menu
                v-model="timePickerMenu"
                :close-on-content-click="false"
                full-width
                max-width="290"
              >
                <template v-slot:activator="{ on }">
                  <v-chip v-on="on">{{timePicked}}</v-chip>
                </template>
                <v-date-picker v-model="timePicked" @change="timePickerMenu = false"></v-date-picker>
              </v-menu>

              <v-btn icon @click="$refs.calendar.next()">
                <v-icon>arrow_right</v-icon>
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn-toggle v-model="type">
                <v-btn flat value="day">Day</v-btn>
                <v-btn flat value="week">Week</v-btn>
              </v-btn-toggle>
            </v-toolbar>
            <v-divider></v-divider>
          </v-flex>
          <v-flex>
            <v-sheet :height="sheetHeight">
              <v-calendar ref="calendar" v-model="timePicked" :type="type" color="primary">
                <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
                  <template v-for="reservation in  getReservationByDate(date)">
                    <v-menu :key="reservation.id" offset-y nudge-down="15px" max-width="500">
                      <div
                        slot="activator"
                        :key="reservation.id"
                        :style="{ top: timeToY(getReservationTime(reservation.startTime)) + 'px', height: minutesToPixels(getReservationDuration(reservation.startTime,reservation.endTime))+'px' }"
                        class="my-event with-time primary"
                        v-if="reservation.type=='online'"
                      >{{reservation.patient.name}}</div>

                      <div
                        slot="activator"
                        :key="reservation.id"
                        :style="{ top: timeToY(getReservationTime(reservation.startTime)) + 'px', height: minutesToPixels(getReservationDuration(reservation.startTime,reservation.endTime))+'px' }"
                        class="my-event with-time success"
                        v-else
                      >{{reservation.patient.name}}</div>

                      <v-card>
                        <v-toolbar class="ma-0">
                          <v-toolbar-title>Reservation Detail</v-toolbar-title>
                        </v-toolbar>
                        <v-list class="ma-0 pb-0">
                          <v-subheader>Patient</v-subheader>
                          <v-divider></v-divider>
                          <v-list-tile avatar @click="viewProfile(reservation.patient.id)">
                            <v-list-tile-avatar>
                              <v-icon v-if="reservation.patient.avatar==''" size="40">account_circle</v-icon>
                              <v-img :src="getAvatar(reservation.patient.avatar)" v-else/>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>{{reservation.patient.name}}</v-list-tile-title>
                              <v-list-tile-sub-title>{{getGenderName(reservation.patient.gender)}}．{{getPatientDobDisplay(reservation.patient.dob)}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-divider></v-divider>
                          <v-subheader>Reservation</v-subheader>
                        </v-list>
                        <v-divider></v-divider>

                        <v-list class="ma-0">
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title>{{getConsultationTypeDisplay(reservation.type)}}</v-list-tile-title>
                              <v-list-tile-sub-title>{{getTimeDisplay(reservation.startTime)}}</v-list-tile-sub-title>
                              <v-list-tile-sub-title>{{reservation.note}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="checkIn(reservation)" class="primary" flat>Check-in</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </template>
                </template>
              </v-calendar>
            </v-sheet>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-layout
          align-center
          justify-center
          fill-height
          v-if="$apollo.queries.reservations.loading"
        >
          <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
        </v-layout>
        <v-tabs v-model="reservationTab" v-else>
          <v-tab key="0">Upcoming</v-tab>
          <v-tab key="1">
            Pending Approve&nbsp;
            <span v-if="pendingApprove>0">({{pendingApprove}})</span>
          </v-tab>
          <v-tab-item key="0">
            <v-divider></v-divider>
            <v-list
              two-line
              style="background-color:transparent;overflow-y: scroll;overflow-x: hidden; height: calc(100vh - 64px - 48px)"
            >
              <div v-for="r in reservations[1]" :key="r.id">
                <v-list-tile class="pr-3">
                  <v-list-tile-avatar>
                    <v-menu offset-x open-on-hover>
                      <template v-slot:activator="{ on }">
                        <v-icon v-if="r.patient.avatar==''" size="40" v-on="on">account_circle</v-icon>
                        <v-img :src="getAvatar(r.patient.avatar)" v-else v-on="on"/>
                      </template>
                      <v-card>
                        <v-toolbar class="ma-0">
                          <v-toolbar-title>Reservation Detail</v-toolbar-title>
                        </v-toolbar>
                        <v-list class="ma-0 pb-0">
                          <v-subheader>Patient</v-subheader>
                          <v-divider></v-divider>
                          <v-list-tile avatar @click="viewProfile(r.patient.id)">
                            <v-list-tile-avatar>
                              <v-icon v-if="r.patient.avatar==''" size="40">account_circle</v-icon>
                              <v-img :src="getAvatar(r.patient.avatar)" v-else/>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>{{r.patient.name}}</v-list-tile-title>
                              <v-list-tile-sub-title>{{getGenderName(r.patient.gender)}}．{{getPatientDobDisplay(r.patient.dob)}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-divider></v-divider>
                          <v-subheader>Reservation</v-subheader>
                        </v-list>
                        <v-divider></v-divider>

                        <v-list class="ma-0">
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title>{{getConsultationTypeDisplay(r.type)}}</v-list-tile-title>
                              <v-list-tile-sub-title>{{getTimeDisplay(r.startTime)}}</v-list-tile-sub-title>
                              <v-list-tile-sub-title>{{r.note}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="checkIn(r)" class="primary" flat>Check-in</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{getConsultationTypeDisplay(r.type)}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{getTimeDisplay(r.startTime)}}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{r.note}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </div>
            </v-list>
          </v-tab-item>
          <v-tab-item key="1">
            <v-divider></v-divider>
            <v-list
              two-line
              style="background-color:transparent;overflow-y: scroll;overflow: hidden; height: calc(100vh - 64px - 48px)"
            >
              <div v-for="r in reservations[0]" :key="r.id">
                <v-list-tile class="pr-3">
                  <v-list-tile-avatar>
                    <v-menu offset-x open-on-hover>
                      <template v-slot:activator="{ on }">
                        <v-icon v-if="r.patient.avatar==''" size="40" v-on="on">account_circle</v-icon>
                        <v-img :src="getAvatar(r.patient.avatar)" v-else v-on="on"/>
                      </template>

                      <v-card>
                        <v-list>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon v-if="r.patient.avatar==''" size="40">account_circle</v-icon>
                              <v-img :src="getAvatar(r.patient.avatar)" v-else/>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>{{r.patient.name}}</v-list-tile-title>
                              <v-list-tile-sub-title>{{getGenderName(r.patient.gender)}}．{{getPatientDobDisplay(r.patient.dob)}}</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action-text>
                              <v-btn
                                outline
                                color="primary"
                                @click="viewProfile(r.patient.id)"
                              >Profile</v-btn>
                            </v-list-tile-action-text>
                          </v-list-tile>
                        </v-list>
                      </v-card>
                    </v-menu>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{getConsultationTypeDisplay(r.type)}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{getTimeDisplay(r.startTime)}}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{r.note}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" @click="approve(r)">
                          <v-icon color="success">check</v-icon>
                        </v-btn>
                      </template>
                      <span>Approve</span>
                    </v-tooltip>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                          <v-icon color="error">close</v-icon>
                        </v-btn>
                      </template>
                      <span>Reject</span>
                    </v-tooltip>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
              </div>
            </v-list>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </full-screen-container>
</template>
<script>
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import gql from "graphql-tag";
import moment from "moment";
export default {
  data() {
    return {
      reservationTab: 0,
      startDate: null,
      endDate: null,
      type: "day",
      reservations: null,
      timePickerMenu: false,
      timePicked: "",
      windowHeight: window.innerHeight
    };
  },
  created() {
    this.timePicked = moment().format("YYYY-MM-DD");
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowHeight = window.innerHeight;
    });
  },
  methods: {
    async checkIn(reservation) {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation enqueue($data: QueueRecordInput!) {
              enqueue(data: $data) {
                id
              }
            }
          `,
          variables: {
            data: {
              doctorId: this.$store.state.selectedDoctor,
              patientId: reservation.patient.id,
              workplaceId: this.$store.state.workplace,
              reservationId: reservation.id,
              type: reservation.type
            }
          }
        });
      } catch {
        console.log("addToQueueFailed");
      }
      await this.changeReservationStatus(reservation, "waiting");
      await this.$apollo.queries.reservations.refetch();
    },
    viewProfile(id) {
      this.$router.push("/patient/" + id);
    },
    getConsultationTypeDisplay(t) {
      if (t == "online" || t == "ONLINE") {
        return "Online Consultation";
      }
      return "Clinic Consultation";
    },
    getTimeDisplay(time) {
      return moment(time).format("YYYY-MM-DD h:mm A");
    },
    getReservationByDate(date) {
      return this.reservations[1].filter(r => {
        return moment(r.startTime).isSame(moment(date), "day");
      });
    },
    getReservationTime(date) {
      console.log(moment(date).format("HH:mm"));
      return moment(date).format("HH:mm");
    },
    getReservationDuration(startDate, endDate) {
      return moment(endDate).diff(moment(startDate), "minute");
    },
    getAge(dob) {
      return moment().diff(moment(dob), "year");
    },
    getPatientDobDisplay(dob) {
      return `${moment(dob).format("YYYY-MM-DD")} (${this.getAge(dob)})`;
    },
    getGenderName(gender) {
      if (gender == "M" || gender == "m") {
        return "Male";
      } else {
        return "Female";
      }
    },
    async approve(reservation) {
      await this.changeReservationStatus(reservation, "approved");
      this.$apollo.queries.reservations.refetch();
    },
    async reject(reservation) {
      await this.changeReservationStatus(reservation, "rejected");
      this.$apollo.queries.reservations.refetch();
    },
    async changeReservationStatus(reservation, status) {
      let rinput = {
        reserverId: reservation.reserver.id,
        patientId: reservation.patient.id,
        doctorId: reservation.doctor.id,
        workplaceId: reservation.workplace.id,
        consultationId: null,
        note: reservation.note,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        status: status,
        type: reservation.type
      };

      return await this.$apollo.mutate({
        mutation: gql`
          mutation editReservation(
            $reservationId: ID!
            $reservationInput: ReservationInput!
          ) {
            editReservation(id: $reservationId, data: $reservationInput) {
              id
            }
          }
        `,
        variables: {
          reservationId: reservation.id,
          reservationInput: rinput
        }
      });
    },
    getAvatar(i) {
      return this.$store.state.avatarBase + i;
    }
  },
  apollo: {
    reservations: {
      query: gql`
        query getReservations($doctorId: ID!) {
          doctor(id: $doctorId) {
            reservations {
              id
              startTime
              endTime
              status
              type
              note
              patient {
                id
                name
                email
                phoneNo
                avatar
                gender
                dob
              }
              reserver {
                id
              }
              doctor {
                id
              }
              workplace {
                id
              }
            }
          }
        }
      `,
      variables() {
        return {
          doctorId: this.$store.state.selectedDoctor
        };
      },
      update(data) {
        let d = data.doctor.reservations;
        let reservations = [[], []];
        reservations[0] = d.filter(r => r.status == "pending");
        reservations[1] = d
          .filter(r => r.status == "approved")
          .sort((t1, t2) => {
            return moment(t1.startTime).diff(moment(t2.startTime));
          });
        return reservations;
      },
      fetchPolicy: "no-cache",
      pollInterval: 1000
    }
  },
  components: {
    "full-screen-container": FullScreenContainer
  },
  computed: {
    sheetHeight() {
      return this.windowHeight - 128;
    },
    pendingApprove() {
      return this.reservations[0] == null ? 0 : this.reservations[0].length;
    }
  }
};
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
