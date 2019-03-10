<template>

  <v-breadcrumbs :items="breadcrumbList">
    <template v-slot:divider>
      <v-icon>forward</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadcrumbList: []
    };
  },
  mounted() {
    this.updateList();
  },
  watch: {
    $route() {
      this.updateList();
    }
  },
  methods: {
    routeTo(pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link)
        this.$router.push(this.breadcrumbList[pRouteTo].link);
    },
    updateList() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
      console.log(this.breadcrumbList);
    }
  }
};
</script>

