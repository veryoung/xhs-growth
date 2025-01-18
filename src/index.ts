import { TaskBus } from './core/task';
import { Config, NavigateParams } from './types';
import { createEnvironment } from './env';

export class Core {
  /** 初始化原始配置 */
  private config!: Config;
  /** 环境 */
  public env: any;
  /** 是否是调试模式 */
  public isDebugger: boolean = false;
  /** 请求根域名 */
  public baseUrl!: string;
  /** 活动id */
  public activityId: string = '';
  /** 任务总线 */
  public task!: TaskBus;
  /** 请求核心 */
  public fetchCore: any;
  /** 外部设置的code */
  public code: string = '';
  /** 设备id */
  public deviceId: string = '';

  constructor() {
    this.task = new TaskBus(this);
  }

  async init(config: Config) {
    // 初始化配置
    this.config = config;
    // 初始化活动id
    this.activityId = config.activityId;
    this.isDebugger = config.isDebugger ?? false;
    this.deviceId = config.deviceId || '';
    // 初始化环境
    this.env = createEnvironment(config.platform, {
      fetchCore: config.fetchCore,
      isDebugger: config.isDebugger,
      activityId: config.activityId,
      baseUrl: config.baseUrl,
      deviceId: config.deviceId,
    });
    await this.env.init();
    return this;
  }

  public go(path: string, params?: NavigateParams) {
    return this.env.go(path, params);
  }

  public fetch(method: string, url: string, data?: object, header?: object) {
    return this.env.fetch(method, url, data, header);
  }

  public async getUserType() {
    return await this.env.getUserType();
  }

  /** 外部重新设置code
   *  因小程序登录后，code会失效，需要重新设置
   *  如果外部未设置code，core核心会自动设置code, 如果外部设置code，则外部设置的code会覆盖core核心设置的code
   */
  public setCode(code: string) {
    this.code = code;
  }

  public getRequestToken() {
    return this.env.getRequestToken();
  }
}

let StaticCore: Core;

const GrowthCore = () => {
    if(!StaticCore) {
        StaticCore = new Core();
    }
    return StaticCore;
}

/** 导出跳转方法 */
export const go = (path: string, params?: NavigateParams) => {
  return GrowthCore().go(path, params);
}

/** 获取用户类型 */
export const getUserType = () => {
  return GrowthCore().getUserType();
}

/** 外部重新设置code
 *  因小程序登录后，code会失效，需要重新设置
 *  如果外部未设置code，core核心会自动设置code, 如果外部设置code，则外部设置的code会覆盖core核心设置的code
 */
export const setCode = (code: string) => {
  return GrowthCore().setCode(code);
}

export default GrowthCore();
