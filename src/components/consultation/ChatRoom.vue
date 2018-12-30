<template>
  <v-card>
    <div id="chatroom"></div>
   

     <v-textarea
          outline
          name="input-7-4"
          label="Message"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea>
        <p class="text-xs-right">
     <v-btn class="btn">Send</v-btn>
      <v-btn class="btn">Clear</v-btn>
        </p>
  </v-card>
</template>

<style>
#chatroom {

  height: 300px;
  background-color: rgb(245, 245, 245);
 
}
.v-text-field__details{
    height:0px;
}

.btn{
 
}
</style>
