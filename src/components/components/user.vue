<template>
  <div>
    <p>我是用户界面</p>
    <p>hahahah</p>
    <div>{{ userId }}</div>
  </div>
</template>
<script>
export default {
  name: "user",
  // created() {
  //   document.title = "用户";
  // },
  activated() {
    // this.$router.push(this.path);
    console.log("user活跃");
    // this.$router = this.$route.path;
  },
  deactivated() {
    console.log("user不活跃");
  },
  computed: {
    userId() {
      return this.$route.params.userId;
    },
  },
};
</script>

