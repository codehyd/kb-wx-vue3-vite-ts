import { useStore } from "@/store";
import { httpLogin } from "@/network/service/mine";
import {
  httpGetNotice,
  httpGetPublicSelect,
  httpPageHeader,
} from "@/network/service/page";
import { httpGetPageApp, httpSetPageApp } from "@/network/service/mine";
import type { IAcccountType } from "@/network/service/mine";
import Base64 from "@/utils/base64";
import { mapDefaultMenus } from "@/utils/mapMenu";

type callback = () => void;

export default function () {
  const store = useStore();
  const token = computed(() => store.state.login.token);

  const userInfo = ref<any>({});

  const isLogin = ref(false);
  const isPower = ref(false);

  const accountLogin = async (
    account: IAcccountType,
    successLoginCallback?: callback,
    failLoginCallback?: callback
  ) => {
    uni.setStorageSync("nickName", account.nickname);
    uni.setStorageSync("avatarUrl", account.avatarurl);

    const res: any = await httpLogin(account);
    if (res.code == 2) {
      // 1. 设置token | 微信用户信息
      const token = Base64.objToEncode(res);
      uni.setStorageSync("token", token);
      store.state.login.token = token;

      // 2. 获取所有动态路由
      const authMenus = res.functions[0].data;
      store.state.login.menus = authMenus;

      // 3. 获取用户下拉菜单
      const userSelect = await httpGetPublicSelect();
      store.state.user.publicSelectList = userSelect;

      // 4. 获取公告
      const userNotice = await httpGetNotice();
      store.state.user.commitNoticeList = userNotice?.data?.[0]?.data ?? [];

      // 5. 获取用户菜单
      const userMenus = await httpGetPageApp();
      if (userMenus?.content) {
        const menus = Base64.decodeToObj(userMenus?.content);
        // * 判断每个menus是否有parent字段 如果判断有一个没有则返回false (parent字段为新增字段)
        const isHasParent = menus.every((item: any) => !item.parent);
        if (!isHasParent) {
          store.state.user.userMenus = mapDefaultMenus(menus, 11);
        } else {
          const menus = mapDefaultMenus(authMenus, 11);
          const content = Base64.objToEncode(menus);
          await httpSetPageApp({ content });
          store.state.user.userMenus = menus;
        }
      }

      // 6. 获取page-header数据
      httpPageHeader({ flag: "week" }).then((res) => {
        store.state.user.pageHeaderData = res;
      });
      // 7. 获取todo-list列表

      successLoginCallback && successLoginCallback();
    } else {
      // 登录失败
      uni.showToast({
        title: res.msg,
        icon: "none",
      });
      failLoginCallback && failLoginCallback();
    }
  };

  watchEffect(() => {
    if (token.value) {
      userInfo.value = Base64.decodeToObj(token.value);
      isLogin.value = true;
    }
  });

  return {
    isLogin,
    isPower,
    userInfo,
    accountLogin,
  };
}
