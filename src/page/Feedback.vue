<template>
  <full-screen-container>
    <div style="height:100%; width:100%" class="pa-4">
      <h3 class="headline mb-3 --text">Feedback</h3>
      <v-data-iterator :items="feedbacks" content-tag="v-layout" column>
        <template v-slot:item="props">
          <v-flex xs12>
            <v-card>
              <v-card-title>
                <v-avatar color="primary" class="mr-3">
                  <v-img
                    v-if="props.item.patient.avatar"
                    :src="getAvatar(props.item.patient.avatar)"
                  ></v-img>
                  <v-icon v-else dark>account_circle</v-icon>
                </v-avatar>
                <h4 class="subheading">{{ props.item.patient.name }}</h4>
                <v-spacer></v-spacer>
                <v-rating small readonly :value="props.item.rating"></v-rating>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <div>{{ props.item.comment }}</div>
                <div
                  class="mt-3 grey--text body-2 text-xs-right"
                >Posted at {{ getPostTime(props.item.postTime) }}</div>
              </v-card-text>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </div>
  </full-screen-container>
</template>
<script>
import FullScreenContainer from "@/component/FullScreenContainer.vue";
import { VLayout } from "vuetify";
import gql from "graphql-tag";
import moment from "moment";

export default {
  components: {
    "full-screen-container": FullScreenContainer,
    /* eslint-disable-next-line */
    "v-layout": VLayout
  },
  data() {
    return {
      feedbacks: []
    };
  },
  methods: {
    getAvatar(avatar) {
      return `https://dsapi.s1o.li/assets/avatars/${avatar}`;
    },
    getPostTime(time) {
      return moment(time).format("YYYY-MM-DD hh:mm:ss");
    }
  },
  apollo: {
    feedbacks: {
      query: gql`
        query getFeedbacks($doctorId: ID!) {
          doctor(id: $doctorId) {
            feedbacks {
              id
              rating
              patient {
                name
                avatar
              }
              comment
              postTime
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
        return data.doctor.feedbacks;
      }
    }
  },
  created() {}
};
</script>

