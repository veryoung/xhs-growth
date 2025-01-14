import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
export declare class TaskBus {
    follow: FollowTask;
    publishNotes: PublishNotesTask;
    inviteFriends: InviteFriendsTask;
    topic: TopicTask;
    constructor();
    getTaskList(): Promise<any>;
    claimTask(taskMetaId: string): Promise<any>;
    polling(group?: string): Promise<any>;
    queryRecord(limit: number): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map