import { Module } from "vuex";
import { IUserState } from "./type";
import { IRootState } from "../type";

import Base64 from "@/utils/base64";
import { httpsetPageApp } from "@/network/service/mine";
import { mapDefaultMenus } from "@/utils/mapMenu";

const user: Module<IUserState, IRootState> = {
  namespaced: true,
  state: {
    userMenus: [],
  },
  mutations: {
    changeMenus(state, menus) {
      state.userMenus = menus;
      uni.setStorageSync("menus", Base64.objToEncode(menus));
    },
  },
  actions: {
    // 获取用户的权限菜单
    getUserMenus({ commit }) {
      // 判断是否有权限菜单 没有则重新set
      const menus = uni.getStorageSync("menus");
      if (!menus) {
        // 1. 获取用户的权限菜单
        const userMenus = Base64.decodeToObj(uni.getStorageSync("token"))
          .functions[0].data;
        // 2. 设置权限菜单
        const content = Base64.objToEncode(mapDefaultMenus(userMenus, 11));
        httpsetPageApp({ content }).then((res) => {
          commit("changeMenus", userMenus);
        });
      }
      // 如果有则直接获取
      else {
        const formatMenus = Base64.decodeToObj(menus);
        commit("changeMenus", formatMenus);
      }
    },
  },
};

export default user;
