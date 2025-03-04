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
    polling(group) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = group ? `${httpConfig.API_LIST.polling}?group=${group}` : httpConfig.API_LIST.polling;
            const res = yield GrowthCore.fetch('POST', url);
            return res;
        });
    }
    queryRecord(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${httpConfig.API_LIST.qureyRecord}?limit=${limit}`;
            const res = yield GrowthCore.fetch('GET', url);
            return res;
        });
    }
    startNotification(callback) {
        return openNotification(this.polling, callback);
    }
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
                if (res.strategyType === 99) {
                    realUrl = params.url;
                }
                if (params.needRealUrl) {
                    return [url, realUrl];
                }
                return res.url || res.realUrl || params.url;
            }
            catch (error) {
                console.log('防封接口 => [error]', error);
            }
            const returnUrl = `${params.url}&useRealUrl=1`;
            if (params.needRealUrl) {
                return [returnUrl, returnUrl];
            }
            return returnUrl;
        });
    }
}
