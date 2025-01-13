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
<<<<<<< HEAD
    getRequestToken(): any;
=======
>>>>>>> 584cd82 (feat: changeToPromiseType)
}
export declare const go: (path: string, params?: NavigateParams) => any;
<<<<<<< HEAD
export declare const getUserType: () => Promise<any>;
=======
<<<<<<< HEAD
export declare const getUserType: () => Promise<any>;
=======
export declare const fetch: (method: string, url: string, data?: object, header?: object) => any;
<<<<<<< HEAD
export declare const getUserType: () => any;
>>>>>>> b932bf8 (feat: 修复发布问题)
<<<<<<< HEAD
>>>>>>> e45e8c3 (feat: 修复发布问题)
=======
=======
export declare const getUserType: () => Promise<any>;
>>>>>>> 584cd82 (feat: changeToPromiseType)
>>>>>>> 24408f1 (feat: changeToPromiseType)
declare const _default: Core;
export default _default;
//# sourceMappingURL=index.d.ts.map