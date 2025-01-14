import { handleGoWithCountView, countPageBaseUrl } from "../../../utils/url";
import { eventMissionType } from "../../../types";
import GrowthCore from "../../../index";

export class TopicTask {
  async viewTopic(pageId: string, taskMetaId: string, params: any) {
    const res = await GrowthCore.task.claimTask(taskMetaId)
    console.log("🚀 ~ TopicTask ~ viewTopic ~ res:", res)
    console.log('pageId', pageId)
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
  }
}
