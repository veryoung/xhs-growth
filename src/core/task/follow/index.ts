import { TaskStatus } from "../../../types/task";
import { go } from "../../../index";
import { setTaskNeededInfo } from "../../../utils/url";

export class FollowTask {
  /** 关注 */
  async takeFollow(id: string, taskId: string, isAutoFollow: boolean = true, userId: Array<string>, status: TaskStatus) {
    try {
      const taskInfo = {
        instanceId: taskId,
        triggerMeta: {
          triggerCondition: userId,
        },
        taskStatus: status,
      }
      const res = await setTaskNeededInfo(id, taskInfo)
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
