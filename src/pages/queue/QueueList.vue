<template>
<container>
  <div slot="content"> 
       
      <h1>Queue List</h1><br/>
  
    <!-- table  -->
    <data-table/>
    
  </div>
</container>
</template>


<script>
import DataTable from '@/components/queue/Table.vue'

import Container from '@/components/Container.vue'
import { mapGetters, mapActions, mapState } from "vuex";

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