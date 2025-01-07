export class FollowTask {
    constructor(taskBus) {
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
//# sourceMappingURL=index.js.map