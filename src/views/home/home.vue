<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" />
    <home-recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tabcontrol"
      @tabClick="tabClick"
    />
    <scroll class="scroll" ref="scroll" :probe-type="3" @scroll="contentscroll">
      <goods-list :goods="showgoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isshowBT" />
  </div>
</template>
<script>
// 本地位置组件
import HomeSwiper from "./childrencomponents/Homeswiper.vue";
import HomeRecommendView from "./childrencomponents/HomeRecommendView.vue";
import FeatureView from "./childrencomponents/FeatureView.vue";

// 公用组件
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import GoodsListItem from "components/content/goods/GoodsListItem.vue";
import BackTop from "components/content/backTop/BackTop.vue";

// 网络部分
import { getHomeMutlidata, getHomegoods } from "network/home";

import Scroll from "components/common/scroll/Scroll.vue";

export default {
  name: "home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsListItem,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isshowBT: false,
    };
  },
  created() {
    // 请求多个数据
    this.getHomeMutlidata();
    // 请求商品数据
    this.getHomegoods("pop");
    this.getHomegoods("new");
    this.getHomegoods("sell");
  },
  computed: {
    showgoods() {
      return this.goods[this.currentType].list;
    },
  },
  mounted() {
    //监听Item图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      console.log("-------");
      this.$refs.scroll.refresh();
    });
  },

  methods: {
    // 网络请求
    getHomeMutlidata() {
      getHomeMutlidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomegoods(type) {
      const page = this.goods[type].page + 1;
      getHomegoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.scroll.refresh();
      });
    },
    //事件监听相关
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentscroll(position) {
      // console.log(position);
      this.isshowBT = -position.y > 1000 ? true : false;
    },
    loadmore() {
      // console.log("上拉加载更多");
      this.getHomegoods(this.currentType);
    },
  },
};
</script>
<style scoped>
#home {
  /* position: absolute; */
  /* margin-top: 44px; */
  padding-top: 44px;
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
.tabcontrol {
  position: absolute;
  position: sticky;
  background-color: #fff;
  top: 44px;
  z-index: 9;
}
.scroll {
  overflow: hidden;
  position: sticky;
  top: 100px;
  height: 500px;
  width: 100%;
}
</style>