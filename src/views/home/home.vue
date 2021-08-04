<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" />
    <home-recommend-view :recommends="recommends" />
    <feature-view />
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childrencomponents/Homeswiper.vue";
import HomeRecommendView from "./childrencomponents/HomeRecommendView.vue";
import FeatureView from "./childrencomponents/FeatureView.vue";

import { getHomeMutlidata } from "network/home";

export default {
  name: "home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    getHomeMutlidata().then((res) => {
      // console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>
<style scoped>
#home {
  margin-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 9;
}
</style>