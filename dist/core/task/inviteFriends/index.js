var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { httpConfig } from "../../../config/http.config";
import { eventMissionType } from "../../../types";
import GrowthCore from "../../../index";
import { getQueryString, setTaskNeededInfo } from "../../../utils/url";
export class InviteFriendsTask {
    constructor(core) {
        this.core = core;
    }
    // 完成邀请助力任务
    completeInviteAssistTask(completeTaskId, shareCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GrowthCore.fetch('POST', httpConfig.API_LIST.completeTask, {
                instanceId: completeTaskId,
                eventType: eventMissionType.INVITE_ASSIST,
                param: {
                    shareCode,
                }
            });
            return res;
        });
    }
    // 分享邀请助力任务
    shareFriends(taskMetaId, completeTaskId, shareCode, extraQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskInfo = {
                    instanceId: completeTaskId,
                    extra: {
                        shareCode: shareCode,
                    },
                };
                const res = yield setTaskNeededInfo(taskMetaId, taskInfo);
                if (res.code === 0) {
                    const { data: { extra: { shareCode }, instanceId } } = res;
                    let path = `https://miniprogram.xiaohongshu.com/miniprogram/entry?shareCode=${shareCode}&instanceid=${instanceId}&activityId=${this.core.activityId}&activityType=${this.core.activityId}`;
                    if (extraQuery) {
                        path += `&${getQueryString(extraQuery)}`;
                    }
                    const strategyUrls = yield GrowthCore.task.getAntiBannedStrategyUrl(path);
                    console.log('原分享路径：', strategyUrls[1]);
                    console.log('应用路径：', strategyUrls[0]);
                    if (strategyUrls[0] !== strategyUrls[1]) {
                        path = strategyUrls[0];
                    }
                    // todo: 降级口令，目前没有这个可能性
                    return Object.assign(Object.assign({}, res), { data: {
                            path,
                        } });
                }
            }
            catch (error) {
                console.error('InviteFriendsTask shareFriends error:', error);
                return error;
            }
        });
    }
}
//# sourceMappingURL=index.js.map