import { httpConfig } from "../../../config/http.config";
import { eventMissionType } from "../../../types";
import GrowthCore from "../../../index";
import { getQueryString } from "../../../utils/url";
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
        });
        return res;
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
    }
}
