import { eventMissionType, ItriggerMeta } from "../../../types";
import GrowthCore, { go } from "../../../index";
import { setTaskNeedInfo, filterTriggerMetaData, handleOnlyView } from "../../../utils/url";

export class TopicTask {
  async viewTopic(taskMetaId: string, triggerMetaInfo?: ItriggerMeta) {
    try {
      const res = await setTaskNeedInfo(taskMetaId, triggerMetaInfo)
      console.log("🚀 ~ TopicTask ~ viewTopic ~ res:", res)
      
      if (res.code === 0) {
        if (!res.data?.triggerMeta) {
          return {
            code: -406,
            msg: '任务领取错误',
          }
        }
        const fliteredTriggerMetaData = filterTriggerMetaData(res.data?.triggerMeta)
        const { triggerCondition, viewAttribute = {}, action = 'ONLY_VIEW' } = fliteredTriggerMetaData
        switch (action) {
          case 'ONLY_VIEW':
            return handleOnlyView(triggerCondition, res.data.instanceId)
          case 'VIEW_COUNT_NUM':
            return {}
          case 'VIEW_COUNT_TIME':
            return {}
        }
      }
      
      return {
        code: res.code || -200,
        msg: res.msg || '领取任务失败',
      }
    } catch (error) {
      console.error('TopicTask viewTopic error:', error)
      return error
    }
  }
}
