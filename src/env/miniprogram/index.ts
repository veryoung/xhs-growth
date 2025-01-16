import { NavigateParams, EnvConfig, UserTypeResponse } from "../../types";
import { httpConfig } from "../../config/http.config";

export default class MiniProgramEnv {
  private fetchCore: any;
  private coreBaseUrl: string;
  private activityId: string;
  private requestToken!: any;
  constructor(config: EnvConfig) {
    this.fetchCore = config.fetchCore;
    this.coreBaseUrl = config.baseUrl || '';
    this.activityId = config.activityId;
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

      if(this.requestToken) {
        header = {
          ...header,
          'authorization': `${this.requestToken}`
        }
      }
      
      this.fetchCore.xhsRequest({
        url,
        method,
        data,
        header,
        success: async (res: any) => {
          console.log("success", res)
          if(res.data?.code === 10009) {
            await this.init();
            console.log(method, url, data, header);
            return await this.fetch(method, url, data, header);
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

  async init() {
    const { code } = await xhs.login();
    if(!code) {
      throw new Error('请完成小程序登录');
    }
    await this.setAuthorization(code);
  }

  /** 设置授权 */
  async setAuthorization(code: string) {
    // 实现小程序的授权逻辑
    const res = await this.fetch('POST', httpConfig.API_LIST.login, {
      code: code,
    }) as any;
    console.log('MiniProgram authorization:', res);
    this.requestToken = res.data.authorization;
  }

  async getUserType() {
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
