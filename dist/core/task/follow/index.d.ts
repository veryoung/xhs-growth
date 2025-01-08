import { TaskBus } from "../index";
export declare class FollowTask extends TaskBus {
    private taskBus;
    constructor(taskBus: TaskBus);
    /** 关注 */
    takeFollow(accountId: string): void;
    /** 取消关注 */
    cancelFollow(): void;
}
//# sourceMappingURL=index.d.ts.map