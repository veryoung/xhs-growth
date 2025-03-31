import { TaskStatus } from "../../../types/task";
export declare class FollowTask {
    /** 关注 */
    takeFollow(id: string, taskId: string, userId: Array<string>, status: TaskStatus, goUserPage?: boolean): Promise<{
        code: any;
        msg: any;
    } | undefined>;
}
//# sourceMappingURL=index.d.ts.map