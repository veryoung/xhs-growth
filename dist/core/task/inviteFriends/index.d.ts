import { Core } from "../../../index";
export declare class InviteFriendsTask {
    core: Core;
    constructor(core: Core);
    completeInviteAssistTask(completeTaskId: string, shareCode: string): Promise<any>;
    shareFriends(taskMetaId: string, extraQuery?: any, completeTaskId?: string, shareCode?: string): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map