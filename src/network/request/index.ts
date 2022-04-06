import { IRequestConfig, IUniRequestOptions } from "./type";
import { baseData as requestBaseData } from "../config";

class uniRequest {
  baseUrl: string;
  isTaskBaseData: boolean;
  isTaskTokenData: boolean;

  constructor(options: IRequestConfig) {
    this.baseUrl = options.baseUrl;
    this.isTaskBaseData = options.isTaskBaseData ?? false;
    this.isTaskTokenData = options.isTaskTokenData ?? false;
  }
  request<T>(options: IUniRequestOptions): Promise<T> {
    const baseData = this.isTaskBaseData ? requestBaseData() : {};
    return new Promise((resolve, reject) => {
      uni.request({
        url: this.baseUrl + options.url,
        data: Object.assign(baseData, options.data),
        method: options.method ?? "GET",
        header: options.header ?? {},
        success: (res: any) => {
          resolve(res.data);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  }
}

export default uniRequest;
