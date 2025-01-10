import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
export class TaskBus {
    constructor() {
        this.follow = new FollowTask();
        this.publishNotes = new PublishNotesTask();
        this.inviteFriends = new InviteFriendsTask();
        this.topic = new TopicTask();
    }
}
//# sourceMappingURL=index.js.map