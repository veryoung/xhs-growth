<<<<<<< HEAD
import { createEnvironment } from './env';
export class Core {
    constructor() {
        /** 是否是调试模式 */
        this.isDebugger = false;
        /** 活动id */
        this.activityId = '';
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
=======
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TaskBus } from './core/task';
import { createEnvironment } from './env';
export class Core {
    constructor() {
        this.isDebugger = false;
        this.activityId = '';
        this.task = new TaskBus();
    }
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = config;
            this.activityId = config.activityId;
            this.env = createEnvironment(config.platform, {
                fetchCore: config.fetchCore,
                isDebugger: config.isDebugger,
                activityId: config.activityId,
                baseUrl: config.baseUrl,
            });
            yield this.env.init();
            return this;
        });
>>>>>>> b932bf8 (feat: 修复发布问题)
    }
    go(path, params) {
        return this.env.go(path, params);
    }
    fetch(method, url, data, header) {
        return this.env.fetch(method, url, data, header);
    }
<<<<<<< HEAD
    async getUserType() {
        return await this.env.getUserType();
    }
    getRequestToken() {
        return this.env.getRequestToken();
=======
    getUserType() {
<<<<<<< HEAD
        return this.env.getUserType();
>>>>>>> b932bf8 (feat: 修复发布问题)
=======
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.env.getUserType();
        });
>>>>>>> 584cd82 (feat: changeToPromiseType)
    }
}
let StaticCore;
const GrowthCore = () => {
    if (!StaticCore) {
        StaticCore = new Core();
    }
    return StaticCore;
};
<<<<<<< HEAD
/** 导出跳转方法 */
export const go = (path, params) => {
    return GrowthCore().go(path, params);
};
=======
export const go = (path, params) => {
    return GrowthCore().go(path, params);
};
export const fetch = (method, url, data, header) => {
    return GrowthCore().fetch(method, url, data, header);
};
>>>>>>> b932bf8 (feat: 修复发布问题)
export const getUserType = () => {
    return GrowthCore().getUserType();
};
export default GrowthCore();
