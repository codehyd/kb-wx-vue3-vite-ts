<template>
  <view class="notice-list">
    <template v-for="item in noticeList" :key="item.fid">
      <view class="notice-item">
        <view class="notice-title section">
          {{ item.title }}
        </view>
        <view class="notice-content">
          {{ item.content }}
        </view>
        <view class="notice-footer">
          <uni-link
            :href="item.url"
            :text="item.url"
            fontSize="24rpx"
          ></uni-link>
        </view>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

const store = useStore();

const noticeList = computed(() => store.state.user.commitNoticeList || []);
console.log(noticeList.value);
</script>

<style lang="less" scoped>
.notice-item {
  background-color: #fff;
  margin: 20rpx;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 10rpx;
  .notice-title {
    padding: 20rpx;
    font-size: 28rpx;
    font-weight: 600;
  }
  .notice-content {
    padding: 20rpx;
    border-bottom: 1rpx solid #e8e8e8;
    border-top: 1rpx solid #e8e8e8;
  }
  .notice-footer {
    padding: 20rpx;
  }
}
</style>
