import { Core } from "../../../index";
export declare class InviteFriendsTask {
    core: Core;
    constructor(core: Core);
    completeInviteAssistTask(instanceId: string, shareCode: string): Promise<any>;
    shareFriends(taskMetaId: string, extraQuery?: any): Promise<string | {
        code: any;
        message: any;
    }>;
}
//# sourceMappingURL=index.d.ts.map