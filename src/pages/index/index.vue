<template>
  <view class="page-index">
    <page-header v-if="isShowPageHeaderPanel"></page-header>
    <page-notice></page-notice>
    <page-work-list></page-work-list>
  </view>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import PageHeader from "./cpns/page-header.vue";
import PageNotice from "./cpns/page-notice.vue";
import PageWorkList from "./cpns/page-work-list.vue";

const store = useStore();
const isShowPageHeaderPanel = computed(() => {
  const data = store.state.user.pageHeaderData;
  console.log(data);
  if ("code" in data && data.code >= 1) {
    return true;
  } else {
    return false;
  }
});
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>
