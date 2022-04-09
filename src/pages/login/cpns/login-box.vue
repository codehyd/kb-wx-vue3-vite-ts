<template>
  <view class="login-box">
    <view class="content">
      <view class="wrap">
        <h-input
          label="公司名称"
          v-model="loginInfo.csname"
          type="text"
        ></h-input>
        <h-input
          label="用户名称"
          v-model="loginInfo.uname"
          type="text"
        ></h-input>
        <h-input
          label="用户密码"
          v-model="loginInfo.upwd"
          type="password"
        ></h-input>
        <h-input
          label="软件名称"
          v-model="formatSns"
          type="select"
          @click="handleSelect"
        ></h-input>

        <button class="loginBtn" @click="handleBtnClick">登录</button>

        <uni-popup :radius="14" ref="uniPopupRef" background-color="#fff">
          <view class="popupContent">
            <h-cell
              v-bind="item"
              v-for="(item, index) in snsList"
              :key="index"
              @click="handleCellClick"
            ></h-cell>
          </view>
        </uni-popup>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import HInput from "@/components/h-input/h-input.vue";
import HCell from "@/components/h-cell/h-cell.vue";
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";

import useLogin from "@/utils/login";
import useLoginHooks from "@/hooks/useLoginHooks";

import type { IAcccountType } from "@/network/service/mine";

const { userInfo, accountLogin } = useLoginHooks();

const store = useStore();

// 定义组件的属性
const uniPopupRef = ref<InstanceType<typeof uniPopup>>();

// 软件列表
const snsList = [
  {
    value: "开博销售仓库管理系统",
    label: "goSALE",
  },
  {
    value: "开博送货管理系统",
    label: "goEASY",
  },
  {
    value: "开博供应链管理系统",
    label: "KWISE",
  },
];
console.log(userInfo.value);

// 定义属性
const loginInfo = reactive({
  csname: userInfo.value?.csname ?? "演示帐套",
  uname: userInfo.value?.uname ?? "admin",
  upwd: "",
  sns: userInfo.value?.softname ?? snsList[0].label,
});

// 格式化sns
const formatSns = computed(() => {
  let find = snsList.find((item) => item.label === loginInfo.sns);
  return find?.value ?? "";
});

// 开启uni-popup
const handleSelect = () => {
  uniPopupRef.value.open("center");
};

// 点击cell  选择sns
const handleCellClick = (item: any) => {
  loginInfo.sns = item.label;
  uniPopupRef.value.close();
};
// 点击登录
const handleBtnClick = async () => {
  // 先判断是否填写完整
  if (!loginInfo.csname || !loginInfo.uname || !loginInfo.sns) {
    uni.showToast({
      title: "请输入相关信息",
      icon: "none",
    });
    return;
  }

  // 先判断是否有微信缓存信息
  let nickname = uni.getStorageSync("nickName") ?? "";
  let avatarurl = uni.getStorageSync("avatarUrl") ?? "";
  let jscode = "";
  if (!nickname && !avatarurl) {
    const loginInfo: any = await useLogin.getUserInfo();
    nickname = loginInfo.userRes.userInfo.nickName;
    avatarurl = loginInfo.userRes.userInfo.avatarUrl;
    jscode = loginInfo.wxCodeRes.code;
    useLoginStore();
  } else {
    uni.login({
      success: (res) => {
        jscode = res.code;
        useLoginStore();
      },
    });
  }

  function useLoginStore() {
    const data: IAcccountType = {
      csname: loginInfo.csname,
      cnstr: loginInfo.csname,
      uname: loginInfo.uname,
      upwd: loginInfo.upwd,
      sns: loginInfo.sns,
      nickname,
      avatarurl,
      jscode,
      appid: "wxbe6756ab2557a17b",
    };
    accountLogin(data, () => {
      uni.showToast({
        title: "登录成功跳转中",
        icon: "success",
      });
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/index/index",
        });
      }, 1500);
    });
  }
};
</script>

<style lang="less" scoped>
@import "../css/login-box.less";
</style>
