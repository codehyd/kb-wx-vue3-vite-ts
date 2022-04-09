// import { IBaseDataType } from "../../type";
import { IDataType } from "../../type";

export interface IAcccountType {
  jscode: string;
  sns: string;
  nickname: string;
  avatarurl: string;
  appid: string;
  cnstr: string;
  csname: string;
  uname: string;
  upwd?: string;
}

export interface IHttpsetPageAppType {
  content?: any;
}

export interface IPageAppType extends IDataType {
  content: any;
}
