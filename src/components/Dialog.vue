<template>
  <!-- dialog -->
  <v-dialog :value="dialog" max-width="500px" @input="close">
    <v-card>
      <v-card-title>
        <span class="headline"><slot name="title"></slot></span>
      </v-card-title>

      <v-card-text>
          <slot name="content">
        
          </slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="button">

        </slot>
        <!-- <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click="save">Save</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
     dialog: "getDialog",
    })
  },

  methods:{
      ...mapActions([
      "actionCloseDialog",
    ]),


    close() {
      this.actionCloseDialog();
    },
  }
};
</script>