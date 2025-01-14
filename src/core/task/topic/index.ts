import { handleGoWithCountView } from "../../../utils/url";
import { getActivityId, getRequestToken, claimTask } from "../../../index";
import { eventMissionType } from "../../../types";
export class TopicTask {

  viewTopic(pageId: string, params: any) {
    claimTask({
      instanceId: params?.instanceId,
      eventType: eventMissionType.NOTE_BROWSE,
      param: {},
    })
    console.log('pageId', pageId)
    const queryParams = encodeURIComponent(JSON.stringify({
      activityId: getActivityId(),
      eventType: eventMissionType.NOTE_BROWSE,
      instanceId: params?.instanceId,
      times: 0,
      asc: 1,
      totalSize: params?.totalTime,
      token: getRequestToken(),
    }));
    const path = `www.xiaohongshu.com/page/topics/${pageId}`
    const statsPath = `https://yingzheng.xiaohongshu.com/growth?${queryParams}`;
    handleGoWithCountView(statsPath, path)
  }
}

