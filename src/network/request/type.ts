export interface IInterceptors {
  isTaskBaseData?: boolean;
  isTaskTokenData?: boolean;
  isShowLoading?: boolean;
}

export interface IRequestConfig extends IInterceptors {
  baseUrl: string;
}

export interface IUniRequestOptions {
  url: string;
  data?: string | AnyObject | ArrayBuffer;
  header?: any;
  method?:
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT";
  timeout?: number;
  dataType?: string;
  responseType?: string;
  sslVerify?: boolean;
  withCredentials?: boolean;
  firstIpv4?: boolean;
  success?: (result: RequestSuccessCallbackResult) => void;
  fail?: (result: GeneralCallbackResult) => void;
  complete?: (result: GeneralCallbackResult) => void;

  // 拦截器
  interceptors?: IInterceptors;
}

export interface RequestSuccessCallbackResult {
  data: string | AnyObject | ArrayBuffer;
  statusCode: number;
  header: any;
  cookies: string[];
}

interface GeneralCallbackResult {
  errMsg: string;
}
