import { TaskStatus } from "../../../types/task";
export declare class FollowTask {
<<<<<<< HEAD
    takeFollow(id: string, taskId: string, userId: Array<string>, status: TaskStatus, goUserPage?: boolean): Promise<{
=======
    takeFollow(id: string, taskId?: string, goUserPage?: boolean, userId?: Array<string>): Promise<{
>>>>>>> a4eaeb2 (feat: 更新代码入参和文档)
        code: any;
        msg: any;
    } | undefined>;
}
//# sourceMappingURL=index.d.ts.map