import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
import { httpConfig } from '../../config/http.config';
import { fetch } from '../../index';
import { eventMissionType } from '../../types';

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
    const res = await fetch('GET', httpConfig.API_LIST.taskTable);
    return res;
  }

  async claimTask(instanceId: string, eventType: eventMissionType, params: any) {
    const res = await fetch('POST', httpConfig.API_LIST.claimTask, {
      instanceId: instanceId,
      eventType: eventType,
      param: params,
    });
    return res;
  }

  /** 轮询任务 */
  async polling(group?: string) {
    const url = group ? `${httpConfig.API_LIST.polling}?group=${group}` : httpConfig.API_LIST.polling;
    const res = await fetch('POST', url);
    return res;
  }

  /** 查询任务记录 */
  async queryRecord(limit: number) {
    const url = `${httpConfig.API_LIST.qureyRecord}?limit=${limit}`;
    const res = await fetch('GET', url);
    return res;
  }
}