<template>
  <div>
    <div v-if="!btnClick">
      <v-btn color="red" @click="login">Login</v-btn>
    </div>
    <div v-else>
      <router-view/>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data: () => ({
    btnClick: false
  }),

  computed: {
    ...mapGetters({
      isSuccess: "getIsSuccess"
    })
  },

  methods: {
    login() {
      this.btnClick= true;
      this.$router.push("/login");
    }
  }
};
</script>