<template>
  <normal-dialog>
    <div slot="title">Edit Item</div>

    <div slot="content">
      <v-form>
        <v-text-field prepend-icon="person" v-model="name" label="Name"></v-text-field>
        <v-select
          prepend-icon="toc"
          :items="statusList"
          label="Status"
          v-model="status"
          data-vv-name="select"
          required
        ></v-select>
      </v-form>
    </div>
    <div slot="button">
      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
    </div>
  </normal-dialog>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import DatePicker from "./DatePicker.vue";
import NormalDialog from "@/components/Dialog.vue";

export default {
  data: () => ({
    dialogType: "",
    search: ""
  }),

  computed: {
    ...mapGetters({
      reservationListData: "getReservationListData",
      reservationData: "getReservationData"
    }),

    $state() {
      return this.$store.state.queue.queueData;
    },

    name: {
      get() {
        return this.$state.editedItem.name;
      },
      set(name) {}
    },


    statusList() {
      return this.$state.defaultItem.status;
    },

    status: {
      get() {
        var status = this.$state.editedItem.status;
        return status;
      },
      set(status) {}
    },

  },

  components: {
    NormalDialog,
    DatePicker
  },

  methods: {
    ...mapActions([
      "actionEditItemFromReservationList",
      "actionCloseDialog",
      "actionSaveItemFromReservationList",
      "actionApprovalItemFromReservationList",
      "actionViewAllergy",
      "actionOpenDialog"
    ]),
    close() {
      this.actionCloseDialog("normal");
    },

    save() {
      console.log(
        this.name + " " + this.date + " " + this.time + " " + this.status
      );
      //   this.actionSaveItemFromReservationList();
    }
  }
};
</script>
