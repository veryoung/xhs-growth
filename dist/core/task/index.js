<<<<<<< HEAD
=======
<<<<<<< HEAD
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
=======
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
import { httpConfig } from '../../config/http.config';
<<<<<<< HEAD
import GrowthCore from '../../index';
export class TaskBus {
    constructor(core) {
        this.core = core;
        this.follow = new FollowTask();
        this.publishNotes = new PublishNotesTask(this.core);
        this.inviteFriends = new InviteFriendsTask(this.core);
=======
<<<<<<< HEAD
export class TaskBus {
    constructor() {
        this.follow = new FollowTask();
        this.publishNotes = new PublishNotesTask(this);
        this.inviteFriends = new InviteFriendsTask();
        this.topic = new TopicTask();
    }
    /** 获取任务列表 */
    async getTaskList() {
        const res = await GrowthCore.fetch('GET', httpConfig.API_LIST.taskTable);
        console.log("🚀 ~ TaskBus ~ getTaskList ~ res:", res);
        return res;
    }
    async claimTask(taskMetaId) {
        const res = await GrowthCore.fetch('POST', httpConfig.API_LIST.claimTask, {
            taskMetaId: taskMetaId
        });
        console.log("🚀 ~ TaskBus ~ claimTask ~ res:", res);
        return res;
    }
    async completeTask(instanceId, eventType, params) {
        const res = await GrowthCore.fetch('POST', httpConfig.API_LIST.completeTask, {
            instanceId: instanceId,
            eventType: eventType,
            params: params,
        });
        console.log("🚀 ~ TaskBus ~ completeTask ~ res:", res);
        return res;
    }
    /** 轮询任务 */
    async polling(group) {
        const url = group ? `${httpConfig.API_LIST.polling}?group=${group}` : httpConfig.API_LIST.polling;
        const res = await GrowthCore.fetch('POST', url);
        console.log("🚀 ~ TaskBus ~ polling ~ res:", res);
        return res;
    }
    /** 查询任务记录 */
    async queryRecord(limit) {
        const url = `${httpConfig.API_LIST.qureyRecord}?limit=${limit}`;
        const res = await GrowthCore.fetch('GET', url);
        console.log("🚀 ~ TaskBus ~ queryRecord ~ res:", res);
        return res;
=======
import { fetch } from '../../index';
export class TaskBus {
    constructor() {
        this.follow = new FollowTask();
        this.publishNotes = new PublishNotesTask();
        this.inviteFriends = new InviteFriendsTask();
>>>>>>> e45e8c3 (feat: 修复发布问题)
        this.topic = new TopicTask();
    }
    getTaskList() {
        return __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
            const res = yield GrowthCore.fetch('GET', httpConfig.API_LIST.taskTable);
=======
            const res = yield fetch('GET', httpConfig.API_LIST.taskTable);
>>>>>>> e45e8c3 (feat: 修复发布问题)
            console.log("🚀 ~ TaskBus ~ getTaskList ~ res:", res);
            return res;
        });
    }
    claimTask(taskMetaId) {
        return __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
            const res = yield GrowthCore.fetch('POST', httpConfig.API_LIST.claimTask, {
=======
            const res = yield fetch('POST', httpConfig.API_LIST.claimTask, {
>>>>>>> e45e8c3 (feat: 修复发布问题)
                taskMetaId: taskMetaId
            });
            console.log("🚀 ~ TaskBus ~ claimTask ~ res:", res);
            return res;
        });
    }
    completeTask(instanceId, eventType, params) {
        return __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
            const res = yield GrowthCore.fetch('POST', httpConfig.API_LIST.completeTask, {
=======
            const res = yield fetch('POST', httpConfig.API_LIST.completeTask, {
>>>>>>> e45e8c3 (feat: 修复发布问题)
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
<<<<<<< HEAD
            const res = yield GrowthCore.fetch('POST', url);
=======
            const res = yield fetch('POST', url);
>>>>>>> e45e8c3 (feat: 修复发布问题)
            console.log("🚀 ~ TaskBus ~ polling ~ res:", res);
            return res;
        });
    }
    queryRecord(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${httpConfig.API_LIST.qureyRecord}?limit=${limit}`;
<<<<<<< HEAD
            const res = yield GrowthCore.fetch('GET', url);
            console.log("🚀 ~ TaskBus ~ queryRecord ~ res:", res);
            return res;
        });
=======
            const res = yield fetch('GET', url);
            console.log("🚀 ~ TaskBus ~ queryRecord ~ res:", res);
            return res;
        });
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
    }
}
