import { Config } from './types';
import { TaskBus } from './core/task';
import { BenefitBus } from './core/benifit';
declare class Core {
    private config;
    private env;
    task: TaskBus;
    benefit: BenefitBus;
    constructor();
    init(config: Config): void;
    go(path: string, params?: object): any;
}
declare const _default: Core;
export default _default;
//# sourceMappingURL=index.d.ts.map