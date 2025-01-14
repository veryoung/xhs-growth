import GrowthCore from "../../../index";
export class FollowTask {
    /** 关注 */
    async takeFollow(accountId, taskMetaId) {
        const res = await GrowthCore.task.claimTask(taskMetaId);
        if (res.code === 0) {
            console.log("🚀 ~ FollowTask ~ takeFollow ~ res:", res);
        }
        return res;
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
    cancelFollow() {
        console.log("Cancel follow task");
    }
}
