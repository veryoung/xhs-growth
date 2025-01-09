import { NavigateParams, EnvConfig } from "../../types";
export default class MiniProgramEnv {
    private fetchCore;
    private coreBaseUrl;
    private activityId;
    private requestToken;
    constructor(config: EnvConfig);
    go(path: string, params?: NavigateParams): void;
    fetch(method: string, url: string, data?: object, header?: object): Promise<any>;
    init(): Promise<void>;
    authorization(code: string): Promise<any>;
    getUserType(): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map