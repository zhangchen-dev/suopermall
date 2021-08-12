<template>
  <div>
    <nav-bar>
      <div slot="left" class="back-img" @click="backClick">
        <img src="~assets/img/detail/fanhui.png" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="item"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div></nav-bar
    >
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "detailnavbar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: { NavBar },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.title {
  display: flex;
  font-size: 14px;
}
.title .item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back-img {
  margin-left: 4px;
  width: 46px;
}
.back-img img {
  width: 100%;
}
</style>
