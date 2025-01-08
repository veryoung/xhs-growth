import { TaskBus } from "../index";
export class FollowTask extends TaskBus {
    constructor(taskBus) {
        super();
        this.taskBus = taskBus;
    }
    /** 关注 */
    takeFollow(accountId) {
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
//# sourceMappingURL=index.js.map