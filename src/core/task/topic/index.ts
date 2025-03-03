import { ITaskInfo } from "../../../types";
import { setTaskNeededInfo, handleOnlyView, handleViewWithCountParams } from "../../../utils/url";

export class TopicTask {
  async viewTopic(taskMetaId: string, completeTaskId?: string, viewTaskType?: string, pageId?: Array<string>, timeLimit?: Record<string, any>) {
    try {
      const taskInfo = {
        instanceId: completeTaskId,
        triggerMeta: {
          action: viewTaskType,
          triggerCondition: pageId,
          viewAttribute: timeLimit,
        },
      }
      const res = await setTaskNeededInfo(taskMetaId, taskInfo)
      console.log("🚀 ~ TopicTask ~ viewTopic ~ res:", res)
      
      if (res.code === 0) {
        if (!res.data?.triggerMeta) {
          return {
            code: -406,
            msg: '任务领取错误',
          }
        }

        const fliteredTriggerMetaData = res.data?.triggerMeta
        const { triggerCondition, viewAttribute = {}, action = 'SIMPLE_VIEW' } = fliteredTriggerMetaData
        switch (action) {
          case 'SIMPLE_VIEW':
            return handleOnlyView(triggerCondition, res.data.instanceId)
          case 'VIEW_COUNT_NUM':
            return handleViewWithCountParams(res.data.instanceId, viewAttribute, 2)
          case 'VIEW_COUNT_TIME':
            return handleViewWithCountParams(res.data.instanceId, viewAttribute, 1)
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
