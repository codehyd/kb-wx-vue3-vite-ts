<template>
  <view class="login-wrap">
    <view class="head"></view>
    <view class="content" @click="handleLoginClick">
      <!-- 已登录 -->
      <template v-if="isLogin"> </template>
      <!-- 未登录 -->
      <template v-else>
        <view>需要登录</view>
        <view>登录后才能体验完整功能</view>
      </template>
    </view>
    <view class="setting">3</view>
  </view>
</template>

<script setup lang="ts">
import useLoginHooks from "@/hooks/useLoginHooks";
import login from "@/utils/login";
import { httpLogin } from "@/network/service/mine";
const { isLogin } = useLoginHooks();

const handleLoginClick = async () => {
  // 先判断是否已登录
  if (isLogin.value) {
    // 已登录
  } else {
    // 未登录
    const loginInfo: any = await login.getUserInfo();
    console.log(loginInfo);
    uni.setStorageSync("nickName", loginInfo.userRes.userInfo.nickName);
    uni.setStorageSync("avatarUrl", loginInfo.userRes.userInfo.avatarUrl);
    httpLogin({
      jscode: loginInfo.wxCodeRes.code,
      nickname: loginInfo.userRes.userInfo.nickName,
      avatarUrl: loginInfo.userRes.userInfo.avatarUrl,
      sns: "goSALE",
    }).then((res) => {
      if (res.code == 2) {
      } else {
        uni.navigateTo({ url: "/pages/login/index" });
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "../css/login-wrap.less";
</style>
