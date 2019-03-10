<template>
  <div id="doctorList">
    <h3 class="headline mb text">Doctors</h3>
    <v-btn flat value="0" color="grey">All Doctor</v-btn>
    <v-btn flat value="1" color="grey">Dr Michael Wong</v-btn>
    <v-btn flat value="2" color="grey">Dr Dennis Au Yeung</v-btn>

  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      search: "",
      doctorType: "",
      doctorList: 0
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      getter: "getMedicineRecord"
    })
  },

  methods: {
    toggleDoctorList() {
      this.doctorList = this.doctorList == 0 ? 1 : 0;
    }
  }
};
</script>

<style scoped>
    #doctorList{
        margin-left:5%
    }
</style>




