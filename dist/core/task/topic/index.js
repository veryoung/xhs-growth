import { handleGoWithCountView, countPageBaseUrl } from "../../../utils/url";
import { eventMissionType } from "../../../types";
import GrowthCore from "../../../index";
export class TopicTask {
    async viewTopic(pageId, taskMetaId, params) {
        const res = await GrowthCore.task.claimTask(taskMetaId);
        console.log("🚀 ~ TopicTask ~ viewTopic ~ res:", res);
        console.log('pageId', pageId);
        const queryParams = encodeURIComponent(Object.entries({
            activityId: GrowthCore.activityId,
            eventType: eventMissionType.NOTE_BROWSE,
            instanceId: params === null || params === void 0 ? void 0 : params.instanceId,
            times: params === null || params === void 0 ? void 0 : params.totalSize,
            asc: 1,
            totalSize: params === null || params === void 0 ? void 0 : params.totalSize,
            token: GrowthCore.getRequestToken(),
        })
            .map(([key, value]) => `${key}=${value}`)
            .join('&'));
        const path = `www.xiaohongshu.com/page/topics/${pageId}`;
        const statsBasePath = countPageBaseUrl(GrowthCore.isDebugger);
        const statsPath = `${statsBasePath}?${queryParams}`;
        handleGoWithCountView(statsPath, path);
    }
}
