import { NavigateParams, EnvConfig } from "../../types";
export default class MiniProgramEnv {
    private fetchCore;
    private coreBaseUrl;
    private activityId;
    private requestToken;
    private deviceId;
    constructor(config: EnvConfig);
    go(path: string, params?: NavigateParams): void;
    fetch(method: string, url: string, data?: object, header?: object): Promise<unknown>;
    init(): Promise<void>;
    /** 设置授权 */
    setAuthorization(code: string): Promise<void>;
    getUserType(): Promise<string>;
    getActivityId(): string;
    getRequestToken(): any;
}
//# sourceMappingURL=index.d.ts.map