var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { handleGoWithCountView, countPageBaseUrl } from "../../../utils/url";
import { eventMissionType } from "../../../types";
import GrowthCore from "../../../index";
export class TopicTask {
    viewTopic(pageId, taskMetaId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const res = yield GrowthCore.task.claimTask(taskMetaId);
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
        });
    }
}
//# sourceMappingURL=index.js.map