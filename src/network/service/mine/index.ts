import baseRequest from "../../index";
import { IDataType } from "../../type";
import { IAcccountType } from "./type";

export function httpLogin(data: IAcccountType) {
  return baseRequest.request<IDataType>({
    url: "kbwxuserlogin",
    data,
  });
}

export * from "./type";
