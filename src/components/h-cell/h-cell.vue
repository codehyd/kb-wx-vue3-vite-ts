<template>
  <view class="cell" @click="handleCellClick">
    <view class="title">
      <view class="label">{{ label }}</view>
      <view class="value">{{ value }}</view>
    </view>

    <view class="right">
      <slot name="right">
        <uni-icons type="forward" size="26rpx"></uni-icons>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string | number;
    value?: string | number;
  }>(),
  {}
);
const emit = defineEmits(["click"]);
const handleCellClick = () => {
  emit("click", props);
};
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>
