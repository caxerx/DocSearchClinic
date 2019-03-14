<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
      <template>
          <v-btn color="primary" dark >
          </v-btn>
      </template>
  </v-dialog>
    </template>
<script>
export default {
  data: () => ({
    dialog: false
  })
};
</script>
