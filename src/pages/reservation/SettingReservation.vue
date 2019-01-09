<template>
  <container>
    <div slot="content">
      <h1>Period Setting</h1>
      <v-form ref="form" >
        <v-text-field
          type="number"
       
          messages="ex: 10 mins"
          label="average mins of hour"
        ></v-text-field>
        <v-text-field
          type="number"
          
          messages="ex: 9 hours"
          label="total working hours"
        ></v-text-field>
        <v-text-field
          type="number"
         
          messages="ex: start from 9 am"
          label="start working time"
        ></v-text-field>
        <br>
        <v-btn  small>submit</v-btn>
        <v-btn small>clear</v-btn>
      </v-form>
    </div>
  </container>
</template>

<script>
import SmallContainer from "@/components/SmallContainer.vue";
import Container from "@/components/Container.vue";
export default {
  components: {
    SmallContainer,
    Container
  }
};
</script>