// 根store类型
export interface IRootState {}

import { ILoginState } from "./login/type";

// 模块类型
export interface IRootWithModule {
  login: ILoginState;
}

export type IStoreType = IRootState & IRootWithModule;
