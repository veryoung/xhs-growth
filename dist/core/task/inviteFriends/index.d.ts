import { Core } from "../../../index";
export declare class InviteFriendsTask {
    core: Core;
    constructor(core: Core);
    completeInviteAssistTask(completeTaskId: string, shareCode: string): Promise<any>;
    shareFriends(taskMetaId: string, completeTaskId?: string, shareCode?: string, extraQuery?: any): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map