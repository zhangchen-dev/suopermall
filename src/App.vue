<template>
  <div id="app">
    <maintabbar></maintabbar>
    <router-view></router-view>
  </div>
</template>
<script>
import router from "./router/index";
import maintabbar from "./components/content/maintabbar.vue";

export default {
  name: "App",
  components: {
    maintabbar,
  },
  router,
};
</script>

<style scoped>
@import "assets/css/base.css";
</style>>
