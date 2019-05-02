<template>
  <v-flex xs4>
    <v-layout fill-height column style="overflow: hidden">
      <v-flex xs6>
        <div style="height: calc( 50vh - 64px ); background-color:black;">
          <div
            style="position: absolute; font-weight:bold; text-shadow: 0px 0px 1px white, 0px 0px 2px white, 0px 0px 3px white; padding:20px;text-transform: capitalize;"
            class="black--text headline"
          >{{emo}}</div>
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
          <v-divider></v-divider>
          <v-list dense class="ml-4" style="min-height:100%;" two-line>
            <div v-for="i in messages" :key="i.time">
              <v-list-tile class="mr-3">
                <v-list-tile-content>
                  <v-list-tile-title v-if="i.type=='text'">{{i.message}}</v-list-tile-title>
                  <v-list-tile-title v-else>
                    <v-icon>description</v-icon>
                    <a
                      :href="`https://dsapi.1lo.li${i.file.uri}`"
                      :download="i.fileName"
                    >{{i.file.name}}</a>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>By {{i.avatar}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
            </div>
          </v-list>
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
import axios from "axios";
export default {
  props: { patientId: String, consultationId: String },
  mounted() {
    if (this.$store.state.userId == -1) {
      return;
    }
    this.setPreview();
    this.getTokenAndConnect();
    this.dtabc = setInterval(() => {
      if (this.lastVt) {
        this.capture();
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.dtabc);
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
      dtabc: null,
      emotion: "",
      messages: [],
      messageText: "",
      previewTracks: null,
      lastVt: null,
      emo: "face not detected",
      curl:
        "https://eastasia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion",
      tkn: "4c2da3240f8649c5a264a89058a7d51f"
    };
  },
  methods: {
    async capture() {
      console.log("1");
      let canvas = document.createElement("canvas");
      console.log(this.lastVt);
      canvas.width = this.lastVt.videoWidth;
      canvas.height = this.lastVt.videoHeight;
      canvas.getContext("2d").drawImage(this.lastVt, 0, 0);
      // Other browsers will fall back to image/png
      let b = this._base64ToArrayBuffer(canvas.toDataURL("image/jpeg"));
      let b2 = new Blob([b], { type: "image/jpeg" });
      let dt = await axios.post(this.curl, b2, {
        headers: {
          "Ocp-Apim-Subscription-Key": this.tkn,
          "Content-Type": `application/octet-stream`
        }
      });
      if (dt.data.length == 0) {
        this.emo = "face not detected";
      } else {
        let fc = dt.data[0]["faceAttributes"]["emotion"];
        let max = "face not detected";
        let maxv = -9999999;
        Object.keys(fc).forEach(a => {
          if (fc[a] > maxv) {
            max = a;
            maxv = fc[a];
          }
        });
        this.emo = max;
      }
    },
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
    _base64ToArrayBuffer(base64) {
      base64 = base64.replace("data:image/jpeg;base64,", "");
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
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
      let trk = track.attach();
      if (trk.tagName == "VIDEO") {
        console.log("lvt");
        this.lastVt = trk;
      }
      div.appendChild(trk);
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
        avatar: "Doctor"
      };
      this.sendFile_(msg, img);
    },
    sendFile(file, filename) {
      let msg = {
        type: "file",
        message: file,
        avatar: "Doctor",
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
        avatar: "Doctor"
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
}
</style>