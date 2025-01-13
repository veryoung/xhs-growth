<<<<<<< HEAD
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
=======
import { go } from "../../../index";
export class TopicTask {
    viewTopic(pageId, params) {
        console.log('pageId', pageId);
        const path = `https://www.xiaohongshu.com/page/topics/${pageId}?fullscreen=true&naviHidden=yes`;
        console.log("🚀 ~ TopicTask ~ viewTopic ~ path:", path);
        go(path, {
            type: 'url',
            success: (res) => {
                console.log('success', res);
            },
            fail: (res) => {
                console.log('fail', res);
            },
            complete: (res) => {
                console.log('complete', res);
            }
        });
        const queryParams = new URLSearchParams(Object.assign(Object.assign(Object.assign(Object.assign({ activityId: 'xyxiaomaibu', taskId: '3124', taskType: 'TOPIC_NOTE_BROWSE' }, ((params === null || params === void 0 ? void 0 : params.times) && { times: params.times.toString() })), ((params === null || params === void 0 ? void 0 : params.source) && { source: params.source })), ((params === null || params === void 0 ? void 0 : params.asc) && { asc: params.asc.toString() })), ((params === null || params === void 0 ? void 0 : params.totalSize) && { totalSize: params.totalSize.toString() }))).toString();
        const statsPath = `https://yingzheng.xiaohongshu.com/overview?${queryParams}`;
        console.log("🚀 ~ TopicTask ~ viewTopic ~ statsPath:", statsPath);
        go(statsPath, { type: 'url' });
>>>>>>> b932bf8 (feat: 修复发布问题)
    }
}
