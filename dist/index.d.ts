import { TaskBus } from './core/task';
import { Config, NavigateParams, UserType } from './types';
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
    getCode(force?: boolean): Promise<string>;
    init(config: Config): Promise<this>;
    go(path: string, params?: NavigateParams): any;
    fetch(method: string, url: string, data?: object, header?: object): any;
    getUserType(): Promise<UserType | ''>;
    setCode(code: string): void;
    getRequestToken(): any;
}
export declare const go: (path: string, params?: NavigateParams) => any;
export declare const setCode: (code: string) => void;
export declare const getCode: () => Promise<string>;
declare const _default: Core;
export default _default;
//# sourceMappingURL=index.d.ts.map