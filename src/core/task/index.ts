import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
import { httpConfig } from '../../config/http.config';
import { eventMissionType, Notification } from '../../types';
import GrowthCore, { Core } from '../../index';
import { openNotification } from '../../utils/notification';

export class TaskBus {
  public core: Core;
  public follow: FollowTask;
  public publishNotes: PublishNotesTask;
  public inviteFriends: InviteFriendsTask;
  public topic: TopicTask;

  constructor(core: Core) {
    this.core = core;
    this.follow = new FollowTask();
    this.publishNotes = new PublishNotesTask(this.core);
    this.inviteFriends = new InviteFriendsTask(this.core);
    this.topic = new TopicTask();
  }

  /** 获取任务列表 */
  async getTaskList() {
    const res = await GrowthCore.fetch('GET', httpConfig.API_LIST.taskTable);
    console.log("🚀 ~ TaskBus ~ getTaskList ~ res:", res)
    return res;
  }

  async claimTask(taskMetaId: string) {
    const res = await GrowthCore.fetch('POST', httpConfig.API_LIST.claimTask, {
      taskMetaId: taskMetaId
    });
    console.log("🚀 ~ TaskBus ~ claimTask ~ res:", res)
    return res;
  }

  async completeTask(instanceId: string, eventType: eventMissionType, params: any) {
    const res = await GrowthCore.fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId: instanceId,
      eventType: eventType,
      params: params,
    }); 
    console.log("🚀 ~ TaskBus ~ completeTask ~ res:", res)
    return res;
  }

  /** 轮询任务 */
  async polling(group?: string) {
    const url = group ? `${httpConfig.API_LIST.polling}?group=${group}` : httpConfig.API_LIST.polling;
    const res = await GrowthCore.fetch('POST', url);
    console.log("🚀 ~ TaskBus ~ polling ~ res:", res)
    return res;
  }

  /** 查询任务记录 */
  async queryRecord(limit: number) {
    const url = `${httpConfig.API_LIST.qureyRecord}?limit=${limit}`;
    const res = await GrowthCore.fetch('GET', url);
    console.log("🚀 ~ TaskBus ~ queryRecord ~ res:", res)
    return res;
  }

  /** 轮询任务完成通知 */
  public startNotification(callback: (notification: Notification) => any) {
    return openNotification(this.polling, callback);
  }
}
