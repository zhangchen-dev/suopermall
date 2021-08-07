<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      ref="tabcontrol1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="scroll"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="loadmore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        ref="tabcontrol2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
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
import { debounde } from "common/utils/utils";

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
      tabOffsetTop: 534,
      isTabFixed: false,
      saveY: 0,
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
  activated() {
    // console.log("activated");
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  mounted() {
    //防抖功能实现
    const refresh = debounde(this.$refs.scroll.refresh, 500);

    //监听Item图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      refresh();
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
        // scroll默认加载更多只有一次，则需要调用finish函数才可以重复加载
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
      this.$refs.tabcontrol1.currentkey = index;
      this.$refs.tabcontrol2.currentkey = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentscroll(position) {
      // console.log(position);
      // 1.0 判断backtop是否显示
      this.isshowBT = -position.y > 1000 ? true : false;
      // 2.0 判断吸顶位置（position:fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadmore() {
      // console.log("上拉加载更多");
      this.getHomegoods(this.currentType);
    },

    //
    swiperImageLoad() {
      console.log(this.$refs.tabcontrol2.$el.offsetTop);
    },
  },
};
</script>
<style scoped>
.home {
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
}
#tab-control {
  background-color: #fff;
}
.scroll {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}

.tab-control {
  background-color: #fff;
  position: relative;
  z-index: 9;
}
</style>