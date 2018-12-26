<template>
  <div>
    <div v-if="isSuccess">
      <drawer/>
    </div>
    <div v-else>
      <home/>
    </div>
  </div>
</template>

<script>
import Login from "./pages/Login.vue";
import Home from "./pages/Home.vue";
import Drawer from "./components/Drawer.vue";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "App",
  components: {
    Drawer,
    Login,
    Home,
  },

  computed: {
    ...mapGetters({
      isSuccess: "getIsSuccess"
    })
  },

  data: () => ({})
};
</script>
