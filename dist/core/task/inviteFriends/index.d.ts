import { Core } from "../../../index";
export declare class InviteFriendsTask {
    core: Core;
    constructor(core: Core);
    completeInviteAssistTask(taskId: string, shareCode: string): Promise<any>;
<<<<<<< HEAD
    shareFriends(id: string, taskId: string, shareCode: string, extraQuery?: any): Promise<any>;
=======
    shareFriends(id: string, extraQuery?: any, taskId?: string, shareCode?: string): Promise<any>;
>>>>>>> a4eaeb2 (feat: 更新代码入参和文档)
}
//# sourceMappingURL=index.d.ts.map