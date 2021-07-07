<template>
  <div class="tabbar" @click="itemclick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "tabbarItem",
  props: {
    link: String,
    activeColor: {
      type: String,
      dafault: "red",
    },
  },
  // data() {
  //   return {
  //     isActive: true,
  //   };
  // },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) !== -1; //判断当前活跃的路径是否是我现在的路径吗
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemclick() {
      // console.log(this.link);
      // console.log(this.$router);
      this.$router.push(this.link);
    },
  },
};
</script>
<style scoped>
.tabbar {
  flex: 1;
  text-align: center;
  height: 49px;
}
.item-text {
  font-size: 14px;
  color: #000;
}
.tabbar img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
.activeColor {
  color: red;
}
</style>