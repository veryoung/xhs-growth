import { TaskBus } from './core/task';
import { createEnvironment } from './env';
export class Core {
    constructor() {
        /** 是否是调试模式 */
        this.isDebugger = false;
        /** 活动id */
        this.activityId = '';
        this.task = new TaskBus();
        // this.benefit = new BenefitBus(this);
        // this.fetch = () => {};
    }
    async init(config) {
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
    go(path, params) {
        return this.env.go(path, params);
    }
    fetch(method, url, data, header) {
        return this.env.fetch(method, url, data, header);
    }
    async getUserType() {
        return await this.env.getUserType();
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
export const getUserType = () => {
    return GrowthCore().getUserType();
};
export default GrowthCore();
