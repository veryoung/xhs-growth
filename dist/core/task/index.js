import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
export class TaskBus {
    constructor() {
        this.follow = new FollowTask();
        this.publishNotes = new PublishNotesTask();
        this.inviteFriends = new InviteFriendsTask();
    }
}
//# sourceMappingURL=index.js.map