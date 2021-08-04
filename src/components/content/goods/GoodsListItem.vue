<template>
  <div class="goods-list-item">
    <img :src="goodsItem.show.img" alt="" />
    <div class="text">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.goods-list-item {
  width: 49%;
  height: auto;
  padding-top: 6px;
  font-size: 14px;
}
.goods-list-item img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
.text {
  width: 100%;
  height: 120px;
}
.price {
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
}
.collect {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: cover;
  vertical-align: bottom;
}
</style>
