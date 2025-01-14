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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class InviteFriendsTask {
    shareFriend(title, desc, imgUrl) {
        return __awaiter(this, void 0, void 0, function* () {
        });
>>>>>>> b932bf8 (feat: 修复发布问题)
    }
}
