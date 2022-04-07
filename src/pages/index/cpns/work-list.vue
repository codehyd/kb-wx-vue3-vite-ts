<template>
  <view class="work-list">
    <uni-grid :column="4" :showBorder="false">
      <uni-grid-item>
        <view class="item">
          <uni-icons type="more-filled" :size="30" color="#777" />
          <text class="text">更多</text>
        </view>
      </uni-grid-item>
    </uni-grid>
    <mask-animation :isLoading="loading"></mask-animation>
  </view>
</template>

<script setup lang="ts">
import MaskAnimation from "@/base-ui/mask-animation/mask-animation.vue";
const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 3000);
</script>

<style lang="less" scoped>
.work-list {
  position: relative;
}
.item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
