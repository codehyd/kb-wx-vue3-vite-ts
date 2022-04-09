<template>
  <view class="page-header"> </view>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

const store = useStore();

const pageHeaderData = computed(() => store.state.user.pageHeaderData);
console.log(111, pageHeaderData.value);
</script>

<style lang="less" scoped>
.page-header {
  background-color: #0094ff;
  padding: 20rpx;
  color: #fff;
}
</style>
