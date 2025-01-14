<<<<<<< HEAD
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
=======
import { TaskBus } from './core/task';
>>>>>>> 7d7f6f8 (发布笔记改动)
import { createEnvironment } from './env';
export class Core {
    constructor() {
        this.isDebugger = false;
        this.activityId = '';
        this.task = new TaskBus(this);
    }
<<<<<<< HEAD
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
=======
    async init(config) {
        var _a;
        // 初始化配置
        this.config = config;
        // 初始化活动id
        this.activityId = config.activityId;
        this.isDebugger = (_a = config.isDebugger) !== null && _a !== void 0 ? _a : false;
        // 初始化环境
        this.env = createEnvironment(config.platform, {
            fetchCore: config.fetchCore,
            isDebugger: config.isDebugger,
            activityId: config.activityId,
            baseUrl: config.baseUrl,
>>>>>>> 9d8f8bc (feat: lastEdition)
        });
    }
    go(path, params) {
        return this.env.go(path, params);
    }
    fetch(method, url, data, header) {
        return this.env.fetch(method, url, data, header);
    }
    getUserType() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.env.getUserType();
        });
    }
    getRequestToken() {
        return this.env.getRequestToken();
    }
}
let StaticCore;
const GrowthCore = () => {
    if (!StaticCore) {
        StaticCore = new Core();
    }
    return StaticCore;
};
export const go = (path, params) => {
    return GrowthCore().go(path, params);
};
export const getUserType = () => {
    return GrowthCore().getUserType();
};
export default GrowthCore();
