import { NavigateParams, EnvConfig, UserTypeResponse, UserType } from "../../types";
import { httpConfig } from "../../config/http.config";
import GrowthCore from "../../index";

export default class MiniProgramEnv {
  private fetchCore: any;
  private coreBaseUrl: string;
  private activityId: string;
  private requestToken!: any;
  private deviceId: string;
  // 判断接口是否授权中
  private isAuthing: boolean = false;
  // 添加全局授权重试计数
  private authRetryCount: number = 0;
  // 最大重试次数
  private readonly MAX_AUTH_RETRY_COUNT: number = 3;
  // 授权请求状态管理
  private authRequests: {
    [code: string]: Array<(value: string) => void>;
  } = {};

  constructor(config: EnvConfig) {
    this.fetchCore = config.fetchCore;
    this.coreBaseUrl = config.baseUrl || '';
    this.activityId = config.activityId || '';
    this.deviceId = config.deviceId || '';
  }

  go(path: string, params?: NavigateParams) {
    console.log("🚀 ~ MiniProgramEnv ~ go ~ path:", path)
    if (params?.type === 'deeplink') {
      xhs.openXhsDeeplink({
        link: path || '',
        success: params?.success,
        fail: params?.fail,
        complete: params?.complete
      });
      return
    }

    if (params?.type === 'url') {
      // 去掉https://
      const url = path.replace('https://', '');
      // 分离url和query
      const [urlPath, query] = url.split('?');
      // 添加xhsdiscover://webview/
      const deeplink = `xhsdiscover://webview/${urlPath}?${decodeURIComponent(query)}`;
      // 实现小程序的跳转逻辑
      xhs.openXhsDeeplink({
        link: deeplink,
        success: params?.success,
        fail: params?.fail,
        complete: params?.complete
      });
      return
    }
  }

  fetch(method: string, url: string, data?: object, header?: object) {
    return new Promise((resolve, reject) => {
      url = url.replace('{activityId}', this.activityId);
      if (!url.startsWith(this.coreBaseUrl)) {
        url = this.coreBaseUrl + url;
      }
      header = {
        ...header,
        ...(this.requestToken && { 'authorization': `${this.requestToken}` }),
        ...(this.deviceId && { 'X-Legacy-Did': `${this.deviceId}` })
      }
      this.fetchCore.request({
        url,
        method,
        data,
        header,
        success: async (res: any) => {
          if (res.data?.code === 10009) {
            // 使用全局重试计数
            if ((this.authRetryCount < this.MAX_AUTH_RETRY_COUNT) && !this.isAuthing) {
              this.authRetryCount++;
              this.requestToken = ''
              GrowthCore.code = ''
              // 强制重新登录获取新code
              const { code: newCode } = await xhs.login();
              await this.executeAuthRequest(newCode);  // 传入新code
              return resolve(await this.fetch(method, url, data, header));
            } else if (!this.isAuthing) {
              console.log(`已达到最大授权重试次数 ${this.MAX_AUTH_RETRY_COUNT}，请求失败`);
              this.authRetryCount = 0
              return resolve({
                code: 10010,
                msg: '授权失败，已达到最大重试次数',
                data: null
              });
            }
          }
          resolve(res.data);
        },
        fail: async (error: any) => {
          reject(error);
        }
      });
    });
  }

  /**
   * 初始化小程序环境
   * @param code 可选的登录code
   * @returns Promise<any> 授权结果
   */
  async init(code?: string, force?: boolean): Promise<string> {
    let currentCode = GrowthCore.code;
    try {
      if (!currentCode) {
        if (!code) {
          const { code: xhsCode } = await xhs.login();
          GrowthCore.setCode(xhsCode)
          currentCode = xhsCode;
        } else {
          GrowthCore.setCode(code)
          currentCode = code;
        }
      }
      if (!currentCode) {
        throw new Error('请完成小程序登录');
      }
      const token = await this.setAuthorization(currentCode, force);
      // 授权成功后重置重试计数
      return token;
    } catch (error) {
      return ''
    }
  }

  /** 设置授权 */
  async setAuthorization(code: string, force?: boolean): Promise<string> {
    if (this.requestToken && !force) {
      return this.requestToken
    }

    // 初始化数组（如果不存在）
    if (!this.authRequests[code]) {
      this.authRequests[code] = [];
    }

    // 创建Promise并将resolve函数存入数组
    return new Promise<string>((resolve) => {
      // 将当前Promise的resolve添加到数组
      this.authRequests[code].push(resolve);
      // 如果数组长度为1，说明是第一个请求，发起请求
      if (this.authRequests[code].length === 1) {
        this.executeAuthRequest(code);
      }
    });
  }

  // 执行实际的授权请求
  private async executeAuthRequest(code: string): Promise<void> {
    try {
      this.isAuthing = true;
      const res = await this.fetch('POST', httpConfig.API_LIST.login, {
        code,
      }) as {
        data: {
          authorization: string;
        }
      };
      this.isAuthing = false;
      if (res.data?.authorization) {
        this.requestToken = res.data.authorization;
        // 通知所有等待的Promise
        const resolvers = [...this.authRequests[code]];
        resolvers.forEach(resolve => resolve(this.requestToken));
      } else {
        throw new Error('授权失败')
      }
    } catch (error) {
      // 统一返回空字符串表示失败
      console.error('授权请求失败', error);
      // 通知所有等待的Promise
      const resolvers = [...this.authRequests[code]];
      resolvers.forEach(resolve => resolve(''));
    } finally {
      // 只清除当前code的请求队列
      delete this.authRequests[code];
    }
  }

  async getUserType(): Promise<UserType | ''> {
    try {
      const res = await this.fetch('POST', httpConfig.API_LIST.userType) as UserTypeResponse;
      if (res?.data?.userType) {
        return res.data.userType;
      }
      return ''
    } catch (error) {
      return '';
    }
  }

  getActivityId() {
    return this.activityId;
  }

  getRequestToken() {
    return this.requestToken;
  }
}
