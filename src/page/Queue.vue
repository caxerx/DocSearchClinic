<template>
  <full-screen-container v-if="!queues">
    <v-layout align-center justify-center fill-height>
      <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </full-screen-container>
  <full-screen-container v-else>
    <div style="height:100%; width:100%" class="pa-4">
      <v-layout fill-height>
        <v-flex xs3>
          <v-layout column fill-height>
            <v-flex>
              <h3 class="headline mb --text">
                Queue
                <v-dialog v-model="checkInDialog" width="400">
                  <template v-slot:activator="{ on }">
                    <v-btn outline color="primary" v-on="on">Check in</v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="headline">Check-in</v-card-title>
                    <v-container>
                      <v-layout justify-center align-center column>
                        <v-flex>
                          <v-form ref="checkinform" @submit.prevent="checkIn()">
                            <v-text-field
                              outline
                              label="Focus and scan"
                              color="primary"
                              v-model="checkinString"
                            ></v-text-field>
                          </v-form>
                        </v-flex>
                        <v-flex>
                          <qrcode-stream
                            @decode="onDecode"
                            style="height: 250px; width: 250px; background-color:black"
                            v-if="checkInDialog"
                          ></qrcode-stream>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-dialog>
              </h3>
              <v-tabs v-model="queueTab" slider-color="orange" color="transparent">
                <v-tab v-for="qType in queueType" :key="qType" ripple>{{qType}}</v-tab>
              </v-tabs>
            </v-flex>

            <v-flex fill-height style="overflow-y: scroll">
              <div v-for="(qType,qIndex) in queueType" :key="qIndex">
                <v-list flat style="background-color:transparent;" v-if="queueTab == qIndex">
                  <v-list-tile avatar v-for="q in queues[qIndex]" :key="q.id">
                    <v-list-tile-avatar>
                      <v-icon v-if="q.patient.avatar==''" size="40">account_circle</v-icon>
                      <v-img :src="getAvatar(q.patient.avatar)" v-else/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{q.patient.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{getQueuedTime(q.startTime)}}{{renderer}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="pl-4">
          <v-card class="fill-height">
            <v-layout align-center justify-center fill-height v-if="!selectedPatient">
              <div>Select a queue to view details</div>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </full-screen-container>
</template>
<script>
import gql from "graphql-tag";
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import { QrcodeStream } from "vue-qrcode-reader";
import moment from "moment";

export default {
  components: {
    "full-screen-container": FullScreenContainer,
    "qrcode-stream": QrcodeStream
  },
  data() {
    return {
      checkInDialog: false,
      checkinString: "",
      queueTab: 0,
      selectedPatient: null,
      queueType: ["All", "Clinic", "Online"],
      queues: null,
      renderer: "",
      rendererId: -1
    };
  },
  mounted() {
    this.rendererId = setInterval(() => {
      this.renderer = " ";
      this.renderer = "";
    }, 1000);
  },
  destroyed() {
    clearInterval(this.rendererId);
  },
  methods: {
    onDecode(str) {
      this.checkinString = str;
      this.checkIn();
    },
    checkIn() {
      this.checkInDialog = false;
      this.checkinString = "";
    },
    getQueuedTime(time) {
      return moment(time).fromNow();
    },
    getAvatar(i) {
      return this.$store.state.avatarBase + i;
    },
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
    async changeReservationStatus(reservation, status) {
      let rinput = {
        reserverId: reservation.reserverId,
        patientId: reservation.patientId,
        doctorId: reservation.doctorId,
        workplaceId: reservation.workplaceId,
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
    }
  },
  created() {},
  apollo: {
    queues: {
      query: gql`
        query getPatients($doctorId: ID!) {
          doctor(id: $doctorId) {
            currentQueue {
              id
              status
              type
              startTime
              endTime
              patient {
                name
                id
                avatar
              }
              workplace {
                id
              }
              reservation {
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
        return [
          data.doctor.currentQueue,
          data.doctor.currentQueue.filter(r => r.type == "clinic"),
          data.doctor.currentQueue.filter(r => r.type == "online")
        ];
      }
    }
  }
};
</script>

