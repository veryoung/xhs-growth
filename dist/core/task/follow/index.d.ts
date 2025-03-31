import { TaskStatus } from "../../../types/task";
export declare class FollowTask {
    takeFollow(id: string, taskId: string, userId: Array<string>, status: TaskStatus, goUserPage?: boolean): Promise<{
        code: any;
        msg: any;
    } | undefined>;
}
//# sourceMappingURL=index.d.ts.map