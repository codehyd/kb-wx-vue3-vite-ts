<template>
  <view class="login-wrap">
    <view class="head">
      <h-avatar :url="avatar"></h-avatar>
    </view>
    <view class="content" @click="handleLoginClick">
      <!-- 已登录 -->
      <template v-if="isLogin">
        <view>Hello~ {{ userInfo.uname }}</view>
        <view>{{ userInfo.csname }}</view>
        <view>欢迎使用{{ userInfo.chinesename }}</view>
        <view>
          <h-tag cilcle mode="plain">{{ userInfo.softname }}</h-tag>
          <h-tag cilcle type="info" mode="dark">
            {{ userInfo.csmininame }}
          </h-tag>
        </view>
      </template>
      <!-- 未登录 -->
      <template v-else>
        <view>需要登录</view>
        <view>点击此处登录</view>
        <view>登录后才能体验完整功能</view>
      </template>
    </view>
    <view class="setting" @click="handleSettingClick">
      <uni-icons color="#fff" type="gear-filled" size="25rpx"></uni-icons>
      设置
    </view>
  </view>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import HAvatar from "@/components/h-avatar/h-avatar.vue";
import HTag from "@/components/h-tag/h-tag.vue";
import useLoginHooks from "@/hooks/useLoginHooks";
import login from "@/utils/login";
import { httpLogin } from "@/network/service/mine";

const store = useStore();
const { isLogin, userInfo } = useLoginHooks();

const avatar = computed(() => userInfo.value?.avatarurl ?? "");

const handleLoginClick = async () => {
  // 先判断是否已登录
  if (isLogin.value) {
    return uni.navigateTo({ url: "/pages/login/index" });
    // 已登录
  } else {
    // 未登录
    // 1. 先判断是否有微信缓存信息
    let nickname = uni.getStorageSync("nickName") ?? "";
    let avatarurl = uni.getStorageSync("avatarUrl") ?? "";
    let jscode = "";
    // 2.如果没有缓存信息
    if (!nickname || !avatarurl) {
      const loginInfo: any = await login.getUserInfo();
      nickname = loginInfo.userRes.userInfo.nickName;
      avatarurl = loginInfo.userRes.userInfo.avatarUrl;
      uni.setStorageSync("nickName", nickname);
      uni.setStorageSync("avatarUrl", avatarurl);
      jscode = loginInfo.wxCodeRes.code;
    }

    jscode = await login.getLoginCode();
    httpLogin({
      jscode,
      nickname,
      avatarurl,
      sns: "goSALE",
      appid: "wxbe6756ab2557a17b",
      cnstr: "",
      csname: "",
      uname: "",
    }).then((res) => {
      if (res.code == 2) {
        store.commit("login/setAccount", res);
      } else {
        uni.showToast({
          title: res.msg,
          icon: "none",
          mask: true,
        });
        setTimeout(() => {
          uni.navigateTo({ url: "/pages/login/index" });
        }, 1500);
      }
    });
  }
};

const handleSettingClick = () => {
  // 先判断是否登录
  if (isLogin.value) {
    console.log(121);
    // uni.navigateTo({ url: "/pages/mine/setting/index" });
  } else {
    uni.navigateTo({ url: "/pages/login/index" });
  }
};
</script>

<style lang="less" scoped>
@import "../css/login-wrap.less";
</style>
