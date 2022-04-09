import baseRequest from "../../index";
import { IDataType } from "../../type";
import { IAcccountType, IHttpsetPageAppType, IPageAppType } from "./type";

// 登录
export function httpLogin(data: IAcccountType) {
  return baseRequest.request<IDataType>({
    url: "kbwxuserlogin",
    data,
  });
}

// 设置用户首页的应用
export function httpGetPageApp() {
  return baseRequest.request<IPageAppType>({
    url: "gogetwebselffun",
    interceptors: {
      isTaskTokenData: true,
    },
  });
}

// 设置用户首页的应用
export function httpSetPageApp(data: IHttpsetPageAppType) {
  return baseRequest.request<IDataType>({
    url: "gosetwebselffun",
    data,
    method: "POST",
    interceptors: {
      isTaskTokenData: true,
      isAutoFormHeader: true,
    },
  });
}

export * from "./type";
