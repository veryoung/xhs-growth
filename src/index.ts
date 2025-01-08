import { TaskBus } from './core/task';
import { BenefitBus } from './core/benifit';
import { Config } from './types';
import { createEnvironment } from './env';


export class Core {
  private config!: Config;
  private env: any;
  public task!: any;
  // public benefit: BenefitBus;

  constructor() {
    // this.task = new TaskBus();
    // this.benefit = new BenefitBus(this);
    // this.fetch = () => {};
  }

  init(config: Config) {
    // this.task = new TaskBus();
    this.config = config;
    this.env = createEnvironment(config.platform);
    // todo: 实现兼容不同平台的初始化逻辑
  }

  public go(path: string, params?: object) {
    return this.env.go(path, params);
  }

  public fetch(method: string, url: string, data?: object, header?: object) {
    return this.env.fetch(method, url, data, header);
  }

}


let StaticCore: Core;

const GrowthCore = () => {
    if(!StaticCore) {
        StaticCore = new Core();
    }
    return StaticCore;
}

export default GrowthCore();