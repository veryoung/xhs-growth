import { Config } from './types';
import { createEnvironment } from './env';
import { TaskBus } from './core/task';
import { BenefitBus } from './core/benifit';


class Core {
  private config!: Config;
  private env: any;
  public task: TaskBus;
  public benefit: BenefitBus;

  constructor() {
    this.task = new TaskBus(this);
    this.benefit = new BenefitBus(this);
  }

  init(config: Config) {
    this.config = config;
    this.env = createEnvironment(config.platform);
    // todo: 实现兼容不同平台的初始化逻辑
    console.log("🚀 ~ Core ~ config:", this.config)
  }

  go(path: string, params?: object) {
    return this.env.go(path, params);
  }

}


let StaticCore: Core; 

const GrowthCore = () => {
    if(!Core) {
        StaticCore = new Core();
    }
    return StaticCore;
}

export default GrowthCore();