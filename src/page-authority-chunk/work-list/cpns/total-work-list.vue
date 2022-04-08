<template>
  <view class="total-work-list">
    <template v-for="(item, index) in totalList" :key="index">
      <view class="section is-bold">{{ item.title }}</view>
      <uni-grid :column="4" :showBorder="false">
        <template v-for="childrenItem in item.children" :key="childrenItem.id">
          <uni-grid-item>
            <view class="item" @click="handleItemClick(childrenItem)">
              <image :src="childrenItem.icon" class="menuIcon"></image>
              <text class="text">{{ childrenItem.title }}</text>
              <view v-if="flag" class="corner">
                <uni-icons
                  color="#fff"
                  type="plusempty"
                  size="22rpx"
                ></uni-icons
              ></view>
            </view>
          </uni-grid-item>
        </template>
      </uni-grid>
    </template>
  </view>
</template>

<script setup lang="ts">
import { mapClassMenus } from "@/utils/mapMenu";
import { useStore } from "@/store";

const props = withDefaults(
  defineProps<{
    flag: boolean;
  }>(),
  {}
);

const emit = defineEmits(["item-click"]);

const store = useStore();
const totalList = computed(() => mapClassMenus([...store.state.login.menus]));

const handleItemClick = (item: any) => {
  // 将click-item事件发送给父组件
  emit("item-click", item);
};
</script>

<style lang="less" scoped>
.total-work-list {
  margin: 20rpx;
  .item {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .menuIcon {
      width: 60rpx;
      height: 60rpx;
    }
    .corner {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 10rpx;
      right: 10rpx;
      background-color: #0094ff;
      width: 30rpx;
      height: 30rpx;
      border-radius: 50%;
    }
  }
}
</style>
