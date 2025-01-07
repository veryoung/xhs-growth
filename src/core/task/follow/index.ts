import { TaskBus } from "../index";

export class FollowTask {
  private taskBus: TaskBus;

  constructor(taskBus: TaskBus) {
    this.taskBus = taskBus;
  }

  /** 关注 */
  takeFollow() {
    console.log("take focus task");
  }

  /** 取消关注 */
  cancelFollow() {
    console.log("Cancel follow task");
    // 实现专注任务的取消逻辑
  }
}
