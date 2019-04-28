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
                  <v-list-tile
                    avatar
                    v-for="q in queues[qIndex]"
                    :key="q.id"
                    @click="selectPatient(q)"
                  >
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
            <v-layout fill-height column v-else>
              <v-toolbar flat color="primary" dark id="tb">
                <v-toolbar-items>
                  <v-btn flat :disabled="queueDisabled">
                    <v-icon class="mr-1">check</v-icon>Start Consultation
                  </v-btn>
                  <v-divider vertical></v-divider>
                  <v-btn flat dark @click="cancelReservation" :disabled="queueDisabled">
                    <v-icon class="mr-1">delete</v-icon>Cancel Reservation
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <patient-details-card :patientId="selectedPatient"></patient-details-card>
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
import PatientDetailsCard from "@/component/PatientDetailsCard.vue";
import { setTimeout } from "timers";

export default {
  components: {
    "full-screen-container": FullScreenContainer,
    "qrcode-stream": QrcodeStream,
    "patient-details-card": PatientDetailsCard
  },
  data() {
    return {
      targetReservationId: null,
      targetReservation: null,
      checkInDialog: false,
      checkinString: "",
      queueTab: 0,
      selectedPatient: null,
      selectedQueue: null,
      selectedQueueObject: null,
      queueType: ["All", "Clinic", "Online"],
      queues: null,
      renderer: "",
      rendererId: -1,
      refetchReslover: null,
      queueDisabled: false
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
    async cancelReservation() {
      this.queueDisabled = true;
      this.targetReservationId = this.selectedQueueObject.id;
      await this.dequeue();
      await this.refectchTargetReservation();
      console.log("FIN");
      await this.changeReservationStatus(
        this.targetReservation,
        "rejected",
        null
      );
      this.selectedPatient = null;
      this.selectedQueue = null;
      this.selectedQueueObject = null;
      this.queueDisabled = false;
    },
    selectPatient(queue) {
      this.selectedPatient = queue.patient.id;
      this.selectedQueue = queue.id;
      this.selectedQueueObject = queue;
    },
    onDecode(str) {
      this.checkinString = str;
      this.checkIn();
    },
    async refectchTargetReservation() {
      let p = new Promise((resolve, reject) => {
        this.refetchReslover = resolve;
      });
      await this.$apollo.queries.targetReservation.refetch();
      console.log("FINFET");
      await p;
      return 0;
    },
    async checkIn() {
      this.checkInDialog = false;
      try {
        let arr = JSON.parse(atob(this.checkinString));
        if (arr.length == 5) {
          this.targetReservationId = arr[3];
          await this.refectchTargetReservation();
          await this.checkInToQueue(this.targetReservation);
        }
      } catch (e) {
        console.error("BOOM", e);
      }
      this.checkinString = "";
    },
    getQueuedTime(time) {
      return moment(time).fromNow();
    },
    getAvatar(i) {
      return this.$store.state.avatarBase + i;
    },
    async dequeue() {
      console.log(this.selectedQueue);
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation dequeue {
              dequeue(queueId: ${this.selectedQueue}) {
                id
              }
            }
          `
        });
      } catch {
        console.log("dequeueFailed");
      }
    },
    async checkInToQueue(reservation) {
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
      } catch (e) {
        console.log("addToQueueFailed", e);
      }
      await this.changeReservationStatus(reservation, "waiting", null);
    },
    async changeReservationStatus(reservation, status, consultationId) {
      console.log("CRS", reservation);
      let rinput = {
        reserverId: reservation.reserver.id,
        patientId: reservation.patient.id,
        doctorId: this.$store.state.selectedDoctor,
        workplaceId: reservation.workplace.id,
        consultationId: consultationId,
        note: reservation.note,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        status: status,
        type: reservation.type
      };

      await this.$apollo.mutate({
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
      await this.$apollo.queries.queues.refetch();
    }
  },
  created() {},
  apollo: {
    targetReservation: {
      query: gql`
        query getReservation($reservationId: ID!) {
          reservation(id: $reservationId) {
            id
            status
            type
            startTime
            endTime
            note
            type
            patient {
              name
              id
              avatar
            }
            workplace {
              id
            }
            reserver {
              id
            }
          }
        }
      `,
      variables() {
        return {
          reservationId: this.targetReservationId
        };
      },
      skip() {
        return this.targetReservationId == null;
      },
      update(data) {
        if (
          this.targetReservation &&
          this.targetReservation.id == this.targetReservationId
        ) {
          if (this.refetchReslover) {
            this.refetchReslover("OK");
          }
        }
        return data.reservation;
      }
    },
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
        data.doctor.currentQueue = data.doctor.currentQueue.filter(
          r => r.status == "queueing"
        );
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

<style>
#tb .v-toolbar__content {
  padding-left: 0;
  padding-right: 0;
}
</style>
