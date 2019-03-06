<template>
  <v-layout style="height:100%">
    <v-flex xs12>
      <!-- <v-flex xs12 sm10 offset-sm1> -->
      <div id="content">
        <v-flex xs12 sm10 offset-sm1 style="mar">
          <slot name="content"></slot>
        </v-flex>
      </div>
    </v-flex>
  </v-layout>
</template>

<style scoped>

#content {
  padding-top: 3%;
  height: 100%;
}

h1 {
  color: blue;
}
</style>

