import { TaskBus } from './core/task';
import { Config, NavigateParams } from './types';
export declare class Core {
    private config;
    private env;
    isDebugger: boolean;
    baseUrl: string;
    activityId: string;
    task: TaskBus;
    fetchCore: any;
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