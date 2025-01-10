import { NavigateParams, EnvConfig, eventMissionType } from "../../types";
export default class MiniProgramEnv {
    private fetchCore;
    private coreBaseUrl;
    private activityId;
    private requestToken;
    constructor(config: EnvConfig);
    go(path: string, params?: NavigateParams): void;
    fetch(method: string, url: string, data?: object, header?: object): Promise<unknown>;
    init(): Promise<void>;
    /** 设置授权 */
    setAuthorization(code: string): Promise<void>;
    getUserType(): Promise<unknown>;
    getTaskList(): Promise<unknown>;
    claimTask(taskMetaId: string): Promise<unknown>;
    completeTask(instanceId: string, eventType: eventMissionType, params: any): Promise<unknown>;
    polling(group?: string): Promise<unknown>;
    queryRecord(limit: number): Promise<unknown>;
    inviteCode(): Promise<unknown>;
}
//# sourceMappingURL=index.d.ts.map