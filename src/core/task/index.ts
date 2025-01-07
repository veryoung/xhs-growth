import Core from '../../index';
import { FollowTask } from './follow/index';

export class TaskBus {
  private core: typeof Core;
  public follow: FollowTask;

  constructor(core: typeof Core) {
    this.core = core;
    this.follow = new FollowTask(this);
  }
}