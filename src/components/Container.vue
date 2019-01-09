<template>
  <v-layout style="height:100%">
    <v-flex xs12>
      <!-- <v-flex xs12 sm10 offset-sm1> -->
      <v-card id="vcard">
        <v-flex xs12 sm10 offset-sm1 style="mar">
          <div id="content">
          <slot name="content"></slot>
          </div>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style>
#vcard {
  margin-top: 3%;
  height: 100%;
  
}

#content{
  padding-top:3%;
}

h1{
  color:blue;
}

</style>

