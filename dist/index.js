import { TaskBus } from './core/task';
import { createEnvironment } from './env';
export class Core {
    // public benefit: BenefitBus;
    constructor() {
        this.task = new TaskBus();
        // this.benefit = new BenefitBus(this);
        // this.fetch = () => {};
    }
    init(config) {
        this.config = config;
        this.env = createEnvironment(config.platform, {
            fetchCore: config.fetchCore,
        });
        // todo: 实现兼容不同平台的初始化逻辑
    }
    go(path, params) {
        return this.env.go(path, params);
    }
    fetch(method, url, data, header) {
        return this.env.fetch(method, url, data, header);
    }
}
let StaticCore;
const GrowthCore = () => {
    if (!StaticCore) {
        StaticCore = new Core();
    }
    return StaticCore;
};
/** 导出跳转方法 */
export const go = (path, params) => {
    return GrowthCore().go(path, params);
};
/** 导出请求方法 */
export const fetch = (method, url, data, header) => {
    return GrowthCore().fetch(method, url, data, header);
};
export default GrowthCore();
//# sourceMappingURL=index.js.map