import { handleGoWithCountView, countPageBaseUrl } from "../../../utils/url";
import { eventMissionType } from "../../../types";
import GrowthCore from "../../../index";
export class TopicTask {
    async viewTopic(pageId, taskMetaId, params) {
        var _a;
        const res = await GrowthCore.task.claimTask(taskMetaId);
        console.log("🚀 ~ TopicTask ~ viewTopic ~ res:", res);
        console.log('pageId', pageId);
        if (res.code === 0) {
            const queryParams = encodeURIComponent(Object.entries({
                activityId: GrowthCore.activityId,
                eventType: eventMissionType.NOTE_BROWSE,
                instanceId: (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.instanceId,
                times: params === null || params === void 0 ? void 0 : params.totalSize,
                asc: 0,
                totalSize: params === null || params === void 0 ? void 0 : params.totalSize,
                token: GrowthCore.getRequestToken(),
            })
                .map(([key, value]) => `${key}=${value}`)
                .join('&'));
            const path = `www.xiaohongshu.com/page/topics/${pageId}`;
            const statsBasePath = countPageBaseUrl(true || GrowthCore.isDebugger);
            console.log("🚀 ~ TopicTask ~ viewTopic ~ GrowthCore.isDebugger:", GrowthCore.isDebugger);
            const statsPath = `${statsBasePath}?${queryParams}`;
            console.log("🚀 ~ TopicTask ~ viewTopic ~ statsPath:", statsPath);
            handleGoWithCountView(statsPath, path);
        }
        return res;
    }
}
