<template>
  <div>
    <h2>我时profile组件</h2>
    <h3>{{ $route.query.name }}</h3>
  </div>
</template>
<script>
export default {
  name: "profile",
  activated() {
    // this.$router.push(this.path);
    console.log("profile活跃");
    // this.$router = this.$route.path;
  },
  deactivated() {
    console.log("profile不活跃");
  },
};
</script>
<style scoped>
</style>