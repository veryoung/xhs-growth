import { httpConfig } from "../../../config/http.config";
import { fetch, go } from "../../../index";
import { eventMissionType } from "../../../types";
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
    // 完成关注任务
    async completeFollowTask(instanceId) {
        const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
            instanceId: instanceId,
            eventType: eventMissionType.FOLLOW_USER,
        });
        return res;
    }
    /** 取消关注 */
    cancelFollow() {
        console.log("Cancel follow task");
    }
}
