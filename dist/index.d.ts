import { TaskBus } from './core/task';
import { Config, NavigateParams } from './types';
export declare class Core {
    private config;
<<<<<<< HEAD
<<<<<<< HEAD
    private env;
=======
    /** 环境 */
    env: any;
    /** 是否是调试模式 */
>>>>>>> 9d8f8bc (feat: lastEdition)
=======
    private env;
>>>>>>> e45e8c3 (feat: 修复发布问题)
    isDebugger: boolean;
    baseUrl: string;
    activityId: string;
    task: TaskBus;
    fetchCore: any;
<<<<<<< HEAD
    constructor();
=======
>>>>>>> e45e8c3 (feat: 修复发布问题)
    init(config: Config): Promise<this>;
    go(path: string, params?: NavigateParams): any;
    fetch(method: string, url: string, data?: object, header?: object): any;
    getUserType(): Promise<any>;
    getRequestToken(): any;
}
export declare const go: (path: string, params?: NavigateParams) => any;
<<<<<<< HEAD
export declare const getUserType: () => Promise<any>;
=======
<<<<<<< HEAD
export declare const getUserType: () => Promise<any>;
=======
export declare const fetch: (method: string, url: string, data?: object, header?: object) => any;
export declare const getUserType: () => any;
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
declare const _default: Core;
export default _default;
//# sourceMappingURL=index.d.ts.map