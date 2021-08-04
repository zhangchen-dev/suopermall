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
    <goods-list :goods="showgoods" />
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

// 网络部分
import { getHomeMutlidata, getHomegoods } from "network/home";

export default {
  name: "home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    TabControl,
    GoodsListItem,
    GoodsList,
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
.tabcontrol {
  position: sticky;
  background-color: #fff;
  top: 44px;
  z-index: 9;
}
</style>