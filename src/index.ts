import { TaskBus } from './core/task';
import { Config, eventMissionType, NavigateParams } from './types';
import { createEnvironment } from './env';

export class Core {
  /** 初始化原始配置 */
  private config!: Config;
  /** 环境 */
  private env: any;
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

  constructor() {
    this.task = new TaskBus();
    // this.benefit = new BenefitBus(this);
    // this.fetch = () => {};
  }


  async init(config: Config) {
    // 初始化配置
    this.config = config;
    // 初始化活动id
    this.activityId = config.activityId;
    // 初始化环境
    this.env = createEnvironment(config.platform, {
      fetchCore: config.fetchCore,
      isDebugger: config.isDebugger,
      activityId: config.activityId,
      baseUrl: config.baseUrl,
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

  public getUserType() {
    return this.env.getUserType();
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

/** 导出请求方法 */
export const fetch = (method: string, url: string, data?: object, header?: object) => {
  return GrowthCore().fetch(method, url, data, header);
}

export const getUserType = () => {
  return GrowthCore().getUserType();
}

export default GrowthCore();
