import { httpConfig } from "../../../config/http.config";
import { eventMissionType } from "../../../types";
import { fetch } from "../../../index";
export class InviteFriendsTask {
    // 完成邀请助力任务
    async completeInviteAssistTask(instanceId, shareCode) {
        const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
            instanceId,
            eventType: eventMissionType.INVITE_ASSIST,
            param: {
                shareCode,
            }
        });
        return res;
    }
}
