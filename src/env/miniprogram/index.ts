import { NavigateParams, EnvConfig, UserTypeResponse, UserType } from "../../types";
import { httpConfig } from "../../config/http.config";
import GrowthCore from "../../index";

export default class MiniProgramEnv {
  private fetchCore: any;
  private coreBaseUrl: string;
  private activityId: string;
  private requestToken!: any;
  private deviceId: string;
  // 添加全局授权重试计数
  private authRetryCount: number = 0;
  // 最大重试次数
  private readonly MAX_AUTH_RETRY_COUNT: number = 3;
  // 授权请求状态管理
  private currentAuthRequest: {
    code: string;
    isRequesting: boolean;
    result: string | null;
    resolvers: Array<(value: string) => void>;
  } = {
    code: '',
    isRequesting: false,
    result: null,
    resolvers: []
  };
  
  constructor(config: EnvConfig) {
    this.fetchCore = config.fetchCore;
    this.coreBaseUrl = config.baseUrl || '';
    this.activityId = config.activityId || '';
    this.deviceId = config.deviceId || '';
  }

  go(path: string, params?: NavigateParams) {
    console.log("🚀 ~ MiniProgramEnv ~ go ~ path:", path)
    if(params?.type === 'deeplink') {
      xhs.openXhsDeeplink({
        link: path || '',
        success: params?.success,
        fail: params?.fail,
        complete: params?.complete
      });
      return
    }

    if(params?.type === 'url') {
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
          console.log("success", res)
          if(res.data?.code === 10009) {
            // 使用全局重试计数
            if (this.authRetryCount < this.MAX_AUTH_RETRY_COUNT) {
              this.authRetryCount++;
              console.log(`授权重试第 ${this.authRetryCount} 次`, method, url);
              await this.init();
              return resolve(await this.fetch(method, url, data, header));
            } else {
              this.authRetryCount = 0;
              console.log(`已达到最大授权重试次数 ${this.MAX_AUTH_RETRY_COUNT}，请求失败`);
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
          console.log("fail", error)
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
  async init(code?: string): Promise<string> {
    let currentCode = GrowthCore.code;

    if(!currentCode) {
      if(!code) {
        const { code: xhsCode } = await xhs.login();
        GrowthCore.setCode(xhsCode)
        currentCode = xhsCode;
      } else {
        GrowthCore.setCode(code)
        currentCode = code;
      }
    }
    if(!currentCode) {
      throw new Error('请完成小程序登录');
    }
    
    const token = await this.setAuthorization(currentCode);
    // 授权成功后重置重试计数
    if (token) {
      this.authRetryCount = 0;
    }
    return token;
  }

  /** 设置授权 */
  async setAuthorization(code: string): Promise<string> {
    // 如果已经有结果，直接返回
    if (this.currentAuthRequest.code === code && this.currentAuthRequest.result !== null) {
      return this.currentAuthRequest.result;
    }
    
    // 如果code不同，重置状态
    if (this.currentAuthRequest.code !== code) {
      this.currentAuthRequest.code = code;
      this.currentAuthRequest.isRequesting = false;
      this.currentAuthRequest.result = null;
      this.currentAuthRequest.resolvers = [];
    }
    
    // 创建新的Promise并将其resolve函数存入数组
    return new Promise<string>((resolve) => {
      // 将当前Promise的resolve添加到数组
      this.currentAuthRequest.resolvers.push(resolve);
      
      // 如果当前没有正在进行的请求，则发起请求
      if (!this.currentAuthRequest.isRequesting) {
        this.currentAuthRequest.isRequesting = true;
        this.executeAuthRequest(code);
      }
    });
  }

  // 执行实际的授权请求
  private async executeAuthRequest(code: string): Promise<void> {
    try {
      console.log('发起新的授权请求');
      const res = await this.fetch('POST', httpConfig.API_LIST.login, {
        code: code,
      }) as {
        data: {
          authorization: string;
        }
      };
      this.requestToken = res.data.authorization;
      
      // 保存结果
      this.currentAuthRequest.result = this.requestToken;
      
      // 通知所有等待的Promise
      const resolvers = [...this.currentAuthRequest.resolvers];
      resolvers.forEach(resolve => resolve(this.requestToken));
    } catch (error) {
      // 统一返回空字符串表示失败
      console.error('授权请求失败', error);
      this.currentAuthRequest.result = '';
      
      // 通知所有等待的Promise
      const resolvers = [...this.currentAuthRequest.resolvers];
      resolvers.forEach(resolve => resolve(''));
    } finally {
      // 清空resolvers数组，但保留code和result
      this.currentAuthRequest.resolvers = [];
      this.currentAuthRequest.isRequesting = false;
    }
  }

  async getUserType(): Promise<UserType | ''> {
    try {
      const res = await this.fetch('POST', httpConfig.API_LIST.userType) as UserTypeResponse;
      if(res?.data?.userType) {
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
