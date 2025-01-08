import { createEnvironment } from './env';
export class Core {
    // public benefit: BenefitBus;
    constructor() {
        // this.task = new TaskBus();
        // this.benefit = new BenefitBus(this);
        // this.fetch = () => {};
    }
    init(config) {
        // this.task = new TaskBus();
        this.config = config;
        this.env = createEnvironment(config.platform);
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
export default GrowthCore();
//# sourceMappingURL=index.js.map