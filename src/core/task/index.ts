import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
import { httpConfig } from '../../config/http.config';
import { fetch } from '../../index';
import { eventMissionType } from 'src/types';

export class TaskBus {
  public follow: FollowTask;
  public publishNotes: PublishNotesTask;
  public inviteFriends: InviteFriendsTask;
  public topic: TopicTask;
  
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

  async claimTask(taskMetaId: string) {
    const res = await fetch('POST', httpConfig.API_LIST.claimTask, {
      taskMetaId: taskMetaId
    });
    return res;
  }

  // 完成发布笔记任务
  async completeNoteChangeTask(instanceId: string) {
    const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId: instanceId,
      eventType: eventMissionType.NOTE_CHANGE,
    }); 
    return res;
  }

  // 完成笔记浏览任务
  async completeNoteBrowserTask(instanceId: string) {
    const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId: instanceId,
      eventType: eventMissionType.NOTE_BROWSE,
    }); 
    return res;
  }

   // 完成笔记点赞任务
   async completeNoteLikeTask(instanceId: string) {
    const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId: instanceId,
      eventType: eventMissionType.NOTE_LIKE,
    }); 
    return res;
  }

  // 完成关注任务
  async completeFollowTask(instanceId: string) {
    const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId: instanceId,
      eventType: eventMissionType.FOLLOW_USER,
    }); 
    return res;
  }

  // 完成笔记搜索任务
  async completeSearchNoteTask(instanceId: string) {
    const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId: instanceId,
      eventType: eventMissionType.SEARCH_NOTE,
    }); 
    return res;
  }

    // 完成邀请助力任务
    async completeInviteAssistTask(instanceId: string, shareCode: string) {
      const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
        instanceId: instanceId,
        eventType: eventMissionType.INVITE_ASSIST,
        params: {
          shareCode: shareCode,
        }
      }); 
      return res;
    }

  async polling(group?: string) {
    const url = group ? `${httpConfig.API_LIST.polling}?group=${group}` : httpConfig.API_LIST.polling;
    const res = await fetch('POST', url);
    return res;
  }

  async queryRecord(limit: number) {
    const url = `${httpConfig.API_LIST.qureyRecord}?limit=${limit}`;
    const res = await fetch('GET', url);
    return res;
  }
}