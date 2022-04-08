import baseRequest from "../../index";
import { IDataType } from "../../type";
import { IAcccountType, IHttpsetPageAppType } from "./type";

// 登录
export function httpLogin(data: IAcccountType) {
  return baseRequest.request<IDataType>({
    url: "kbwxuserlogin",
    data,
  });
}

// 设置用户首页的应用
export function httpsetPageApp(data: IHttpsetPageAppType) {
  return baseRequest.request<IDataType>({
    url: "gosetwebselffun",
    data,
    interceptors: {
      isTaskTokenData: true,
    },
  });
}

export * from "./type";
