<<<<<<< HEAD
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
=======
<<<<<<< HEAD
>>>>>>> e45e8c3 (feat: 修复发布问题)
import { handleGoWithCountView, countPageBaseUrl } from "../../../utils/url";
import { eventMissionType } from "../../../types";
import GrowthCore from "../../../index";
export class TopicTask {
<<<<<<< HEAD
<<<<<<< HEAD
    viewTopic(pageId, taskMetaId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GrowthCore.task.claimTask(taskMetaId);
            console.log("🚀 ~ TopicTask ~ viewTopic ~ res:", res);
            console.log('pageId', pageId);
            const queryParams = encodeURIComponent(Object.entries({
                activityId: GrowthCore.activityId,
                eventType: eventMissionType.NOTE_BROWSE,
                instanceId: params === null || params === void 0 ? void 0 : params.instanceId,
                times: params === null || params === void 0 ? void 0 : params.totalSize,
                asc: 1,
=======
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
>>>>>>> 9d8f8bc (feat: lastEdition)
                totalSize: params === null || params === void 0 ? void 0 : params.totalSize,
                token: GrowthCore.getRequestToken(),
            })
                .map(([key, value]) => `${key}=${value}`)
                .join('&'));
            const path = `www.xiaohongshu.com/page/topics/${pageId}`;
<<<<<<< HEAD
            const statsBasePath = countPageBaseUrl(GrowthCore.isDebugger);
            const statsPath = `${statsBasePath}?${queryParams}`;
            handleGoWithCountView(statsPath, path);
        });
=======
            const statsBasePath = countPageBaseUrl(true || GrowthCore.isDebugger);
            console.log("🚀 ~ TopicTask ~ viewTopic ~ GrowthCore.isDebugger:", GrowthCore.isDebugger);
            const statsPath = `${statsBasePath}?${queryParams}`;
            console.log("🚀 ~ TopicTask ~ viewTopic ~ statsPath:", statsPath);
            handleGoWithCountView(statsPath, path);
        }
        return res;
>>>>>>> 9d8f8bc (feat: lastEdition)
=======
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
>>>>>>> e45e8c3 (feat: 修复发布问题)
    }
}
