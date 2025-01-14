<<<<<<< HEAD
=======
<<<<<<< HEAD
import { httpConfig } from "../../../config/http.config";
import { eventMissionType } from "../../../types";
export class InviteFriendsTask {
    // 完成邀请助力任务
    async completeInviteAssistTask(instanceId, shareCode) {
        const res = await GrowthCore.fetch('POST', httpConfig.API_LIST.completeTask, {
            instanceId,
            eventType: eventMissionType.INVITE_ASSIST,
            param: {
                shareCode,
            }
        });
        return res;
=======
>>>>>>> e45e8c3 (feat: 修复发布问题)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
<<<<<<< HEAD
import { httpConfig } from "../../../config/http.config";
import { eventMissionType } from "../../../types";
import GrowthCore from "../../../index";
<<<<<<< HEAD
<<<<<<< HEAD
export class InviteFriendsTask {
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
=======
const getQueryString = (query) => {
    return Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
};
=======
import { getQueryString } from "../../../utils/url";
>>>>>>> 9d8f8bc (feat: lastEdition)
export class InviteFriendsTask {
    constructor(core) {
        this.core = core;
    }
    // 完成邀请助力任务
    async completeInviteAssistTask(instanceId, shareCode) {
        const res = await GrowthCore.fetch('POST', httpConfig.API_LIST.completeTask, {
            instanceId,
            eventType: eventMissionType.INVITE_ASSIST,
            param: {
                shareCode,
            }
>>>>>>> 7d7f6f8 (发布笔记改动)
        });
    }
    async shareFriends(taskMetaId, extraQuery) {
        const res = await GrowthCore.task.claimTask(taskMetaId);
        if (res.code === 0) {
            const { data: { extra: { shareCode }, instanceId } } = res;
            let path = `https://yingzheng.xiaohongshu.com/miniprogram?shareCode=${shareCode}&instanceid=${instanceId}&activityId=${this.core.activityId}&activityType=${this.core.activityId}`;
            if (extraQuery) {
                path += `&${getQueryString(extraQuery)}`;
            }
            return path;
        }
        return {
            code: res.code,
            message: res.msg,
        };
=======
export class InviteFriendsTask {
    shareFriend(title, desc, imgUrl) {
        return __awaiter(this, void 0, void 0, function* () {
        });
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
    }
}
