import { TaskStatus } from "src/types/task";
import { setTaskNeededInfo, handleOnlyView, handleViewWithCountParams } from "../../../utils/url";

export class TopicTask {
  async viewTopic(id: string, taskMetaInfo: Record<string, any>) {
    try {
      const { taskId, viewTaskType, pageId, timeLimit, status } = taskMetaInfo
      const taskInfo = {
        instanceId: taskId,
        triggerMeta: {
          action: viewTaskType,
          triggerCondition: pageId,
          viewAttribute: timeLimit,
        },
        taskStatus: status,
      }
      const res = await setTaskNeededInfo(id, taskInfo)
      
      if (res.code === 0) {
        if (!res.data?.triggerMeta) {
          return {
            code: -406,
            msg: '任务领取错误',
          }
        }

        const fliteredTriggerMetaData = res.data?.triggerMeta
        const { triggerCondition = [], viewAttribute = {}, action = 'SIMPLE_VIEW' } = fliteredTriggerMetaData
        if (res.data?.taskStatus === TaskStatus.FINISHED){
          return handleOnlyView(triggerCondition, res.data.instanceId)
        }
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
