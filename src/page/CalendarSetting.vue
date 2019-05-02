<template>
  <full-screen-container v-if="timeslots">
    <div style="height:100%; width:100%; overflow-y: scroll" class="pa-4">
      <h3 class="headline mb-3 --text">Calendar Setting</h3>
      <v-btn
        class="mb-3"
        color="primary"
        outline
        @click="batchDeleteTimeslots"
        :disabled="!canBatchDelete"
      >Delete selected timeslots</v-btn>
      <v-btn
        class="mb-3"
        color="primary"
        outline
        @click="batchCreateDialog = true"
      >Batch create timeslots</v-btn>
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
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="editDialog = false" flat>Cancel</v-btn>
          <v-btn @click="saveTimeslot" color="primary">Save</v-btn>
        </v-card-actions>
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
    <v-dialog v-model="batchCreateDialog" max-width="1000">
      <v-card class="pa-3">
        <v-card-title class="pl-0 headline">Batch create timeslots</v-card-title>
        <v-layout row>
          <v-flex xs6>
            <span class="pl-0 subheading">Weekday</span>
            <v-layout row wrap pa-3>
              <v-flex xs4>
                <v-checkbox hide-details v-model="batchDays.sun" label="Sunday"></v-checkbox>
              </v-flex>
              <v-flex xs4>
                <v-checkbox hide-details v-model="batchDays.mon" label="Monday"></v-checkbox>
              </v-flex>
              <v-flex xs4>
                <v-checkbox hide-details v-model="batchDays.tue" label="Tuesday"></v-checkbox>
              </v-flex>
              <v-flex xs4>
                <v-checkbox hide-details v-model="batchDays.wed" label="Wednesday"></v-checkbox>
              </v-flex>
              <v-flex xs4>
                <v-checkbox hide-details v-model="batchDays.thu" label="Thursday"></v-checkbox>
              </v-flex>
              <v-flex xs4>
                <v-checkbox hide-details v-model="batchDays.fri" label="Friday"></v-checkbox>
              </v-flex>
              <v-flex xs4>
                <v-checkbox hide-details v-model="batchDays.sat" label="Saturday"></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-card>
              <v-card-title>
                <span class="subheading">Timeslots</span>
                <v-spacer></v-spacer>
                <v-btn @click="batchCreateSingleDialog = true" icon>
                  <v-icon>add</v-icon>
                </v-btn>
              </v-card-title>

              <v-divider></v-divider>
              <v-list>
                <v-list-tile v-for="(timeslot, i) in batchTimeslots" :key="i">
                  <v-layout align-center>
                    <span>{{ timeslot.start }} - {{ timeslot.end }}</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="removeFromList(i)">
                      <v-icon color="error">delete</v-icon>
                    </v-btn>
                  </v-layout>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="resetBatchCreate">Cancel</v-btn>
          <v-btn color="primary" :disabled="!batchVaild" @click="executeBatchCreate">Create</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="batchCreateSingleDialog" max-width="400">
        <v-card class="pa-3">
          <v-menu
            ref="batchStart"
            v-model="batchCreateSingleStartMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="batchCreateSingleStart"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="batchCreateSingleStart" label="Start time" readonly v-on="on"></v-text-field>
            </template>
            <v-time-picker v-model="batchCreateSingleStart">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="batchCreateSingleStartMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.batchStart.save(batchCreateSingleStart)">OK</v-btn>
            </v-time-picker>
          </v-menu>
          <v-menu
            ref="batchEnd"
            v-model="batchCreateSingleEndMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="batchCreateSingleEnd"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="batchCreateSingleEnd" label="End time" readonly v-on="on"></v-text-field>
            </template>
            <v-time-picker v-model="batchCreateSingleEnd">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="batchCreateSingleEndMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.batchEnd.save(batchCreateSingleEnd)">OK</v-btn>
            </v-time-picker>
          </v-menu>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="batchCreateSingleDialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="addToList">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      batchDays: {
        sun: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false
      },
      batchTimeslots: [],
      canBatchDelete: false,
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
      batchCreateSingleDialog: false,
      batchCreateSingleStart: "09:00",
      batchCreateSingleStartMenu: false,
      batchCreateSingleEnd: "09:30",
      batchCreateSingleEndMenu: false,
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
  computed: {
    batchVaild() {
      let valid = false;
      // Check selected days
      for (let i in this.batchDays) {
        if (this.batchDays[i]) valid = true;
      }
      return this.batchTimeslots.length > 0 && valid;
    }
  },
  methods: {
    addToList() {
      this.batchTimeslots.push({
        start: this.batchCreateSingleStart,
        end: this.batchCreateSingleEnd
      });
      this.batchCreateSingleDialog = false;
    },
    removeFromList(index) {
      this.batchTimeslots.splice(index, 1);
    },
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
      this.editingTimeslot = {};
      this.editingTimeslot.weekday = day;
      this.editingTimeslot.start = "09:00";
      this.editingTimeslot.end = "09:30";
      this.editDialog = true;
    },
    editTimeslot(timeslot) {
      this.editMode = true;
      this.editingTimeslot = Object.assign({}, timeslot);
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
              mutation createTimeslot(
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
    batchCreateTimeslots() {
      this.batchCreateDialog = true;
    },
    batchDeleteTimeslots() {
      this.batchDeleteDialog = true;
    },
    resetBatchCreate() {
      this.batchDays = {
        sun: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false
      };
      this.batchTimeslots = [];
      this.batchCreateDialog = false;
    },
    handleSelect(event, timeslot) {
      // console.log(event, timeslot);
      if (event) {
        this.selectedTimeslots.set(timeslot.id, timeslot);
      } else {
        this.selectedTimeslots.delete(timeslot.id);
      }
      this.canBatchDelete = this.selectedTimeslots.size > 0;
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
    async executeBatchCreate() {
      let timeslots = [];
      for (let i in this.batchDays) {
        if (this.batchDays[i]) {
          for (let j of this.batchTimeslots) {
            timeslots.push({
              weekday: i,
              ...j
            });
          }
        }
      }
      try {
        await Promise.all(
          timeslots.map(timeslot =>
            this.$apollo.mutate({
              mutation: gql`
                mutation createTimeslot(
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
                ...timeslot,
                doctorId: this.$store.state.selectedDoctor
              }
            })
          )
        );
        this.showSnackbarMessage("Timeslots created successfully");
        await this.$apollo.queries.timeslots.refetch();
      } catch (err) {
        this.showSnackbarMessage("Error batch creatting timeslots");
        console.dir(err);
      }
      this.resetBatchCreate();
      // console.log(timeslots);
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