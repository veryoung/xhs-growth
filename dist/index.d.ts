import { TaskBus } from './core/task';
import { Config, NavigateParams } from './types';
export declare class Core {
    /** 初始化原始配置 */
    private config;
    /** 环境 */
    env: any;
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
    init(config: Config): Promise<this>;
    go(path: string, params?: NavigateParams): any;
    fetch(method: string, url: string, data?: object, header?: object): any;
    getUserType(): Promise<any>;
    getRequestToken(): any;
}
/** 导出跳转方法 */
export declare const go: (path: string, params?: NavigateParams) => any;
export declare const getUserType: () => Promise<any>;
declare const _default: Core;
export default _default;
//# sourceMappingURL=index.d.ts.map