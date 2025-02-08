import { TaskBus } from './core/task';
import { Config, NavigateParams } from './types';
export declare class Core {
    private config;
    env: any;
    isDebugger: boolean;
    baseUrl: string;
    activityId: string;
    task: TaskBus;
    fetchCore: any;
    code: string;
    deviceId: string;
    constructor();
    init(config: Config): Promise<this>;
    go(path: string, params?: NavigateParams): any;
    fetch(method: string, url: string, data?: object, header?: object): any;
    getUserType(): Promise<any>;
    setCode(code: string): void;
    getRequestToken(): any;
}
export declare const go: (path: string, params?: NavigateParams) => any;
export declare const getUserType: () => Promise<any>;
export declare const setCode: (code: string) => void;
declare const _default: Core;
export default _default;
//# sourceMappingURL=index.d.ts.map