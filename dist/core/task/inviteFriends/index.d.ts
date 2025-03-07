import { Core } from "../../../index";
export declare class InviteFriendsTask {
    core: Core;
    constructor(core: Core);
    completeInviteAssistTask(taskId: string, shareCode: string): Promise<any>;
    shareFriends(id: string, taskId: string, shareCode: string, extraQuery?: any): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map