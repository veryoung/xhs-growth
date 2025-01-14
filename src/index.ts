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

  constructor() {
<<<<<<< HEAD
    this.task = new TaskBus(this);
=======
    this.task = new TaskBus();
>>>>>>> 4f9e07e (feat: lastEdition)
  }

  async init(config: Config) {
    // 初始化配置
    this.config = config;
    // 初始化活动id
    this.activityId = config.activityId;
    this.isDebugger = config.isDebugger ?? false;
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

  public async getUserType() {
    return await this.env.getUserType();
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

export const getUserType = () => {
  return GrowthCore().getUserType();
}

export default GrowthCore();
