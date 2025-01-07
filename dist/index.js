import { createEnvironment } from './env';
import { TaskBus } from './core/task';
import { BenefitBus } from './core/benifit';
class Core {
    constructor() {
        this.task = new TaskBus(this);
        this.benefit = new BenefitBus(this);
    }
    init(config) {
        this.config = config;ddd
        this.env = createEnvironment(config.platform);
        // todo: 实现兼容不同平台的初始化逻辑
    }
    go(path, params) {
        return this.env.go(path, params);
    }
}
let StaticCore = null;
const GrowthCore = () => {
    if (!Core) {
        StaticCore = new Core();
    }
    return StaticCore;
};
export default GrowthCore();
//# sourceMappingURL=index.js.map