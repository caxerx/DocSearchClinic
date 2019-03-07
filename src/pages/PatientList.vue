<template>
<container>
  <div slot="content"> 
       
      <h1>Patient List</h1><br/>
       <v-layout row wrap>
        <v-flex xs4>
        </v-flex>
       </v-layout>
    <!-- list  -->
    <list/>
    
  </div>
</container>
</template>


<script>
import List from '@/components/patientList/List.vue'
import Container from '@/components/Container.vue'


export default {
  data: () => ({
   
  }),

 components: {
    List,
    Container,
    
    
    
  },

  computed: {
    
  },

  watch: {
    
  },

  created() {
  },

  methods: {
    
    
  }
};
</script>