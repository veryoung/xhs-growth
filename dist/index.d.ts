import { TaskBus } from './core/task';
import { Config, NavigateParams } from './types';
export declare class Core {
    /** 初始化原始配置 */
    private config;
    /** 环境 */
    private env;
    /** 是否是调试模式 */
    isDebugger: boolean;
    /** 请求根域名 */
    baseUrl: string;
    /** 活动id */
    activityId: string;
    /** 任务总线 */
    task: TaskBus;
    /** 请求核心 */
    fetchCore: any;
    constructor();
    init(config: Config): void;
    go(path: string, params?: NavigateParams): any;
    fetch(method: string, url: string, data?: object, header?: object): any;
    getUserType(): any;
}
/** 导出跳转方法 */
export declare const go: (path: string, params?: NavigateParams) => any;
/** 导出请求方法 */
export declare const fetch: (method: string, url: string, data?: object, header?: object) => any;
export declare const getUserType: () => any;
declare const _default: Core;
export default _default;
//# sourceMappingURL=index.d.ts.map