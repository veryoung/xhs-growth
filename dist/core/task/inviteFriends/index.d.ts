import { Core } from "../../../index";
export declare class InviteFriendsTask {
    core: Core;
    constructor(core: Core);
    completeInviteAssistTask(taskId: string, shareCode: string): Promise<any>;
    shareFriends(id: string, extraQuery?: any, taskId?: string, shareCode?: string): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map