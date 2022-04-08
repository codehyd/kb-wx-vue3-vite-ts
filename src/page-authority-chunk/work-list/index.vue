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
const currentMenus = computed(() => [...store.state.user.userMenus]);

const currentFlag = ref(false);

let newMenus = [];

const handleSaveClick = (data: any) => {
  currentFlag.value = !currentFlag.value;
};

const handleCurrentItemClick = (data: any) => {
  newMenus = data;
};

const handleItemClick = (item: any) => {
  console.log(item);
};
</script>

<style scoped></style>
