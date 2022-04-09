<template>
  <view class="work-list">
    <current-work-list
      :menus="currentMenus"
      :flag="currentFlag"
      @edit-click="handleSaveClick"
      @item-click="handleCurrentItemClick"
    ></current-work-list>

    <total-work-list
      @item-click="handleItemClick"
      :flag="currentFlag"
    ></total-work-list>
  </view>
</template>

<script setup lang="ts">
import CurrentWorkList from "./cpns/current-work-list.vue";
import TotalWorkList from "./cpns/total-work-list.vue";
import { useStore } from "@/store";
const store = useStore();
const currentMenus = ref([...store.state.user.userMenus]);

const currentFlag = ref(false);

let newMenus: any[] = [];

// 监听保存按钮
const handleSaveClick = (data: any) => {
  currentFlag.value = !currentFlag.value;
  if (!currentFlag.value) {
    currentMenus.value = data;
    // 保存用户菜单
    store.dispatch("user/saveUserMenus", { content: currentMenus.value });
  }
};

// 监听当前列表的点击事件 (删除)
const handleCurrentItemClick = (item: any) => {
  currentMenus.value = currentMenus.value.filter(
    (menu: any) => menu.id !== item.id
  );
};

const maxLength = 11;

// 监听全部列表的点击事件 (添加)
const handleItemClick = (item: any) => {
  // 1. 判断是否大于maxLength
  if (currentMenus.value.length >= maxLength) {
    uni.showToast({
      title: "最多只能添加11个",
      icon: "none",
    });
    return;
  }
  // 2. 查找当前列表中是否有该项
  const hasItem = currentMenus.value.find((menu: any) => menu.id === item.id);
  if (hasItem) {
    uni.showToast({
      title: "已经添加过了",
      icon: "none",
    });
    return;
  }
  // 3. 添加
  currentMenus.value.push(item);
};
</script>

<style scoped></style>
