import { Module } from "vuex";
import { IUserState } from "./type";
import { IRootState } from "../type";

import Base64 from "@/utils/base64";

import { httpSetPageApp, httpGetPageApp } from "@/network/service/mine";
import type { IHttpsetPageAppType } from "@/network/service/mine";

import {
  httpGetNotice,
  httpGetPublicSelect,
  httpPageHeader,
} from "@/network/service/page";

import { mapDefaultMenus } from "@/utils/mapMenu";

const user: Module<IUserState, IRootState> = {
  namespaced: true,
  state: {
    userMenus: [],
    commitNoticeList: [],
    publicSelectList: {},
    pageHeaderData: {},
  },
  mutations: {
    // 改变用户菜单
    changeMenus(state, menus) {
      state.userMenus = menus;
      // uni.setStorageSync("menus", Base64.objToEncode(menus));
    },

    // 改变公告
    changeNotice(state, notice) {
      state.commitNoticeList = notice;
    },

    // 改变下拉菜单
    changePublicSelectList(state, payload) {
      state.publicSelectList = payload;
    },

    // 改变pageheader数据
    changePageHeaderData(state, data) {
      state.pageHeaderData = data;
    },
  },
  actions: {
    // 获取用户的权限菜单
    async getUserMenus({ commit }) {
      const token = uni.getStorageSync("token");
      const userMenus = await httpGetPageApp();
      if (userMenus?.content) {
        const menus = Base64.decodeToObj(userMenus?.content);
        // * 判断每个menus是否有parent字段 如果判断有一个没有则返回false (parent字段为新增字段)
        const isHasParent = menus.every((item: any) => !item.parent);
        if (!isHasParent) {
          commit("changeMenus", mapDefaultMenus(menus, 11));
        } else {
          const authMenus = Base64.decodeToObj(token).functions[0].data;
          const menus = mapDefaultMenus(authMenus, 11);
          const content = Base64.objToEncode(menus);
          httpSetPageApp({ content });
          commit("changeMenus", menus);
        }
      }
    },
    // 保存用户权限菜单
    saveUserMenus({ commit }, payload: IHttpsetPageAppType) {
      if (typeof payload.content !== "string") {
        payload.content = Base64.objToEncode(payload.content);
      }
      httpSetPageApp(payload).then((res) => {
        if (res.code >= 1) {
          commit("changeMenus", Base64.decodeToObj(payload.content));
        }
      });
    },

    // 获取用户的公告信息
    getUserNotice({ commit }) {
      httpGetNotice().then((res) => {
        commit("changeNotice", res?.data?.[0]?.data ?? []);
      });
    },

    // 获取用户下拉菜单
    async getUserPublicSelectList({ commit }) {
      const res = await httpGetPublicSelect();
      commit("changePublicSelectList", res);
    },

    // 获取pageHeaderData数据
    getPageHeaderData({ commit }, payload) {
      httpPageHeader(payload).then((res) => {
        commit("changePageHeaderData", res);
      });
    },

    async setupLocation({ commit, dispatch }) {
      const token = uni.getStorageSync("token");
      if (token) {
        dispatch("getUserNotice");
        dispatch("getUserPublicSelectList");
        dispatch("getUserMenus");
        dispatch("getPageHeaderData", { flag: "week" });
      }
    },
  },
};

export default user;
