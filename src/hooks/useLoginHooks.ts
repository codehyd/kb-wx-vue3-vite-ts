import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
export default function () {
  const isLogin = ref(false);
  const isPower = ref(false);

  // 在页面登录的时候判断是否已登录
  onShow(() => {});

  return {
    isLogin,
    isPower,
  };
}
