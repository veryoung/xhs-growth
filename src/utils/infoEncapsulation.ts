import { TaskType } from "../types/task";

export const infoEncapsulation = (type: TaskType, item: any) => {
  switch (type) {
    // 话题笔记发布
    case TaskType.TOPIC_NOTE_PUBLISH:
      return {
        topicId: JSON.parse(item.triggerMeta.triggerCondition ?? '[]'),
      }
    // 邀请助力
    case TaskType.INVITE_ASSISTANCE_LIMIT:
      return {
        shareCode: item.extra.shareCode,
      }
    // 话题笔记浏览
    case TaskType.TOPIC_NOTE_BROWSE:
      return {
        viewTaskType: item.triggerMeta.action,
        pageId: JSON.parse(item.triggerMeta.triggerCondition ?? '[]'),
        timeLimit: JSON.parse(item.triggerMeta.viewAttribute ?? '{}'),
      }
    // 关注用户
    case TaskType.FOLLOW_USER:
      return {
        userId: JSON.parse(item.triggerMeta.triggerCondition ?? '[]'),
      }
    // 搜索笔记
    case TaskType.SEARCH_NOTE:
      return {
        keyword: JSON.parse(item.triggerMeta.triggerCondition ?? '[]'),
      }
    // 笔记点赞
    case TaskType.NOTE_LIKE:
      return {}
    default:
      throw new Error(`不支持的任务类型,请联系默风进行排查: ${type}`)
  }
}
