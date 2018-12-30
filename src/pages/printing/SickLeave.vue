<template>
  
      <container>
           <div slot="content">
    <logo/>
    <v-card>
      <v-card-text>
        <p class="text-sm-left"></p>
        <p class="text-lg-left">
          <v-flex md3>
            <v-text-field label="Date"></v-text-field>
          </v-flex>
        </p>
        <h1 style="    text-align: center;">Sick Leave Certified</h1>
        <v-flex xs12>
          <v-textarea
            solo
            name="input-7-4"
            label="Solo textarea"
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          ></v-textarea>
          <br>
          <br>
          <br>
          <br>
          <br>
        </v-flex>
        <p class="text-xs-right">Signature</p>
      </v-card-text>
    </v-card>
    <v-btn>PRINT</v-btn>
  </div>
      </container>
</template>

<script>
import Logo from "@/components/Logo.vue";
import Container from "@/components/Container.vue";

export default {
  components: {
    Logo,
    Container
  }
};
</script>
