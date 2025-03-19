var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** 携带挂件进行跳转 */
import { go } from "../index";
import GrowthCore from "../index";
import { eventMissionType } from "../types/index";
import { TaskStatus } from "../types/task";
export const handleGoWithCountView = (url, h5Url) => {
    const targetURL = `xhsdiscover://webview/${h5Url}?fullscreen=true&naviHidden=yes&widget_size=60.60&widget_position=0.24&openPage=yes&widget_url=${url}`;
    // todo: 实现跳转
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
export const setTaskNeededInfo = (id, taskInfo) => __awaiter(void 0, void 0, void 0, function* () {
    let res = {};
    if (taskInfo && taskInfo.instanceId && taskInfo.instanceId !== '0') {
        res = {
            code: 0,
            data: {
                triggerMeta: taskInfo.triggerMeta,
                extra: taskInfo === null || taskInfo === void 0 ? void 0 : taskInfo.extra,
                instanceId: taskInfo.instanceId,
                taskStatus: taskInfo === null || taskInfo === void 0 ? void 0 : taskInfo.taskStatus,
            },
            msg: 'triggerMetaInfoValid'
        };
        return res;
    }
    return yield GrowthCore.task.claimTask(id);
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
    go(microAppUrl, {
        type: 'deeplink',
    });
    const completeRes = yield GrowthCore.task.completeTask(instanceId, eventMissionType.NOTE_BROWSE, {});
    return completeRes;
});
export const handleViewWithCountParams = (instanceId, viewAttribute, actionNum, taskStatus) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const baseUrlForView = 'xhsdiscover://rn/growthfeeds?';
    const queryParams = Object.entries({
        activityId: GrowthCore.activityId,
        singleMaxCount: (_a = viewAttribute.singleNoteViewTime) !== null && _a !== void 0 ? _a : 0,
        taskId: instanceId,
        taskType: actionNum,
        totalSize: (_b = viewAttribute.totalSize) !== null && _b !== void 0 ? _b : 0,
        type: 'xhsCore',
        token: GrowthCore.getRequestToken(),
        fullscreen: 'true',
        needCountWidget: taskStatus === TaskStatus.FINISHED ? 0 : 1,
    })
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    const path = `${baseUrlForView}${queryParams}`;
    go(path, {
        type: 'deeplink',
    });
});
//# sourceMappingURL=url.js.map