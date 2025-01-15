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
    constructor(core: Core);
    getTaskList(): Promise<any>;
    claimTask(taskMetaId: string): Promise<any>;
    completeTask(instanceId: string, eventType: eventMissionType, params: any): Promise<any>;
    polling(group?: string): Promise<any>;
    queryRecord(limit: number): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map