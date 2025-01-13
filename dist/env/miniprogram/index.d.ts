import { NavigateParams, EnvConfig } from "../../types";
export default class MiniProgramEnv {
    private fetchCore;
    private coreBaseUrl;
    private activityId;
    private requestToken;
    constructor(config: EnvConfig);
    go(path: string, params?: NavigateParams): void;
    fetch(method: string, url: string, data?: object, header?: object): Promise<unknown>;
    init(): Promise<void>;
    setAuthorization(code: string): Promise<void>;
    getUserType(): Promise<string>;
<<<<<<< HEAD
    getActivityId(): string;
    getRequestToken(): any;
=======
>>>>>>> 584cd82 (feat: changeToPromiseType)
}
//# sourceMappingURL=index.d.ts.map