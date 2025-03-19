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
        /** 是否是调试模式 */
        this.isDebugger = false;
        /** 活动id */
        this.activityId = '';
        /** 外部设置的code */
        this.code = '';
        /** 设备id */
        this.deviceId = '';
        this.task = new TaskBus(this);
    }
    getCode(force) {
        return __awaiter(this, void 0, void 0, function* () {
            if (force) {
                this.code = '';
                console.log('我是重试发起3');
                yield this.env.init('', force);
            }
            return this.code;
        });
    }
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // 初始化配置
            this.config = config;
            // 初始化活动id
            this.activityId = config.activityId;
            this.isDebugger = (_a = config.isDebugger) !== null && _a !== void 0 ? _a : false;
            this.deviceId = config.deviceId || '';
            if (!this.env) {
                // 初始化环境
                this.env = createEnvironment(config.platform, {
                    fetchCore: config.fetchCore,
                    isDebugger: config.isDebugger,
                    activityId: config.activityId,
                    baseUrl: config.baseUrl,
                    deviceId: config.deviceId,
                });
            }
            console.log('我是重试发起4');
            yield this.env.init();
            return this;
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
    /** 外部重新设置code
     *  因小程序登录后，code会失效，需要重新设置
     *  如果外部未设置code，core核心会自动设置code, 如果外部设置code，则外部设置的code会覆盖core核心设置的code
     */
    setCode(code) {
        this.code = code;
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
/** 导出跳转方法 */
export const go = (path, params) => {
    return GrowthCore().go(path, params);
};
/** 外部重新设置code
 *  因小程序登录后，code会失效，需要重新设置
 *  如果外部未设置code，core核心会自动设置code, 如果外部设置code，则外部设置的code会覆盖core核心设置的code
 */
export const setCode = (code) => {
    return GrowthCore().setCode(code);
};
/**
 * 获取小程序登录code
 */
export const getCode = () => {
    return GrowthCore().getCode();
};
export default GrowthCore();
//# sourceMappingURL=index.js.map