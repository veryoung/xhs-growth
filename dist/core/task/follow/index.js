import { fetch, go } from "../../../index";
export class FollowTask {
    /** 关注 */
    takeFollow(accountId) {
        go(`xhsdiscover://user/${accountId}`);
    }
    getFollowInfo(accountId) {
        fetch('POST', `https://api.xhsdiscover.com/v1/user/info`, {
            accountId: accountId
        }, {
            'Content-Type': 'application/json'
        });
    }
    /** 取消关注 */
    cancelFollow() {
        console.log("Cancel follow task");
        // 实现专注任务的取消逻辑
    }
}
//# sourceMappingURL=index.js.map