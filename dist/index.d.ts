import { TaskBus } from './core/task';
import { Config } from './types';
export declare class Core {
    private config;
    private env;
    task: TaskBus;
    fetchCore: any;
    constructor();
    init(config: Config): void;
    go(path: string, params?: object): any;
    fetch(method: string, url: string, data?: object, header?: object): any;
}
/** 导出跳转方法 */
export declare const go: (path: string, params?: object) => any;
/** 导出请求方法 */
export declare const fetch: (method: string, url: string, data?: object, header?: object) => any;
declare const _default: Core;
export default _default;
//# sourceMappingURL=index.d.ts.map