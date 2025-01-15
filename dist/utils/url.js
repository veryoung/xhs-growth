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
    return isDebugger ? 'https://yingzheng.beta.xiaohongshu.com/growth' : 'https://yingzheng.xiaohongshu.com/growth';
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
//# sourceMappingURL=url.js.map