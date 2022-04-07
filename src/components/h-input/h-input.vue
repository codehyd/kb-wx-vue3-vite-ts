<template>
  <view class="h-input" :class="[{ 'is-border': border }]">
    <view class="label" v-if="label" :style="{ width: labelWidth + 'rpx' }">
      <slot name="label">{{ label }} </slot>
    </view>
    <view class="input" @click="handleInputClick">
      <input
        class="input-content"
        :placeholder="newPlaceholder"
        :type="type"
        :disabled="newDisabled"
        v-model="modelValue"
      />
      <uni-icons v-if="type == 'select'" type="bottom" size="26rpx"></uni-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
// 组件props
const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    label?: string;
    type?:
      | "text"
      | "number"
      | "idcard"
      | "digit"
      | "tel"
      | "password"
      | "select";
    border?: boolean;
    disabled?: boolean;
    labelWidth?: number;
    placeholder?: string;
  }>(),
  {
    label: "",
    type: "text",
    border: true,
    disabled: false,
    labelWidth: 100,
    placeholder: "",
  }
);

const emit = defineEmits(["update:modelValue", "click"]);

// 双向绑定value
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// 自定义placeholder
const newPlaceholder = computed(() => {
  if (props.placeholder) {
    return props.placeholder;
  }
  if (props.type === "select") {
    return "请选择" + props.label;
  }
  return "请输入" + props.label;
});

// 自定义disabled
const newDisabled = computed(() => {
  if (props.disabled) {
    return props.disabled;
  }
  if (props.type === "select") {
    return true;
  }
  return props.disabled;
});

// 监听 input 点击事件
const handleInputClick = () => {
  if (props.type === "select") {
    emit("click");
  }
};
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>
