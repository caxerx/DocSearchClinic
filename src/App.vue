<template>
  <div>
    <div v-if="isSuccess">
      <nav-bar/>
    </div>
    <div v-else>
      <login/>
    </div>
  </div>
</template>

<script>
import Login from "./pages/Login.vue";
import NavBar from "./components/NavBar.vue";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "App",
  components: {
    NavBar,
    Login
  },

  computed: {
    ...mapGetters({
      isSuccess: "getIsSuccess"
    })
  },

  data() {
    return {
      //
    };
  }
};
</script>
