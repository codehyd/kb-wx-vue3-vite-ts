import { Module } from "vuex";
import { ILoginState } from "./type";
import { IRootState } from "../type";

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
    // 改变token
    changeToken(state, token) {
      state.token = token;
    },

    // 改变用户路由
    changeMenus(state, menus) {
      state.menus = menus;
    },

    // 设置token 路由菜单
    setAccount(state, accountInfo) {
      // 1. 保存token | 微信用户信息
      // const token = Base64.objToEncode(accountInfo);
      state.token = accountInfo;
      uni.setStorageSync("token", accountInfo);
      uni.setStorageSync("nickName", accountInfo.selfname);
      uni.setStorageSync("avatarUrl", accountInfo.avatarurl);
      state.nickName = accountInfo.selfname;
      state.avatarUrl = accountInfo.avatarurl;
      // 2. 获取权限路由
      const menus = accountInfo.functions[0].data;
      state.menus = menus;
    },
  },
  actions: {
    async accountLogin({ commit }, payload) {
      // 1. 设置token | 微信用户信息
      const token = Base64.objToEncode(payload);
      uni.setStorageSync("token", token);
      uni.setStorageSync("nickName", payload.selfname);
      uni.setStorageSync("avatarUrl", payload.avatarurl);
      commit("changeToken", token);

      // 2. 获取所有动态路由
      const autoMenus = payload.functions[0].data;
      commit("changeMenus", autoMenus);

      // 3. 获取用户下拉菜单

      // 4. 获取公告

      // 5. 获取用户菜单

      // 6. 获取page-header数据

      // 7. 获取todo-list列表

      // ...
    },

    setupLocation({ commit, dispatch }) {
      const token = uni.getStorageSync("token");
      if (token) {
        commit("changeToken", token);

        const accountInfo = Base64.decodeToObj(token);
        const menus = accountInfo.functions[0].data;
        commit("changeMenus", menus);
      }
    },
  },
};

export default login;
