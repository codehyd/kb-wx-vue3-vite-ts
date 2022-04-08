<template>
  <view class="work-list">
    <uni-grid :column="4" :showBorder="false">
      <template v-for="item in userMenus" :key="item.id">
        <uni-grid-item>
          <view class="item" @click="handleMoreClick(item)">
            <image :src="item.icon" class="menuIcon"></image>
            <text class="text">{{ item.title }}</text>
          </view>
        </uni-grid-item>
      </template>
      <uni-grid-item>
        <view class="item" @click="handleMoreClick(undefined)">
          <uni-icons type="more-filled" :size="30" color="#777" />
          <text class="text">更多</text>
        </view>
      </uni-grid-item>
    </uni-grid>
    <mask-animation :isLoading="loading"></mask-animation>
  </view>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import MaskAnimation from "@/base-ui/mask-animation/mask-animation.vue";
import useLoginHooks from "@/hooks/useLoginHooks";

const store = useStore();
const userMenus = computed(() => store.state.user.userMenus);
const { isLogin } = useLoginHooks();

const loading = ref(true);

watchEffect(() => {
  if (isLogin.value) {
    store.dispatch("user/getUserMenus");
    nextTick(() => {
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    });
  }
});

const handleMoreClick = (item: any) => {
  if (!isLogin.value)
    return uni.showToast({
      title: "请先登录",
      icon: "none",
    });
  // 路由跳转
  if (item) {
    console.log(item);
    uni.navigateTo({
      url: "/page-authority-chunk" + item.path + "/index",
      fail: () => {
        uni.showToast({
          title: "跳转失败",
          icon: "none",
        });
      },
    });
  }
  // 跳转至更多
  else {
    uni.navigateTo({
      url: "/page-authority-chunk/" + "work-list" + "/index",
    });
  }
};
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
  .menuIcon {
    width: 60rpx;
    height: 60rpx;
  }
}
</style>
