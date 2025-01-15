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
import { getQueryString } from "../../../utils/url";
export class InviteFriendsTask {
    constructor(core) {
        this.core = core;
    }
    completeInviteAssistTask(instanceId, shareCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GrowthCore.fetch('POST', httpConfig.API_LIST.completeTask, {
                instanceId,
                eventType: eventMissionType.INVITE_ASSIST,
                param: {
                    shareCode,
                }
            });
            return res;
        });
    }
    shareFriends(taskMetaId, extraQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GrowthCore.task.claimTask(taskMetaId);
            if (res.code === 0) {
                const { data: { extra: { shareCode }, instanceId } } = res;
                let path = `https://yingzheng.xiaohongshu.com/miniprogram?shareCode=${shareCode}&instanceid=${instanceId}&activityId=${this.core.activityId}&activityType=${this.core.activityId}`;
                if (extraQuery) {
                    path += `&${getQueryString(extraQuery)}`;
                }
                return Object.assign(Object.assign({}, res), { data: {
                        path,
                    } });
            }
            return res;
        });
    }
}
