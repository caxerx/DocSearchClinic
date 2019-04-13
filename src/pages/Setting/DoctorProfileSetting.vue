<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm4>
        <div v-if="imageUrl===''">
            <v-layout align-center justify-center row wrap style="height:300px">
            <!-- <img src="@/assets/upload.png" height="50" /> -->
                Select the doctor icon
            </v-layout>
        </div>
        <img :src="imageUrl" height="300">
        <input type="file" ref="avator" accept="image/*" @change="onFilePicked">
      </v-flex>
      <v-flex sm8>
        Dr {{getSelectDoctor.name}}
        <br>
        id {{getSelectDoctor.id}}
        <br>
        <v-btn color="primary" class="white--text" @click="upload()">
          Upload
          <v-icon right>cloud_upload</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import gql from "graphql-tag";

const uplodaAvatorMutation = gql`
  mutation($file: Upload!, $doctorId: ID!) {
    uploadDoctorAvatar(file: $file, doctorId: $doctorId) {
      filename
      success
      message
      mimetype
    }
  }
`;
export default {
  data() {
    return {
      avator: "",
      imageName: "",
      imageUrl: "",
      imageFile: ""
    };
  },
  computed: {
    ...mapGetters({
      getSelectDoctor: "getSelectDoctor"
    })
  },
  methods: {
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },

    upload() {
        this.$apollo
          .mutate({
            // Query
            mutation: uplodaAvatorMutation,
            // Parameters
            variables: {
              file: this.imageFile,
              doctorId: this.getSelectDoctor.id
            }
          })
          .then(data => {
            // Result
            console.log(data);
          })
          .catch(error => {
            // Error
            console.error(error);
          });
    }
  }
};
</script>
