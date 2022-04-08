<template>
  <view class="current-work-list">
    <view class="card">
      <view class="card-header">
        <text class="card-header-text">我的首页应用</text>
        <h-tag cilcle mode="dark" :type="tagType" @click="handleEditClick">
          {{ tagText }}
        </h-tag>
      </view>
      <view class="card-content">
        <uni-grid :column="4" :showBorder="false">
          <template v-for="item in currentMenus" :key="'currenet' + item.id">
            <uni-grid-item>
              <view class="item" @click="handleItemClick(item)">
                <image :src="item.icon" class="menuIcon"></image>
                <text class="text">{{ item.title }}</text>
                <view v-if="flag" class="corner">
                  <uni-icons
                    color="#fff"
                    type="closeempty"
                    size="22rpx"
                  ></uni-icons
                ></view>
              </view>
            </uni-grid-item>
          </template>
        </uni-grid>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    menus?: any[];
    flag: boolean;
  }>(),
  {
    menus: undefined,
  }
);

const emit = defineEmits(["item-click", "edit-click"]);

const currentMenus = ref([...(props.menus ?? [])]);

// const currentSettingCode = ref(false);

const tagType = computed(() => {
  if (props.flag) return "success";
  return "primary";
});
const tagText = computed(() => {
  if (props.flag) return "保存";
  return "编辑";
});

const handleEditClick = () => {
  emit("edit-click", [...currentMenus.value]);
};

const handleItemClick = (item: any) => {
  if (props.flag) {
    currentMenus.value = currentMenus.value.filter(
      (i: any) => i.id !== item.id
    );
    emit("item-click", [...currentMenus.value]);
  } else {
    uni.navigateTo({
      url: "/page-authority-chunk" + item.path + "/index",
    });
  }
};
</script>

<style lang="less" scoped>
.current-work-list {
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx;
  .card {
    box-sizing: border-box;
    width: 100%;
    box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(0, 0, 0, 0.08);
    padding: 20rpx;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20rpx;
      border-bottom: 1rpx solid #efefef;
      .card-header-text {
        font-size: 28rpx;
      }
    }
    .card-content {
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
          background-color: #909399;
          width: 30rpx;
          height: 30rpx;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
