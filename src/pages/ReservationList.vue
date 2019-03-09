<template>
<container>
  <div slot="content"> 
       
      <calendar/>
    
  </div>
</container>
</template>


<script>

import Container from '@/components/Container.vue'
import Calendar from '@/components/reservationList/Calendar.vue'


export default {
  data: () => ({
   
  }),

 components: {
    Container,
    Calendar
    
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