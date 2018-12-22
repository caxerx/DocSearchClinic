<template>
  <div>
    <div v-if="isSuccess">
      <drawer/>
    </div>
    <div v-else>
      <login/>
    </div>
  </div>
</template>

<script>
import Login from "./pages/Login.vue";
import Drawer from "./components/Drawer.vue";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "App",
  components: {
    Drawer,
    Login
  },

  computed: {
    ...mapGetters({
      isSuccess: "getIsSuccess"
    })
  },

  data: () => ({})
};
</script>
