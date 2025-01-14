import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
import { eventMissionType } from '../../types';
import { Core } from '../../index';
export declare class TaskBus {
    core: Core;
    follow: FollowTask;
    publishNotes: PublishNotesTask;
    inviteFriends: InviteFriendsTask;
    topic: TopicTask;
<<<<<<< HEAD
    constructor();
=======
    constructor(core: Core);
    /** 获取任务列表 */
>>>>>>> 7d7f6f8 (发布笔记改动)
    getTaskList(): Promise<any>;
    claimTask(taskMetaId: string): Promise<any>;
    completeTask(instanceId: string, eventType: eventMissionType, params: any): Promise<any>;
    polling(group?: string): Promise<any>;
    queryRecord(limit: number): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map