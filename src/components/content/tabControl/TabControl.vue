<template>
  <div class="tab-control">
    <div
      v-for="(item, key) in titles"
      :key="key"
      class="tab-item"
      :class="{ active: key == currentkey }"
      @click="itemclick(key)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentkey: 0,
    };
  },
  methods: {
    itemclick(key) {
      this.currentkey = key;
      this.$emit("tabClick", key);
    },
  },
};
</script>
<style>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
.tab-item {
  flex: 1;
}
.tab-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
