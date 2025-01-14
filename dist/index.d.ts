import { TaskBus } from './core/task';
import { Config, NavigateParams } from './types';
export declare class Core {
    private config;
<<<<<<< HEAD
    private env;
=======
    /** 环境 */
    env: any;
    /** 是否是调试模式 */
>>>>>>> 9d8f8bc (feat: lastEdition)
    isDebugger: boolean;
    baseUrl: string;
    activityId: string;
    task: TaskBus;
    fetchCore: any;
    constructor();
    init(config: Config): Promise<this>;
    go(path: string, params?: NavigateParams): any;
    fetch(method: string, url: string, data?: object, header?: object): any;
    getUserType(): Promise<any>;
    getRequestToken(): any;
}
export declare const go: (path: string, params?: NavigateParams) => any;
export declare const getUserType: () => Promise<any>;
declare const _default: Core;
export default _default;
//# sourceMappingURL=index.d.ts.map