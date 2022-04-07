<template>
  <view class="h-avatar">
    <template v-if="url">
      <image @click="handleImageClick" class="image" :src="url"></image>
    </template>
    <template v-else>
      <text class="text" v-if="avatarText">{{ avatarText }}</text>
      <uni-icons
        v-else
        type="person-filled"
        size="65rpx"
        color="#a0a0a0"
      ></uni-icons>
    </template>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    url?: string;
    text?: string;
    background?: string;
  }>(),
  {
    url: "",
    text: "",
    background: "#cccccc",
  }
);

// 定义头像的样式
const style = computed(() => {
  return {
    background: props.background,
  };
});

// 获取text的第一个字符
const avatarText = computed(() => {
  const text = props.text;
  if (text) {
    return text.charAt(0);
  }
  return "";
});

// 预览头像
const handleImageClick = () => {
  uni.previewImage({
    urls: [props.url],
  });
};
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>
