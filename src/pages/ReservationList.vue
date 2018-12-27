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
import DataTable from '@/components/reservationList/ReservationListTable.vue'
import DataPickerForm from '@/components/reservationList/Form.vue'
import Container from '@/components/Container.vue'


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