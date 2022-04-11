<template>
  <view class="page-work-list">
    <uni-grid :column="4" :showBorder="false">
      <template v-for="item in userMenus" :key="item.id">
        <uni-grid-item>
          <view class="item" @click="handleItemClick(item)">
            <image :src="item.icon" class="menuIcon"></image>
            <text class="text">{{ item.title }}</text>
          </view>
        </uni-grid-item>
      </template>
      <uni-grid-item>
        <view class="item" @click="handleMoreClick">
          <uni-icons type="more-filled" :size="30" color="#777" />
          <text class="text">更多</text>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import useLoginHooks from "@/hooks/useLoginHooks";

const store = useStore();
const { isLogin } = useLoginHooks();

const userMenus = computed(() => store.state.user.userMenus);

const handleItemClick = (item: any) => {
  if (!isLogin.value) {
    uni.showToast({
      title: "请先登录",
      icon: "none",
      mask: true,
    });
    return;
  }
  uni.navigateTo({
    url: "/page-authority-chunk" + item.path + "/index",
    fail: () => {
      uni.showToast({
        title: "跳转失败",
        icon: "none",
        mask: true,
      });
    },
  });
};

const handleMoreClick = () => {
  if (!isLogin.value) {
    uni.showToast({
      title: "请先登录",
      icon: "none",
      mask: true,
    });
    return;
  }
  uni.navigateTo({
    url: "/page-authority-chunk/work-list/index",
  });
};
</script>

<style lang="less" scoped>
.page-work-list {
  position: relative;
  padding: 0 20rpx;
  background-color: #fff;

  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .menuIcon {
      width: 60rpx;
      height: 60rpx;
    }
  }
}
</style>
