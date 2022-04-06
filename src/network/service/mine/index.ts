import baseRequest from "../../index";
import { IDataType } from "../../type";

export function httpLogin(data: any) {
  return baseRequest.request<IDataType>({
    url: "kbwxuserlogin",
    data,
  });
}
