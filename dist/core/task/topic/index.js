var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { eventMissionType } from "../../../types";
import GrowthCore, { go } from "../../../index";
export class TopicTask {
    viewTopic(taskMetaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GrowthCore.task.claimTask(taskMetaId);
            console.log("🚀 ~ TopicTask ~ viewTopic ~ res:", res);
            if (res.code === 0) {
                const triggerCondition = JSON.parse(res.data.triggerMeta.triggerCondition)[0];
                const path = `www.xiaohongshu.com/page/topics/${triggerCondition}`;
                const microAppUrl = `xhsdiscover://webview/${path}`;
                console.log("🚀 ~ TopicTask ~ viewTopic ~ microAppUrl:", microAppUrl);
                go(microAppUrl, {
                    type: 'deeplink',
                });
                const completeRes = yield GrowthCore.task.completeTask(res.data.instanceId, eventMissionType.NOTE_BROWSE, {});
                console.log("🚀 ~ TopicTask ~ viewTopic ~ completeRes:", completeRes);
                return completeRes;
            }
            return {
                code: -200,
                msg: '领取任务失败',
            };
        });
    }
}
//# sourceMappingURL=index.js.map