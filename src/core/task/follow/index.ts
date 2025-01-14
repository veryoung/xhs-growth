import GrowthCore from "../../../index";

export class FollowTask {
  /** 关注 */
  async takeFollow(accountId: string, taskMetaId: string) {
    const res = await GrowthCore.task.claimTask(taskMetaId)
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e8f21f8 (feat: lastEdition)
    if (res.code === 0) {
      console.log("🚀 ~ FollowTask ~ takeFollow ~ res:", res)
    }
    return res
<<<<<<< HEAD
=======
    console.log("🚀 ~ FollowTask ~ takeFollow ~ res:", res)
>>>>>>> 949e608 (feat: 修改任务实现)
=======
>>>>>>> e8f21f8 (feat: lastEdition)
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
