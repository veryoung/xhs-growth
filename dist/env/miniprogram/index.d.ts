import { NavigateParams, EnvConfig, UserType } from "../../types";
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
    setAuthorization(code: string): Promise<void>;
    getUserType(): Promise<UserType | ''>;
    getActivityId(): string;
    getRequestToken(): any;
}
//# sourceMappingURL=index.d.ts.map