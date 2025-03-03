import { TaskStatus } from "../../../types/task";
import GrowthCore, { go } from "../../../index";
import { setTaskNeededInfo, filterTriggerMetaData } from "../../../utils/url";

export class FollowTask {
  /** 关注 */
  async takeFollow(taskMetaId: string, isAutoFollow: boolean = true, completeTaskId?: string, userId?: Array<string>) {
    try {
      const taskInfo = {
        instanceId: completeTaskId,
        triggerMeta: {
          triggerCondition: userId,
        },
      }
      const res = await setTaskNeededInfo(taskMetaId, taskInfo)
      if (res.code === 0) {
        const { taskStatus, triggerMeta = {} } = res.data
        if(taskStatus === TaskStatus.UNFINISHED && isAutoFollow && triggerMeta) { 
          const ids = triggerMeta?.triggerCondition
          go(`xhsdiscover://user/${ids[0]}`, {
            type: 'deeplink',
            success: (res) => {
              return {
                code: res.code,
                msg: res.msg,
              }
            },
            fail: (err) => {
              return {
                code: -300,
                msg: err.message || '跳转失败',
              }
            }
          });
          return
        }
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
    } catch (error: any) {
      return {
        code:  -200,
        msg: error?.message || '领取任务失败',
      }
    }
  }
}
