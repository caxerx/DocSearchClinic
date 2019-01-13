<template>
<container>
  <div slot="content"> 
       
      <h1>Patient List</h1><br/>
       <v-layout row wrap>
        <v-flex xs4>
        </v-flex>
       </v-layout>
    <!-- table  -->
    <data-table/>
    
  </div>
</container>
</template>


<script>
import DataTable from '@/components/patientList/Table.vue'
import Container from '@/components/Container.vue'


export default {
  data: () => ({
   
  }),

 components: {
    DataTable,
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