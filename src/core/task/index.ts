import {Core} from '../../index';
import { FollowTask } from './follow/index';

export class TaskBus extends Core  {
  public follow: FollowTask;

  constructor() {
    super();
    this.follow = new FollowTask(this);
  }
}