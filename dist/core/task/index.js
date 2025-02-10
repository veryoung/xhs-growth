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
            console.log("🚀 ~ TaskBus ~ getTaskList ~ res:", res);
            return res;
        });
    }
    claimTask(taskMetaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GrowthCore.fetch('POST', httpConfig.API_LIST.claimTask, {
                taskMetaId: taskMetaId
            });
            console.log("🚀 ~ TaskBus ~ claimTask ~ res:", res);
            return res;
        });
    }
    completeTask(instanceId, eventType, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GrowthCore.fetch('POST', httpConfig.API_LIST.completeTask, {
                instanceId: instanceId,
                eventType: eventType,
                params: params,
            });
            console.log("🚀 ~ TaskBus ~ completeTask ~ res:", res);
            return res;
        });
    }
    polling(group) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = group ? `${httpConfig.API_LIST.polling}?group=${group}` : httpConfig.API_LIST.polling;
            const res = yield GrowthCore.fetch('POST', url);
            console.log("🚀 ~ TaskBus ~ polling ~ res:", res);
            return res;
        });
    }
    queryRecord(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${httpConfig.API_LIST.qureyRecord}?limit=${limit}`;
            const res = yield GrowthCore.fetch('GET', url);
            console.log("🚀 ~ TaskBus ~ queryRecord ~ res:", res);
            return res;
        });
    }
    startNotification(callback) {
        return openNotification(this.polling, callback);
    }
    getAntiBannedStrategyUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = Date.now();
            const params = {
                projectName: PROJECT_NAME,
                url: url,
                needRealUrl: true
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
