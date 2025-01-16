import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
import { eventMissionType, Notification } from '../../types';
import { Core } from '../../index';
export declare class TaskBus {
    core: Core;
    follow: FollowTask;
    publishNotes: PublishNotesTask;
    inviteFriends: InviteFriendsTask;
    topic: TopicTask;
    constructor(core: Core);
    /** 获取任务列表 */
    getTaskList(): Promise<any>;
    claimTask(taskMetaId: string): Promise<any>;
    completeTask(instanceId: string, eventType: eventMissionType, params: any): Promise<any>;
    /** 轮询任务 */
    polling(group?: string): Promise<any>;
    /** 查询任务记录 */
    queryRecord(limit: number): Promise<any>;
    /** 轮询任务完成通知 */
    startNotification(callback: (notification: Notification) => any): void;
}
//# sourceMappingURL=index.d.ts.map