<template>
  <queue-dialog>
    <div slot="title">Edit Item</div>
        
    <div slot="content">
      
    </div>
    <div slot="button">
      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
    </div>
  </queue-dialog>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import QueueDialog from "@/components/Dialog.vue";

export default {
  data: () => ({
    dialogType: "",
    search: ""
  }),

  components:{
      QueueDialog
  },

  methods: {
    ...mapActions([
      "actionEditItemFromQueue",
      "actionCloseDialog",
      "actionSaveItemFromQueue",
      "actionApprovalItemFromQueue",
      "actionViewAllergy",
      "actionOpenDialog"
    ]),
    close() {
      this.actionCloseDialog();
    },

    save() {
      this.actionSaveItemFromQueue();
    }
  }
};
</script>
