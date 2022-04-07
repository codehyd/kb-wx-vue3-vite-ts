<template>
  <view v-if="isLoading" class="mask-animation">
    <view class="wrap">
      <view class="spinner">
        <view class="bounce bounce1"></view>
        <view class="bounce bounce2"></view>
        <view class="bounce bounce3"></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isLoading: boolean;
  }>(),
  {}
);
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>
