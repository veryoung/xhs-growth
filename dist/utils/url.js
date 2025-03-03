var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { go } from "../index";
import GrowthCore from "../index";
import { eventMissionType } from "../types/index";
export const handleGoWithCountView = (url, h5Url) => {
    const targetURL = `xhsdiscover://webview/${h5Url}?fullscreen=true&naviHidden=yes&widget_size=60.60&widget_position=0.24&openPage=yes&widget_url=${url}`;
    // todo: 实现跳转
    console.log("🚀 ~ handleGoWithCountView ~ targetURL:", targetURL);
    go(targetURL, {
        type: 'deeplink',
        success: (res) => {
            return res;
        },
        fail: (res) => {
            return res;
        },
        complete: (res) => {
            return res;
        }
    });
};
export const countPageBaseUrl = (isDebugger) => {
    return isDebugger ? 'https://miniprogram.beta.xiaohongshu.com/growth' : 'https://miniprogram.xiaohongshu.com/growth';
};
export const getQueryString = (query) => {
    return Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
};
function countTimePageLogic(res, params) {
    var _a;
    const pageId = res.data.triggerMeta.triggerCondition;
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
    const statsBasePath = countPageBaseUrl(GrowthCore.isDebugger);
    console.log("🚀 ~ TopicTask ~ viewTopic ~ GrowthCore.isDebugger:", GrowthCore.isDebugger);
    const statsPath = `${statsBasePath}?${queryParams}`;
    console.log("🚀 ~ TopicTask ~ viewTopic ~ statsPath:", statsPath);
    handleGoWithCountView(statsPath, path);
}
export const setTaskNeededInfo = (taskMetaId, taskInfo) => __awaiter(void 0, void 0, void 0, function* () {
    let res = {};
    if (((taskInfo === null || taskInfo === void 0 ? void 0 : taskInfo.instanceId) || '0') !== '0') {
        res = {
            code: 0,
            data: {
                triggerMeta: taskInfo === null || taskInfo === void 0 ? void 0 : taskInfo.triggerMeta,
                extra: taskInfo === null || taskInfo === void 0 ? void 0 : taskInfo.extra,
                instanceId: taskInfo === null || taskInfo === void 0 ? void 0 : taskInfo.instanceId,
            },
            msg: 'triggerMetaInfoValid'
        };
        console.log('origin res: ', res);
        return res;
    }
    return yield GrowthCore.task.claimTask(taskMetaId);
});
export const filterTriggerMetaData = (triggerMeta) => {
    const result = {};
    if (!triggerMeta)
        return result;
    Object.entries(triggerMeta).forEach(([key, value]) => {
        try {
            result[key] = JSON.parse(value);
        }
        catch (e) {
            // 如果不是 JSON 字符串，直接使用原值
            result[key] = value;
        }
    });
    return result;
};
export const handleOnlyView = (triggerCondition, instanceId) => __awaiter(void 0, void 0, void 0, function* () {
    const path = `www.xiaohongshu.com/page/topics/${triggerCondition[0]}`;
    const microAppUrl = `xhsdiscover://webview/${path}`;
    console.log("🚀 ~ handleOnlyView ~ microAppUrl:", microAppUrl);
    go(microAppUrl, {
        type: 'deeplink',
    });
    const completeRes = yield GrowthCore.task.completeTask(instanceId, eventMissionType.NOTE_BROWSE, {});
    console.log("🚀 ~ handleOnlyView ~ completeRes:", completeRes);
    return completeRes;
});
export const handleViewWithCountParams = (instanceId, viewAttribute, actionNum) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrlForView = 'xhsdiscover://rn/growthfeeds?';
    const queryParams = Object.entries({
        activityId: GrowthCore.activityId,
        singleMaxCount: viewAttribute.singleNoteViewTime,
        taskId: instanceId,
        taskType: actionNum,
        totalSize: viewAttribute.totalSize,
        type: 'xhsCore',
        token: GrowthCore.getRequestToken(),
        fullscreen: 'true',
        disableNativeLoading: 'yes',
    })
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    const path = `${baseUrlForView}${queryParams}`;
    console.log("🚀 ~ handleViewNum ~ path:", path);
    go(path, {
        type: 'deeplink',
    });
});
//# sourceMappingURL=url.js.map