import { NavigateParams, EnvConfig, eventMissionType } from "../../types";
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
    console.log("🚀 ~ MiniProgramEnv ~ go ~ params:", params)
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
      console.log("🚀 ~ MiniProgramEnv ~ go ~ deeplink:", deeplink)
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
        fail: async (error: any) => {
          if(error.code === 10009) {
            await this.init();
            this.fetch(method, url, data, header);
            return
          }
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
    // console.log("🚀 ~ MiniProgramEnv ~ getUserType ~ header:", header)
    const res = await this.fetch('POST', httpConfig.API_LIST.userType);
    console.log("🚀 ~ MiniProgramEnv ~ getUserType ~ res:", res)
    return res;
  }

  async getTaskList() {
    const res = await this.fetch('GET', httpConfig.API_LIST.taskTable);
    console.log("🚀 ~ MiniProgramEnv ~ getTaskList ~ res:", res)
    return res;
  }

  async claimTask(taskMetaId: string) {
    const res = await this.fetch('POST',httpConfig.API_LIST.claimTask, {
      taskMetaId: taskMetaId
    });
    console.log("🚀 ~ MiniProgramEnv ~ claimTask ~ res:", res)
    return res;
  }

  async completeTask(instanceId: string, eventType: eventMissionType, params: any) {
    const res = await this.fetch('POST',httpConfig.API_LIST.completeTask, {
      instanceId: instanceId,
      eventType: eventType,
      params: params,
    }); 
    console.log("🚀 ~ MiniProgramEnv ~ completeTask ~ res:", res)
    return res;
  }

  async polling(group?: string) {
    const url = group ? `${httpConfig.API_LIST.polling}?group=${group}` : httpConfig.API_LIST.polling;
    const res = await this.fetch('POST', url);
    console.log("🚀 ~ MiniProgramEnv ~ polling ~ res:", res)
    return res;
  }

  async queryRecord(limit: number) {
    const url = `${httpConfig.API_LIST.qureyRecord}?limit=${limit}`;
    const res = await this.fetch('GET', url);
    console.log("🚀 ~ MiniProgramEnv ~ queryRecord ~ res:", res)
    return res;
  }

}