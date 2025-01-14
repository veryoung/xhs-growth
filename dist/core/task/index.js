import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
import { httpConfig } from '../../config/http.config';
import GrowthCore from '../../index';
export class TaskBus {
    constructor(core) {
        this.core = core;
        this.follow = new FollowTask();
        this.publishNotes = new PublishNotesTask(this.core);
        this.inviteFriends = new InviteFriendsTask(this.core);
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
    }
}
