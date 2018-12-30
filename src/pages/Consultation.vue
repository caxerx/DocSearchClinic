<template>
  <container id="container">
    <div slot="content">
      <h1>Online Consulatation</h1><br/><br/>
      <v-layout>
        <v-flex xs3>
          <user-profile/>
        </v-flex>
        <v-flex xs8>
          <chat-room/>
        </v-flex>
      </v-layout>
    </div>
  </container>
</template>


<script>
import axios from "axios";
import Container from "@/components/Container.vue";
import UserProfile from "@/components/consultation/UserProfile.vue";
import ChatRoom from "@/components/consultation/ChatRoom.vue";

export default {
  data: () => ({}),

  components: {
    Container,
    UserProfile,
    ChatRoom
  },

  methods: {
    submit() {},
    clear() {}
  }
};
</script>

<style>
#container {
}
</style>