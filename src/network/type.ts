type resDataType = "success" | "warning" | "info" | "error";

export interface IDataType<T = any> {
  code: number;
  res: any;
  type?: resDataType;
  msg: string;
  data: T;
}

export interface IBaseDataType {
  timestamp: string;
  sig: string;
  qxid: string | number;
}
