<template>
  <view
    class="h-tag"
    :class="[`h-tag-${mode}-${type}`, { 'is-cilcle': cilcle }]"
  >
    <view v-if="$slots.default">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: "primary" | "success" | "error" | "warning" | "info";
    mode?: "light" | "dark" | "plain";
    cilcle?: boolean;
    // text?: string;
  }>(),
  {
    type: "primary",
    mode: "light",
    cilcle: false,
    // text: "",
  }
);
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>
