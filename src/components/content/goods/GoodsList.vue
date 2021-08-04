<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    />
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  components: { GoodsListItem },
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  /* flex属性换行 */
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
}
</style>
