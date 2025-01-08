import { Config } from './types';
export declare class Core {
    private config;
    private env;
    task: any;
    constructor();
    init(config: Config): void;
    go(path: string, params?: object): any;
    fetch(method: string, url: string, data?: object, header?: object): any;
}
declare const _default: Core;
export default _default;
//# sourceMappingURL=index.d.ts.map