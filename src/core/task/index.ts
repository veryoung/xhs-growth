import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';

export class TaskBus {
  public follow: FollowTask;
  public publishNotes: PublishNotesTask;
  public inviteFriends: InviteFriendsTask;

  constructor() {
    this.follow = new FollowTask();
    this.publishNotes = new PublishNotesTask();
    this.inviteFriends = new InviteFriendsTask();
  }
}