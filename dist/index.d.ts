import { TaskBus } from './core/task';
import { Config, NavigateParams, UserType } from './types';
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
    /** 外部设置的code */
    code: string;
    /** 设备id */
    deviceId: string;
    constructor();
    init(config: Config): Promise<this>;
    go(path: string, params?: NavigateParams): any;
    fetch(method: string, url: string, data?: object, header?: object): any;
    getUserType(): Promise<UserType | ''>;
    /** 外部重新设置code
     *  因小程序登录后，code会失效，需要重新设置
     *  如果外部未设置code，core核心会自动设置code, 如果外部设置code，则外部设置的code会覆盖core核心设置的code
     */
    setCode(code: string): void;
    getRequestToken(): any;
}
/** 导出跳转方法 */
export declare const go: (path: string, params?: NavigateParams) => any;
/** 外部重新设置code
 *  因小程序登录后，code会失效，需要重新设置
 *  如果外部未设置code，core核心会自动设置code, 如果外部设置code，则外部设置的code会覆盖core核心设置的code
 */
export declare const setCode: (code: string) => void;
declare const _default: Core;
export default _default;
//# sourceMappingURL=index.d.ts.map