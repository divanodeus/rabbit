<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "app",

  created() {
    this.$store.dispatch("getCompanies");
    this.$store.dispatch("getDepartments");
    this.$store.dispatch("getProjects");
  }
};
</script>
