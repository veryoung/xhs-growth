var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TaskStatus } from "../../../types/task";
import { go } from "../../../index";
import { setTaskNeededInfo } from "../../../utils/url";
export class FollowTask {
    /** 关注 */
    takeFollow(taskMetaId_1) {
        return __awaiter(this, arguments, void 0, function* (taskMetaId, isAutoFollow = true, completeTaskId, userId) {
            try {
                const taskInfo = {
                    instanceId: completeTaskId,
                    triggerMeta: {
                        triggerCondition: userId,
                    },
                };
                const res = yield setTaskNeededInfo(taskMetaId, taskInfo);
                if (res.code === 0) {
                    const { taskStatus, triggerMeta = {} } = res.data;
                    if (taskStatus === TaskStatus.UNFINISHED && isAutoFollow && triggerMeta) {
                        const ids = triggerMeta === null || triggerMeta === void 0 ? void 0 : triggerMeta.triggerCondition;
                        go(`xhsdiscover://user/${ids[0]}`, {
                            type: 'deeplink',
                            success: (res) => {
                                return {
                                    code: res.code,
                                    msg: res.msg,
                                };
                            },
                            fail: (err) => {
                                return {
                                    code: -300,
                                    msg: err.message || '跳转失败',
                                };
                            }
                        });
                        return;
                    }
                    console.log("🚀 ~ FollowTask ~ takeFollow ~ res:", res);
                    return {
                        code: res.code,
                        msg: res.msg,
                    };
                }
                return {
                    code: res.code || -200,
                    msg: res.msg || '领取任务失败',
                };
            }
            catch (error) {
                return {
                    code: -200,
                    msg: (error === null || error === void 0 ? void 0 : error.message) || '领取任务失败',
                };
            }
        });
    }
}
//# sourceMappingURL=index.js.map