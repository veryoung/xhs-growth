import { handleGoWithCountView, countPageBaseUrl } from "../../../utils/url";
import { eventMissionType } from "../../../types";
import GrowthCore from "../../../index";

export class TopicTask {
  async viewTopic(pageId: string, taskMetaId: string, params: any) {
    const res = await GrowthCore.task.claimTask(taskMetaId)
    console.log("🚀 ~ TopicTask ~ viewTopic ~ res:", res)
    console.log('pageId', pageId)
<<<<<<< HEAD
    if (res.code === 0) {
      const queryParams = encodeURIComponent(Object.entries({
        activityId: GrowthCore.activityId,
        eventType: eventMissionType.NOTE_BROWSE,
        instanceId: res?.data?.instanceId,
        times: params?.totalSize,
        asc: 0,
        totalSize: params?.totalSize,
        token: GrowthCore.getRequestToken(),
      })
      .map(([key, value]) => `${key}=${value}`)
      .join('&'))
      const path = `www.xiaohongshu.com/page/topics/${pageId}`
      const statsBasePath = countPageBaseUrl(true || GrowthCore.isDebugger)
      console.log("🚀 ~ TopicTask ~ viewTopic ~ GrowthCore.isDebugger:", GrowthCore.isDebugger)
      const statsPath = `${statsBasePath}?${queryParams}`;
      console.log("🚀 ~ TopicTask ~ viewTopic ~ statsPath:", statsPath)
      handleGoWithCountView(statsPath, path)
    }
    return res
=======
    const queryParams = encodeURIComponent(Object.entries({
      activityId: GrowthCore.activityId,
      eventType: eventMissionType.NOTE_BROWSE,
      instanceId: params?.instanceId,
      times: params?.totalSize,
      asc: 1,
      totalSize: params?.totalSize,
      token: GrowthCore.getRequestToken(),
    })
    .map(([key, value]) => `${key}=${value}`)
    .join('&'))
    const path = `www.xiaohongshu.com/page/topics/${pageId}`
    const statsBasePath = countPageBaseUrl(GrowthCore.isDebugger)
    const statsPath = `${statsBasePath}?${queryParams}`;
    handleGoWithCountView(statsPath, path)
>>>>>>> 949e608 (feat: 修改任务实现)
  }
}
