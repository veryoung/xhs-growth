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
    getTaskList(): Promise<any>;
    claimTask(taskMetaId: string): Promise<any>;
    completeTask(instanceId: string, eventType: eventMissionType, params: any): Promise<any>;
    private polling;
    queryRecord(limit: number): Promise<any>;
    startNotification(callback: (notification: Notification) => any): void;
    getAntiBannedStrategyUrl(url: string, needRealUrl?: boolean): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map