import { TaskBus } from "../index";

export class FollowTask extends TaskBus {
  private taskBus: TaskBus;

  constructor(taskBus: TaskBus) {
    super();
    this.taskBus = taskBus;
  }

  /** 关注 */
  takeFollow(accountId: string) {
    this.go('xhsdiscover://user/${accountId}');
    // this.go('xhsdiscover://user/${accountId}');
    // this.taskBus.fetch('', 'POST', {
    //   accountId: accountId
    // }, {});
  }

  /** 取消关注 */
  cancelFollow() {
    console.log("Cancel follow task");
    // 实现专注任务的取消逻辑
  }
}
