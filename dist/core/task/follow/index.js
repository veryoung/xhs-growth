<<<<<<< HEAD
import GrowthCore from "../../../index";
export class FollowTask {
    /** 关注 */
    async takeFollow(accountId, taskMetaId) {
        const res = await GrowthCore.task.claimTask(taskMetaId);
        console.log("🚀 ~ FollowTask ~ takeFollow ~ res:", res);
        // go(`xhsdiscover://user/${accountId}`, {
        //   type: 'deeplink',
        //   success: (res: any) => {
        //     console.log('success', res)
        //   },
        //   fail: (res: any) => {
        //     console.log('fail', res)
        //   },
        //   complete: (res: any) => {
        //     console.log('complete', res)
        //   }
        // });
    }
    /** 取消关注 */
=======
import { go } from "../../../index";
export class FollowTask {
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
>>>>>>> b932bf8 (feat: 修复发布问题)
    cancelFollow() {
        console.log("Cancel follow task");
    }
}
