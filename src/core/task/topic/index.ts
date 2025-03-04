import { TaskStatus } from "src/types/task";
import { setTaskNeededInfo, handleOnlyView, handleViewWithCountParams } from "../../../utils/url";

export class TopicTask {
<<<<<<< HEAD
  async viewTask(id: string, taskMetaInfo: Record<string, any>) {
=======
  async viewTopic(id: string, taskId?: string, viewTaskType?: string, pageId?: Array<string>, timeLimit?: Record<string, any>) {
>>>>>>> a4eaeb2 (feat: 更新代码入参和文档)
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

<<<<<<< HEAD
        const fliteredTriggerMetaData = res.data?.triggerMeta
        const { triggerCondition = [], viewAttribute = {}, action = 'SIMPLE_VIEW' } = fliteredTriggerMetaData
=======
        const { triggerCondition, viewAttribute = {}, action = 'SIMPLE_VIEW' } = res.data?.triggerMeta || {}
>>>>>>> a4eaeb2 (feat: 更新代码入参和文档)
        switch (action) {
          case 'SIMPLE_VIEW':
            return handleOnlyView(triggerCondition, res.data.instanceId)
          case 'VIEW_COUNT_NUM':
            return handleViewWithCountParams(res.data.instanceId, viewAttribute, 2, res.data.taskStatus)
          case 'VIEW_COUNT_TIME':
            return handleViewWithCountParams(res.data.instanceId, viewAttribute, 1, res.data.taskStatus)
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
