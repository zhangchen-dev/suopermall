<template>
  <tabbar class="tabbar">
    <tabbar-item link="/home" activeColor="blue">
      <img slot="item-icon" src="../../assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-active"
        src="../../assets/img/tabbar/home_active.svg"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tabbar-item>
    <tabbar-item link="/category" activeColor="yellow">
      <img slot="item-icon" src="../../assets/img/tabbar/category.svg" alt="" />
      <img
        slot="item-icon-active"
        src="../../assets/img/tabbar/category_active.svg"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tabbar-item>
    <tabbar-item link="/cart" activeColor="skyblue">
      <img slot="item-icon" src="../../assets/img/tabbar/shopcart.svg" alt="" />
      <img
        slot="item-icon-active"
        src="../../assets/img/tabbar/shopcart_active.svg"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tabbar-item>
    <tabbar-item link="/profile" activeColor="orange">
      <img slot="item-icon" src="../../assets/img/tabbar/profile.svg" alt="" />
      <img
        slot="item-icon-active"
        src="../../assets/img/tabbar/profile_active.svg"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tabbar-item>
  </tabbar>
</template>
<script>
import tabbar from "../common/tabbar/tabbar.vue";
import tabbarItem from "../common/tabbar/tabbarItem.vue";
export default {
  name: "maintabbar",
  components: {
    tabbar,
    tabbarItem,
  },
};
</script>
<style scoped>
.tabbar {
  width: 100%;
}
</style>