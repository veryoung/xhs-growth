import { go } from "../../../index";
export class FollowTask {
    /** 关注 */
    takeFollow(accountId) {
        go(`xhsdiscover://user/${accountId}`, {
            type: 'deeplink',
            success: (res) => {
                console.log('success', res);
            },
            fail: (res) => {
                console.log('fail', res);
            },
            complete: (res) => {
                console.log('complete', res);
            }
        });
    }
    /** 取消关注 */
    cancelFollow() {
        console.log("Cancel follow task");
    }
}
