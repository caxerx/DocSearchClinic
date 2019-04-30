<template>
  <v-flex xs4>
    <v-layout fill-height column style="overflow: hidden">
      <v-flex xs6>
        <div style="height: 100%; background-color:black;">
          <div
            style="position: absolute; font-weight:bold; text-shadow: 0px 0px 1px white, 0px 0px 2px white, 0px 0px 3px white; padding:20px;"
            class="black--text headline"
          >Neutral</div>
          <div
            style="position: absolute; right:10px; top: calc( 50vh - 50px - 32px - 10px); z-index:10; height:100px; width:150px; background-color:white"
            class="black--text headline"
            id="preview"
          ></div>
          <div style="height:100%; width: 100%; background:white" id="div"></div>
        </div>
      </v-flex>
      <v-flex xs6>
        <div style="height: calc(50vh - 81px); width:100%; overflow-y:scroll" ref="chat">
          <v-timeline dense clipped class="ml-4" style="min-height:100%;">
            <v-timeline-item v-for="i in messages" :key="i.time" class="mr-3" large>
              <template v-slot:icon>
                <v-avatar>
                  <v-icon class="white" v-if="i.avatar==''">account_circle</v-icon>
                  <v-img :src="getAvatar(i.avatar)" v-else/>
                </v-avatar>
              </template>
              <v-layout justify-space-between>
                <v-flex xs9 style="word-wrap: break-word" v-text="i.message" v-if="i.type=='text'"></v-flex>
                <v-flex xs9 style="word-wrap: break-word" v-if="i.type=='image'">
                  <v-img :src="`https://dsapi.1lo.li${i.file.uri}`"></v-img>
                </v-flex>
                <v-flex xs9 style="word-wrap: break-word" v-if="i.type=='file'">
                  <v-icon>description</v-icon>
                  <a
                    :href="`https://dsapi.1lo.li${i.file.uri}`"
                    :download="i.fileName"
                  >{{i.fileName}}</a>
                </v-flex>
                <v-flex xs3 text-xs-right class="grey--text">{{getTimeDisplay(i.time)}}</v-flex>
              </v-layout>
              <div class="mb-3"></div>
            </v-timeline-item>
          </v-timeline>
        </div>
        <v-divider></v-divider>
        <div style="height: 48px">
          <v-form @submit.prevent="sendText">
            <v-text-field
              solo
              hide-details
              single-line
              prepend-icon="description"
              :append-icon="sendIcon"
              @click:append="sendText"
              @click:prepend="uploadClicked"
              class="ml-2"
              v-model="messageText"
            ></v-text-field>
            <input type="file" ref="input" @change="upload" hidden>
          </v-form>
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
import gql from "graphql-tag";
import Video from "twilio-video";
import moment from "moment";
export default {
  props: { patientId: String, consultationId: String },
  mounted() {
    if (this.$store.state.userId == -1) {
      return;
    }
    this.setPreview();
    this.getTokenAndConnect();
  },
  computed: {
    sendIcon() {
      return this.messageSending ? "" : "send";
    },
    emotionColor() {
      return "rgba(255,0,0,0.5)";
    }
  },
  data() {
    return {
      emotion: "",
      messages: [],
      messageText: "",
      previewTracks: null
    };
  },
  methods: {
    setPreview() {
      var localTracksPromise = this.previewTracks
        ? Promise.resolve(this.previewTracks)
        : Video.createLocalTracks();

      localTracksPromise.then(
        function(tracks) {
          for (let track of tracks) {
            let div = document.getElementById("preview");
            div.appendChild(track.attach());
          }
        },
        function(error) {
          console.error("Unable to access local media", error);
          log("Unable to access Camera and Microphone");
        }
      );
    },
    async getTokenAndConnect() {
      let data = await this.$apollo.mutate({
        mutation: gql`
          mutation getVideoToken(
            $consultationId: ID!
            $userId: ID!
            $userType: VideoUser!
          ) {
            getVideoToken(
              consultationId: $consultationId
              userId: $userId
              userType: $userType
            ) {
              success
              token
            }
          }
        `,
        variables: {
          consultationId: this.consultationId,
          userId: this.$store.state.userId,
          userType: "doctor"
        }
      });
      if (data.data.getVideoToken.token) {
        console.log(data.data.getVideoToken.token);
        this.connect(data.data.getVideoToken.token);
      }
    },
    connect(token) {
      Video.connect(token, { name: `${this.consultationId}` }).then(room => {
        console.log('Connected to Room "%s"', room.name);

        room.participants.forEach(this.participantConnected);
        room.on("participantConnected", this.participantConnected);

        room.on("participantDisconnected", this.participantDisconnected);
        room.once("disconnected", error =>
          room.participants.forEach(this.participantDisconnected)
        );
      });
    },
    participantConnected(participant) {
      console.log('Participant "%s" connected', participant.identity);

      const div = document.createElement("div");
      div.id = participant.sid;
      div.classList.add("bigger");

      participant.on("trackSubscribed", track =>
        this.trackSubscribed(div, track)
      );
      participant.on("trackUnsubscribed", this.trackUnsubscribed);

      participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
          this.trackSubscribed(div, publication.track);
        }
      });

      document.getElementById("div").appendChild(div);
    },
    participantDisconnected(participant) {
      console.log('Participant "%s" disconnected', participant.identity);
      document.getElementById(participant.sid).remove();
    },
    trackSubscribed(div, track) {
      div.appendChild(track.attach());
    },
    trackUnsubscribed(track) {
      track.detach().forEach(element => element.remove());
    },
    uploadClicked() {
      this.$refs.input.click();
    },
    upload() {
      let reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result.startsWith("data:image")) {
          let file = this.$refs.input.files[0];
          this.sendImage(file, file.name);
          return;
        }

        let file = this.$refs.input.files[0];
        this.sendFile(file, file.name);
      };
      this.file = this.$refs.input.files[0];
      reader.readAsDataURL(this.file);
    },
    sendImage(img) {
      let msg = {
        type: "image",
        message: img,
        avatar: this.$store.state.avatar
      };
      this.sendFile_(msg, img);
    },
    sendFile(file, filename) {
      let msg = {
        type: "file",
        message: file,
        avatar: this.$store.state.avatar,
        fileName: filename
      };
      this.sendFile_(msg, file);
    },
    sendText() {
      if (this.messageSending || this.messageText == "") {
        return;
      }
      let msg = {
        type: "text",
        message: this.messageText,
        avatar: this.$store.state.avatar
      };
      this.send(msg);
      this.messageText = "";
    },
    async send(msg) {
      msg = JSON.stringify(msg);
      this.messageSending = true;
      await this.$apollo.mutate({
        mutation: gql`
          mutation sendChatMessage($message: String!, $consultationId: ID!) {
            sendChatMessage(
              message: $message
              consultationId: $consultationId
            ) {
              success
              message
            }
          }
        `,
        variables: {
          message: msg,
          consultationId: this.consultationId
        }
      });
      this.messageSending = false;
    },
    async sendFile_(msg, file) {
      msg = JSON.stringify(msg);
      this.messageSending = true;
      await this.$apollo.mutate({
        mutation: gql`
          mutation sendChatMessage(
            $message: String!
            $consultationId: ID!
            $upload: Upload!
          ) {
            sendChatMessage(
              message: $message
              consultationId: $consultationId
              file: $upload
            ) {
              success
              message
            }
          }
        `,
        variables: {
          message: msg,
          consultationId: this.consultationId,
          upload: file
        }
      });
      this.messageSending = false;
    },
    getTimeDisplay(time) {
      return moment(time).format("HH:mm");
    },
    getAvatar(i) {
      return this.$store.state.avatarBase + i;
    }
  },
  apollo: {
    $subscribe: {
      messageReceive: {
        query: gql`
          subscription messageRecieve($id: ID!) {
            onChatMessage(consultationId: $id) {
              message
              file {
                name
                uri
              }
            }
          }
        `,
        variables() {
          return {
            id: this.consultationId
          };
        },
        result(data) {
          console.log(data);
          let dtx = data.data.onChatMessage.file;
          data = data.data.onChatMessage.message;
          let msg = JSON.parse(data);
          msg.file = dtx;
          msg.time = +moment();
          this.messages.push(msg);
          setTimeout(() => {
            this.$refs.chat.scrollTo({
              top: this.$refs.chat.scrollHeight,
              behavior: "smooth"
            });
          }, 20);
        }
      }
    }
  }
};
</script>
<style>
.bigger {
  height: 100%;
  width: 100%;
}
video {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>