import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
import { httpConfig } from '../../config/http.config';
import { eventMissionType } from '../../types';
import GrowthCore from '../../index';

export class TaskBus {
  public follow: FollowTask;
  public publishNotes: PublishNotesTask;
  public inviteFriends: InviteFriendsTask;
  public topic: TopicTask;

  constructor() {
    this.follow = new FollowTask();
    this.publishNotes = new PublishNotesTask(this);
    this.inviteFriends = new InviteFriendsTask();
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
}