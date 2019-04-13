<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Clincal Notes</v-toolbar-title>
    </v-toolbar>

    <v-card flat>
      <v-card-text>
        <v-textarea name="input-7-1" label="Descriptions" outline background-color="grey" :value="note"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="cancelShow()">Cancel</v-btn>
        <v-btn>Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:{
    note: String
  },
  methods: {
    cancelShow() {
     this.$emit('input',false);
    }
  }
};
</script>
