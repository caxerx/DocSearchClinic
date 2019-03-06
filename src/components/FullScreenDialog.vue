<template>
  <v-layout >
    <v-dialog v-model="computedDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            <slot name="title"></slot>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <slot name="button"></slot>
            <!-- <v-btn dark flat @click="close">Save</v-btn> -->
          </v-toolbar-items>
        </v-toolbar>
        <container>
            <div slot="content">
            <slot name="content" id="dContent"></slot>
            </div>
        </container>
      </v-card>
    </v-dialog>

    <slot name="normalDialog"></slot>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import Container from "@/components/Container.vue";
export default {
  data() {
    return {};
  },
  components: {
    Container,
    
  },
  computed: {
    ...mapGetters({
      dialog: "getDialog"
    }),
      computedDialog(){
      return this.dialog.fullscreen
    }
  },
  methods: {
    ...mapActions(["actionCloseDialog"]),

    close() {
      this.actionCloseDialog("fullscreen");
    }
  }
};
</script>