import baseRequest from "../../index";
import { IDataType } from "../../type";
import { IPageHeaderType } from "./type";

// 获取用户公告信息
export function httpGetNotice() {
  return baseRequest.request<IDataType>({
    url: "kbwxgetannouncement",
    interceptors: {
      isTaskTokenData: true,
    },
  });
}

// 获取用户公共下拉信息
export function httpGetPublicSelect() {
  return baseRequest.request<IDataType>({
    url: "gogetcommonlistdata",
    interceptors: {
      isTaskTokenData: true,
    },
  });
}

// 获取pageHeader数据
export function httpPageHeader(data: IPageHeaderType) {
  return baseRequest.request<IDataType>({
    url: "gogetmainpagedata",
    data,
    interceptors: {
      isTaskTokenData: true,
    },
  });
}
