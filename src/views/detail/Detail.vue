<template>
  <div class="detail">
    <!-- //导航 -->
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";

// 导入封装的网络请求
import { getDetail, GoodsInfo, shop } from "network/detail";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
    };
  },
  created() {
    this.iid = this.$route.params.id;
    getDetail(this.iid).then((res) => {
      // 获取轮播数据
      this.topImages = res.result.itemInfo.topImages;
      // console.log(res);
      // 获取商品信息
      const data = res.result;
      // 将数据整合然后传递过去进行数据处理
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 创建店铺信息
      this.shop = new shop(data.shopInfo);
    });
  },
};
</script>
<style scoped>
.detail {
  background-color: #fff;
  position: relative;
  z-index: 10;
}
</style>
