import { NavigateParams, EnvConfig } from "../../types";
import { httpConfig } from "../../config/http.config";
import { xhs } from "../../types/xhs.d";

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
    // 实现小程序的跳转逻辑
    xhs.navigateTo({
      url: path || '',
      event: params?.event,
      success: params?.success,
      fail: params?.fail,
      complete: params?.complete
    });
  }

  fetch(method: string, url: string, data?: object, header?: object) {
    return new Promise((resolve, reject) => {
      url = url.replace('{activityId}', this.activityId);
      url = this.coreBaseUrl + url;

      if(this.requestToken) {
        header = {
          ...header,
          'authorization': `${this.requestToken}`
        }
      }
      
      this.fetchCore.request({
        url,
        method,
        data,
        header,
        success: (res: any) => {
          resolve(res.data);
        },
        fail: (error: any) => {
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
    this.setAuthorization(code);
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
    // console.log("🚀 ~ MiniProgramEnv ~ getUserType ~ header:", header)
    const res = await this.fetch('POST','/api/growth/haydn/{activityId}/user/type');
    console.log("🚀 ~ MiniProgramEnv ~ getUserType ~ res:", res)
    return res;
  }
}
