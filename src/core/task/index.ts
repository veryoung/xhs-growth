import { FollowTask } from './follow';

export class TaskBus {
  public follow: FollowTask;

  constructor() {
    this.follow = new FollowTask();
  }
}