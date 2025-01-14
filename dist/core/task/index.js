import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
import { httpConfig } from '../../config/http.config';
import { fetch } from '../../index';
export class TaskBus {
    constructor() {
        this.follow = new FollowTask();
        this.publishNotes = new PublishNotesTask();
        this.inviteFriends = new InviteFriendsTask();
        this.topic = new TopicTask();
    }
    async getTaskList() {
        const res = await fetch('GET', httpConfig.API_LIST.taskTable);
        return res;
    }
    async claimTask(taskMetaId) {
        const res = await fetch('POST', httpConfig.API_LIST.claimTask, {
            taskMetaId: taskMetaId
        });
        return res;
    }
    async polling(group) {
        const url = group ? `${httpConfig.API_LIST.polling}?group=${group}` : httpConfig.API_LIST.polling;
        const res = await fetch('POST', url);
        return res;
    }
    async queryRecord(limit) {
        const url = `${httpConfig.API_LIST.qureyRecord}?limit=${limit}`;
        const res = await fetch('GET', url);
        return res;
    }
}
