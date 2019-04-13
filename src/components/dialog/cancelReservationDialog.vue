<template>
  <div v-if="dialog">
    <v-dialog :value="dialog" @input="cancelDialog()" width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >Are you sure delete this reservation ?</v-card-title>

        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Reservation by {{detail.patient.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{detail.date}} , {{detail.startTime}} for {{detail.duration}} mins</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- <v-list-tile v-for="(a,index) in patient.allergies" :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{a.name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{a.description}}</v-list-tile-sub-title>
          </v-list-tile-content>
          </v-list-tile>-->
        </v-list>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="cancelReservation(detail.rid)">Sure</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import gql from "graphql-tag";

const removeReservationMutation = gql`
  mutation( $id:ID! ) {
    removeReservation(id:$id)
  }
`;
export default {
  data() {
    return {
      loadingDialog:false
    };
  },
  components:{
    
  },
  computed: {
    ...mapGetters({
      getReservationListData: "getReservationListData"
    }),

    dialog() {
      console.log(this.getReservationListData.cancelDialog);
      return this.getReservationListData.cancelDialog;
    },
    detail() {
      return this.getReservationListData.detail;
    }
  },
  props: {},
  methods: {
    ...mapActions(["actionSetCancelDialogFromReservationList","actionSetIsCancelFromReservationList"]),
    cancelDialog() {
      this.actionSetCancelDialogFromReservationList(false);
    },
    cancelReservation(rid) {
      this.loadingDialog = true
      this.$apollo
        .mutate({
          // Query
          mutation: removeReservationMutation,
          // Parameters
          variables: {
            id:rid
          }
        })
        .then(data => {
          // Result
          this.loadingDialog = false
          this.actionSetIsCancelFromReservationList(true)
          this.cancelDialog();
        })
        .catch(error => {
          // Error
          console.error(error);
        });
    }
  }
};
</script>
