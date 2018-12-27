<template>
<container>
  <div slot="content"> 
       
      <h1>Online Queue List</h1><br/>
       <v-layout row wrap>
        <v-flex xs4>
    <date-picker/>
        </v-flex>
       </v-layout>
    <!-- table  -->
    <data-table/>
    
  </div>
</container>
</template>


<script>
import DataTable from '@/components/queue/Table.vue'
import DatePicker from '@/components/queue/DatePicker.vue'
import Container from '@/components/Container.vue'


export default {
  data: () => ({
   
  }),

 components: {
    DataTable,
    Container,
    DatePicker,
    
    
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