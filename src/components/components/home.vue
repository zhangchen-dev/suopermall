<template>
  <div>
    <h2>我是首页</h2>
    <p>我是内容，哈哈哈</p>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      path: "/home/news",
    };
  },
  // 生命周期函数
  created() {
    // document.title = "首页";
    console.log("home创建");
  },
  destroyed() {
    console.log("home销毁");
  },
  beforeRouteLeave(to, from, next) {
    console.log(this.$route.path);
    this.path = this.$route.path;
    next();
  },

  // 下面这两个函数在将其租组件添加在keep-alive包裹时才会处于调用状态；
  activated() {
    this.$router.push(this.path);
    console.log("home不活跃");
    // this.$router = this.$route.path;
  },
  deactivated() {
    console.log("home不活跃");
  },
};
</script>

<style scoped>
</style>