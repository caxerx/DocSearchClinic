<template>
  <full-screen-container v-if="timeslots">
    <div style="height:100%; width:100%; overflow-y: scroll" class="pa-4">
      <h3 class="headline mb-3 --text">Calendar Setting</h3>
      <v-btn class="mb-3" color="primary" outline @click="batchDeleteTimeslots">Delete all selected</v-btn>
      <v-btn class="mb-3" color="primary" outline>Batch add timeslots</v-btn>
      <div class="horizontal-container pa-3">
        <v-card
          height="450"
          width="300"
          class="weekday-card mr-3"
          v-for="(dayTimeslots, i) in timeslots"
          :key="i"
        >
          <v-card-title class="headline">
            {{ getWeekDay(daysArr[i]) }}
            <v-spacer></v-spacer>
            <v-btn icon @click="createTimeslot(i)">
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <div style="overflow-y: scroll; height: 369px">
            <template v-if="dayTimeslots.length > 0">
              <div v-for="(timeslot, j) in dayTimeslots" :key="j">
                <v-card-title class="py-1">
                  <v-checkbox
                    hide-details
                    class="pa-0 ma-0"
                    :key="timeslot.id"
                    @change="handleSelect($event, timeslot)"
                  ></v-checkbox>
                  <span>{{ timeslot.start }} - {{ timeslot.end }}</span>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="editTimeslot(timeslot)">
                    <v-icon color="info">edit</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteTimeslot(timeslot)">
                    <v-icon color="error">delete</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
              </div>
            </template>
            <v-card-text class="italic grey--text subheading" v-else>No timeslots is set today</v-card-text>
          </div>
        </v-card>
      </div>
    </div>
    <!-- Create/Edit timeslot -->
    <v-dialog v-model="editDialog" max-width="300" persistent>
      <v-card class="pa-3">
        <span class="headline mb-3" v-if="editMode">Edit Timeslot</span>
        <span class="headline mb-3" v-else>Create Timeslot</span>
        <v-layout column>
          <v-menu
            v-model="startTimeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="editingTimeslot.start" readonly label="Start time" v-on="on"></v-text-field>
            </template>
            <v-time-picker v-model="editingTimeslot.start" @input="startTimeMenu = false"></v-time-picker>
          </v-menu>
          <v-menu
            v-model="endTimeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="editingTimeslot.end" readonly label="End time" v-on="on"></v-text-field>
            </template>
            <v-time-picker v-model="editingTimeslot.end" @input="endTimeMenu = false"></v-time-picker>
          </v-menu>

          <v-btn @click="saveTimeslot" color="primary">Save</v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
    <!-- Delete confirm -->
    <v-dialog v-model="deleteDialog" max-width="300" persistent>
      <v-card class="pa-3">
        <v-layout column>
          <v-card-title class="pl-0 headline">Are you sure to delete this timeslot?</v-card-title>
          <v-card-text class="subheading">This cannot be undone.</v-card-text>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="executeDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Batch create -->
    <v-dialog v-model="batchCreateDialog" max-width="800">
      <v-card></v-card>
    </v-dialog>
    <!-- Batch delete -->
    <v-dialog v-model="batchDeleteDialog" max-width="540">
      <v-card class="pa-3">
        <v-layout column>
          <v-card-title class="pl-0 headline">Are you sure to delete all selected timeslots?</v-card-title>
          <v-card-text class="subheading">This cannot be undone.</v-card-text>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="batchDeleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="executeBatchDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar">{{ snackbarMessage }}</v-snackbar>
  </full-screen-container>
  <full-screen-container v-else>
    <v-layout fill-height justify-center align-center>
      <v-progress-circular width="5" size="50" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </full-screen-container>
</template>
<script>
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import gql from "graphql-tag";

export default {
  components: {
    "full-screen-container": FullScreenContainer
  },
  data() {
    return {
      snackbar: false,
      snackbarMessage: "",
      timeslots: null,
      editMode: false,
      editingTimeslot: {
        weekday: "mon",
        start: "09:00",
        end: "10:00"
      },
      deletingTimeslot: null,
      startTimeMenu: false,
      endTimeMenu: false,
      editDialog: false,
      deleteDialog: false,
      batchCreateDialog: false,
      batchDeleteDialog: false,
      selectedTimeslots: new Map(),
      daysArr: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
      daysMap: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      }
    };
  },
  methods: {
    showSnackbarMessage(message) {
      this.snackbar = false;
      setTimeout(() => {
        this.snackbarMessage = message;
        this.snackbar = true;
      }, 50);
    },
    createTimeslot(weekday) {
      this.editMode = false;
      let day = this.daysArr[weekday];
      this.editingTimeslot.weekday = day;
      this.editDialog = true;
    },
    editTimeslot(timeslot) {
      this.editMode = true;
      this.editingTimeslot = timeslot;
      this.editDialog = true;
    },
    async deleteTimeslot(timeslot) {
      this.deletingTimeslot = timeslot;
      this.deleteDialog = true;
    },
    async saveTimeslot() {
      if (this.editMode) {
        // Edit
        try {
          await this.$apollo.mutate({
            mutation: gql`
              mutation editTimeslot(
                $id: ID!
                $start: String!
                $end: String!
                $weekday: String!
                $doctorId: ID!
              ) {
                editTimeSlot(
                  id: $id
                  start: $start
                  end: $end
                  weekday: $weekday
                  doctorId: $doctorId
                ) {
                  id
                  start
                  end
                }
              }
            `,
            variables: {
              id: this.editingTimeslot.id,
              start: this.editingTimeslot.start,
              end: this.editingTimeslot.end,
              weekday: this.editingTimeslot.weekday,
              doctorId: this.$store.state.selectedDoctor
            }
          });
          this.showSnackbarMessage("Timeslot saved");
          await this.$apollo.queries.timeslots.refetch();
        } catch (err) {
          this.showSnackbarMessage("Error saving timeslot");
          console.dir(err);
        }
      } else {
        // Create
        try {
          await this.$apollo.mutate({
            mutation: gql`
              mutation editTimeslot(
                $start: String!
                $end: String!
                $weekday: String!
                $doctorId: ID!
              ) {
                createTimeSlot(
                  start: $start
                  end: $end
                  weekday: $weekday
                  doctorId: $doctorId
                ) {
                  id
                  start
                  end
                }
              }
            `,
            variables: {
              start: this.editingTimeslot.start,
              end: this.editingTimeslot.end,
              weekday: this.editingTimeslot.weekday,
              doctorId: this.$store.state.selectedDoctor
            }
          });
          this.showSnackbarMessage("Timeslot created");
          await this.$apollo.queries.timeslots.refetch();
        } catch (err) {
          this.showSnackbarMessage("Error creating timeslot");
          console.dir(err);
        }
      }

      this.editDialog = false;
    },
    batchCreateTimeslots() {},
    batchDeleteTimeslots() {
      this.batchDeleteDialog = true;
    },
    handleSelect(event, timeslot) {
      console.log(event, timeslot);
      if (event) {
        this.selectedTimeslots.set(timeslot.id, timeslot);
      } else {
        this.selectedTimeslots.delete(timeslot.id);
      }
    },
    async executeBatchDelete() {
      try {
        await Promise.all(
          [...this.selectedTimeslots.values()].map(timeslot =>
            this.$apollo.mutate({
              mutation: gql`
                mutation editTimeslot($id: ID!) {
                  removeTimeSlot(id: $id)
                }
              `,
              variables: {
                id: timeslot.id
              }
            })
          )
        );
        this.showSnackbarMessage("Timeslots deleted successfully");
        await this.$apollo.queries.timeslots.refetch();
      } catch (err) {
        this.showSnackbarMessage("Error batch deleting timeslots");
        console.dir(err);
      }
      this.batchDeleteDialog = false;
    },
    async executeDelete() {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation editTimeslot($id: ID!) {
              removeTimeSlot(id: $id)
            }
          `,
          variables: {
            id: this.deletingTimeslot.id
          }
        });
        this.showSnackbarMessage("Timeslot deleted");
        await this.$apollo.queries.timeslots.refetch();
      } catch (err) {
        this.showSnackbarMessage("Error deleting timeslot");
      }
      this.deleteDialog = false;
    },
    getWeekDay(day) {
      return this.daysMap[day];
    }
  },
  apollo: {
    timeslots: {
      query: gql`
        query getTimeslots($id: ID!) {
          doctor(id: $id) {
            timeSlots {
              id
              weekday
              start
              end
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$store.state.selectedDoctor
        };
      },
      update(data) {
        // console.log(data);
        let timeslots = data.doctor.timeSlots.sort((a, b) => {
          if (a.start < b.start) {
            return -1;
          }
          if (a.start > b.start) {
            return 1;
          }
          // equal
          return 0;
        });
        let dayTimeslot = [[], [], [], [], [], [], []];
        timeslots.forEach(ts => {
          dayTimeslot[this.daysArr.indexOf(ts.weekday)].push(ts);
        });
        return dayTimeslot;
      },
      error(err) {
        console.dir(err);
      }
    }
  },
  created() {}
};
</script>

<style>
.horizontal-container {
  overflow: auto;
  white-space: nowrap;
}
.weekday-card {
  display: inline-block;
}
</style>