import GrowthCore from "../../../index";

export class FollowTask {
  /** 关注 */
  async takeFollow(taskMetaId: string) {
    const res = await GrowthCore.task.claimTask(taskMetaId)
    if (res.code === 0) {
      console.log("🚀 ~ FollowTask ~ takeFollow ~ res:", res)
      return {
        code: res.code,
        msg: res.msg,
      }
    }
    return {
      code: res.code || -200,
      msg: res.msg || '领取任务失败',
    }
  }
}
