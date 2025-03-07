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
    completeInviteAssistTask(taskId, shareCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GrowthCore.fetch('POST', httpConfig.API_LIST.completeTask, {
                instanceId: taskId,
                eventType: eventMissionType.INVITE_ASSIST,
                param: {
                    shareCode,
                }
            });
            return res;
        });
    }
    shareFriends(id, taskId, shareCode, extraQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskInfo = {
                    instanceId: taskId,
                    extra: {
                        shareCode: shareCode,
                    },
                };
                const res = yield setTaskNeededInfo(id, taskInfo);
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
