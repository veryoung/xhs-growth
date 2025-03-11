var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
import { httpConfig } from '../../config/http.config';
import GrowthCore from '../../index';
import { openNotification } from '../../utils/notification';
import { PROJECT_NAME } from '../../const/index';
import { infoEncapsulation } from '../../utils/infoEncapsulation';
import { filterTriggerMetaData } from '../../utils/url';
export class TaskBus {
    constructor(core) {
        this.core = core;
        this.follow = new FollowTask();
        this.publishNotes = new PublishNotesTask(this.core);
        this.inviteFriends = new InviteFriendsTask(this.core);
        this.topic = new TopicTask();
    }
    /** 获取任务列表 */
    getTaskList() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GrowthCore.fetch('GET', httpConfig.API_LIST.taskTable);
            let requestInfo = {
                code: res.code,
                msg: res.msg,
                success: res.success,
                data: [],
            };
            if (res.code === 0) {
                requestInfo.data = res.data.tasks.map((item) => {
                    return Object.assign({ name: item.name, status: item.taskStatus, type: item.taskType, id: item.taskMetaId, taskId: item.instanceId }, infoEncapsulation(item.taskType, item));
                });
                return requestInfo;
            }
            return res;
        });
    }
    claimTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const res = yield GrowthCore.fetch('POST', httpConfig.API_LIST.claimTask, {
                taskMetaId: id
            });
            if (res.code === 0) {
                const taskInfo = filterTriggerMetaData((_a = res.data) === null || _a === void 0 ? void 0 : _a.triggerMeta);
                res.data.triggerMeta = taskInfo;
            }
            return res;
        });
    }
    completeTask(taskId, eventType, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GrowthCore.fetch('POST', httpConfig.API_LIST.completeTask, {
                instanceId: taskId,
                eventType: eventType,
                params: params,
            });
            return res;
        });
    }
    /** 轮询任务 */
    polling(group) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = group ? `${httpConfig.API_LIST.polling}?group=${group}` : httpConfig.API_LIST.polling;
            const res = yield GrowthCore.fetch('POST', url);
            return res;
        });
    }
    /** 查询任务记录 */
    queryRecord(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${httpConfig.API_LIST.qureyRecord}?limit=${limit}`;
            const res = yield GrowthCore.fetch('GET', url);
            return res;
        });
    }
    /** 轮询任务完成通知 */
    startNotification(callback) {
        return openNotification(this.polling, callback);
    }
    /** 获取防封策略 url */
    getAntiBannedStrategyUrl(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, needRealUrl = true) {
            const start = Date.now();
            const params = {
                projectName: PROJECT_NAME,
                url: url,
                needRealUrl: needRealUrl,
            };
            try {
                const resoponse = yield GrowthCore.fetch('POST', httpConfig.API_LIST.PHOENIX_URL, params, {});
                const res = resoponse.data;
                console.log('getAntiBannedStrategyUrl end', Date.now() - start);
                const url = res.url || res.realUrl || params.url;
                let realUrl = res.realUrl || params.url;
                // 防封失效了，自行降级即可，99 时，会强制返回原 url
                if (res.strategyType === 99) {
                    realUrl = params.url;
                }
                if (params.needRealUrl) {
                    return [url, realUrl];
                }
                // 兜底，如果短链服务异常，则返回短链前的 url，如防封服务返回异常，则返回未经防封处理的原链接
                return res.url || res.realUrl || params.url;
            }
            catch (error) {
                console.log('防封接口 => [error]', error);
            }
            const returnUrl = `${params.url}&useRealUrl=1`;
            if (params.needRealUrl) {
                return [returnUrl, returnUrl];
            }
            // 防封服务异常，返回原 url
            return returnUrl;
        });
    }
}
//# sourceMappingURL=index.js.map