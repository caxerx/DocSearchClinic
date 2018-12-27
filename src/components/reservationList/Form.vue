<template>
  <div>
    <double-date-picker>
        <v-btn slot="btn1" color="primary"  >submit</v-btn>
        <!-- <v-btn slot="btn2" color="primary" >clear</v-btn> -->
    </double-date-picker>
    <br/>
  </div>
</template>

<script>
import DoubleDatePicker from "./DoubleDatePicker.vue";

export default {
  components: {
    DoubleDatePicker
  }
};
</script>