var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { go } from "../../../index";
import { genCapaPostDeeplink } from "./capa";
import { setTaskNeededInfo } from "../../../utils/url";
export class PublishNotesTask {
    constructor(core) {
        this.core = core;
    }
    onlyPublish(topicIdList) {
        return __awaiter(this, void 0, void 0, function* () {
            const idStr = topicIdList === null || topicIdList === void 0 ? void 0 : topicIdList.map((item) => ({ page_id: item.trim() }));
            const publishNotePage = genCapaPostDeeplink({
                attach: { topics: idStr },
                config: {
                    is_post_jump: 0,
                },
            });
            go(publishNotePage, {
                type: 'deeplink',
                fail: (err) => {
                    console.log('error', err);
                }
            });
        });
    }
    publish(id, taskId, topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const taskInfo = {
                    instanceId: taskId,
                    triggerMeta: {
                        triggerCondition: topicId,
                    },
                };
                const res = yield setTaskNeededInfo(id, taskInfo);
                if (res.code !== 0) {
                    return res;
                }
                const url = `miniprogram.xiaohongshu.com/miniprogram/${this.core.activityId}/${Math.random().toString(36).slice(2)}/entry?activityId=${this.core.activityId}&activityType=${this.core.activityId}`;
                const topicIds = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.triggerMeta) === null || _b === void 0 ? void 0 : _b.triggerCondition;
                const idStr = topicIds === null || topicIds === void 0 ? void 0 : topicIds.map((id) => ({ page_id: id.trim() }));
                const publishNotePage = genCapaPostDeeplink({
                    attach: { topics: idStr },
                    config: {
                        is_post_jump: 0,
                        callback: `xhsdiscover://webview/${url}&from=post`,
                    },
                });
                go(publishNotePage, {
                    type: 'deeplink',
                    fail: (err) => {
                        console.log('error', err);
                    }
                });
            }
            catch (error) {
                console.error('PublishNotesTask publish error:', error);
                return error;
            }
        });
    }
}
