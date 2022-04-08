// 根store类型
export interface IRootState {}

import { ILoginState } from "./login/type";
import { IUserState } from "./user/type";

// 模块类型
export interface IRootWithModule {
  login: ILoginState;
  user: IUserState;
}

export type IStoreType = IRootState & IRootWithModule;
