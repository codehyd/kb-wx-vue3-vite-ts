import { IRequestConfig, IUniRequestOptions } from "./type";
import {
  baseData as requestBaseData,
  tokenData as requestTokenData,
} from "../config";

class uniRequest {
  baseUrl: string;
  isTaskBaseData: boolean;
  isTaskTokenData: boolean;
  isShowLoading: boolean;
  isAutoFormHeader: boolean;

  constructor(options: IRequestConfig) {
    this.baseUrl = options.baseUrl;
    this.isTaskBaseData = options.isTaskBaseData ?? false;
    this.isTaskTokenData = options.isTaskTokenData ?? false;
    this.isShowLoading = options.isShowLoading ?? false;
    this.isAutoFormHeader = options.isAutoFormHeader ?? false;
  }
  request<T>(options: IUniRequestOptions): Promise<T> {
    // 是否包含basedata
    let isTaskBaseData =
      options.interceptors?.isTaskBaseData ?? this.isTaskBaseData ?? false;
    // 是否包含tokendata
    let isTaskTokenData =
      options.interceptors?.isTaskTokenData ?? this.isTaskTokenData ?? false;
    // 是否显示loading
    let isShowLoading =
      options.interceptors?.isShowLoading ?? this.isShowLoading ?? false;
    // 是否自动将post请求的data转换为请求头
    let isAutoFormHeader =
      options.interceptors?.isAutoFormHeader ?? this.isAutoFormHeader ?? false;

    if (isAutoFormHeader && options.method === "POST") {
      options.header = {
        "content-type": "application/x-www-form-urlencoded",
      };
    }

    const baseData = isTaskBaseData ? requestBaseData() : {};
    const tokenData = isTaskTokenData ? requestTokenData() : {};
    return new Promise((resolve, reject) => {
      if (isShowLoading) {
        uni.showLoading({
          title: "加载中",
          mask: true,
        });
      }
      uni.request({
        url: this.baseUrl + options.url,
        data: Object.assign(baseData, tokenData, options.data),
        method: options.method ?? "GET",
        header: options.header ?? {},
        success: (res: any) => {
          resolve(res.data);
        },
        fail: (err) => {
          reject(err);
        },
        complete: () => {
          uni.hideLoading();
        },
      });
    });
  }
}

export default uniRequest;
