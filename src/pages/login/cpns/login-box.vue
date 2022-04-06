<template>
  <view class="login-box">
    <view class="content">
      <view class="wrap">
        <uni-forms
          label-width="75rpx"
          label-align="center"
          border
          style="width: 100%"
          :modelValue="loginInfo"
        >
          <!-- 公司名称 -->
          <uni-forms-item label="公司名称">
            <uni-easyinput
              :value="loginInfo.csname"
              :inputBorder="false"
              placeholder="请输入公司名称"
            ></uni-easyinput>
          </uni-forms-item>
          <!-- 用户名称 -->
          <uni-forms-item label="用户名称">
            <uni-easyinput
              :value="loginInfo.uname"
              :inputBorder="false"
              placeholder="请输入用户名称"
            ></uni-easyinput>
          </uni-forms-item>
          <!-- 用户密码 -->
          <uni-forms-item label="用户密码">
            <uni-easyinput
              :value="loginInfo.upwd"
              :inputBorder="false"
              placeholder="请输入用户密码"
            ></uni-easyinput>
          </uni-forms-item>
          <!-- 软件系统 -->
          <uni-forms-item label="软件系统">
            <uni-easyinput
              :value="loginInfo.sns"
              :inputBorder="false"
              placeholder="请输入软件系统"
            ></uni-easyinput>
          </uni-forms-item>
        </uni-forms>

        <button class="loginBtn">1231</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const loginInfo = reactive({
  csname: "",
  uname: "",
  upwd: "",
  sns: "",
});
</script>

<style lang="less" scoped>
@import "../css/login-box.less";
</style>
