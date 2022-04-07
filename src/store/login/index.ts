import { Module } from "vuex";
import { ILoginState } from "./type";
import { IRootState } from "../type";

import { httpLogin } from "@/network/service/mine";
// import type { IAcccountType } from "@/network/service/mine";
import { menusToUserMenus } from "@/utils/mapMenu";

import Base64 from "@/utils/base64";

const login: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: {
    token: "",
    nickName: "",
    avatarUrl: "",
    menus: [],
  },
  mutations: {
    setAccount(state, accountInfo) {
      // 1. 保存token | 微信用户信息
      const token = Base64.objToEncode(accountInfo);
      uni.setStorageSync("token", token);
      uni.setStorageSync("nickName", accountInfo.selfname);
      uni.setStorageSync("avatarUrl", accountInfo.avatarurl);
      state.token = token;
      state.nickName = accountInfo.selfname;
      state.avatarUrl = accountInfo.avatarurl;
      // 2. 获取权限路由
      const menus = accountInfo.functions[0].data;
      const userMenus = menusToUserMenus(menus);
      console.log(userMenus);
    },
  },
  actions: {
    accountLogin({ commit }, payload) {
      httpLogin(payload).then((res) => {
        if (res.code == 2) {
          commit("setAccount", res);
          uni.showLoading({
            title: "跳转到首页中",
            mask: true,
          });
          setTimeout(() => {
            // 跳转到首页
            uni.switchTab({
              url: "/pages/index/index",
            });
            uni.hideLoading();
          }, 1500);
        } else {
          uni.showToast({
            title: res.msg,
            icon: "none",
          });
        }
      });
    },

    loaclSetup({ commit }) {
      const token = uni.getStorageSync("token");
      if (token) {
        const accountInfo = Base64.decodeToObj(token);
        commit("setAccount", accountInfo);
      }
    },
  },
};

export default login;
