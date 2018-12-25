<template>
  <div>
    <date-picker>
        <v-btn slot="btn1" color="primary" >submit</v-btn>
        <v-btn slot="btn2" color="primary" >clear</v-btn>
    </date-picker>
    <br/>
  </div>
</template>

<script>
import DatePicker from "../DatePicker.vue";

export default {
  components: {
    DatePicker
  }
};
</script>