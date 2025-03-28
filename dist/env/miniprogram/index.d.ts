import { NavigateParams, EnvConfig, UserType } from "../../types";
export default class MiniProgramEnv {
    private fetchCore;
    private coreBaseUrl;
    private activityId;
    private requestToken;
    private deviceId;
    private isAuthing;
    private authRetryCount;
    private readonly MAX_AUTH_RETRY_COUNT;
    private authRequests;
    constructor(config: EnvConfig);
    go(path: string, params?: NavigateParams): void;
    fetch(method: string, url: string, data?: object, header?: object): Promise<unknown>;
    init(code?: string, force?: boolean): Promise<string>;
    setAuthorization(code: string, force?: boolean): Promise<string>;
    private executeAuthRequest;
    getUserType(): Promise<UserType | ''>;
    getActivityId(): string;
    getRequestToken(): any;
}
//# sourceMappingURL=index.d.ts.map