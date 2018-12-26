<template>
<container>
  <div slot="content"> 
       
      <h1>Reservation List</h1><br/>
    <data-picker-form/>
    <!-- table  -->
    <data-table/>
    
  </div>
</container>
</template>


<script>
import DataTable from '@/components/queue/ReservationListTable.vue'
import DataPickerForm from '@/components/queue/DatePickerForm.vue'
import Container from '@/components/Container.vue'
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  data: () => ({
   
  }),

 components: {
    DataTable,
    Container,
    DataPickerForm,
    
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