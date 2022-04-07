import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useStore } from "@/store";
import Base64 from "@/utils/base64";

export default function () {
  const store = useStore();
  const token = computed(() => store.state.login.token);

  const userInfo = ref<any>({});

  const isLogin = ref(false);
  const isPower = ref(false);

  watchEffect(() => {
    if (token.value) {
      userInfo.value = Base64.decodeToObj(token.value);
      isLogin.value = true;
    }
  });

  // 在页面登录的时候判断是否已登录
  // onShow(() => {});

  return {
    isLogin,
    isPower,
    userInfo,
  };
}
