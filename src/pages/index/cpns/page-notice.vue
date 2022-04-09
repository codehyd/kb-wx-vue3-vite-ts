<template>
  <view class="page-notice" @click="handleNavToNoticeList">
    <uni-notice-bar show-icon scrollable :text="noticeText" />
  </view>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

const store = useStore();

const noticeList = computed(() => store.state.user.commitNoticeList || []);
const noticeText = computed(() => noticeList.value?.[0]?.content ?? "暂无公告");

// 跳转到公告列表
const handleNavToNoticeList = () => {
  uni.navigateTo({ url: "/page-chunk/notice-list/index" });
};
</script>

<style scoped></style>
