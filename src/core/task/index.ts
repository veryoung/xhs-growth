import { FollowTask } from './follow';
import { PublishNotesTask } from './publishNotes';
import { InviteFriendsTask } from './inviteFriends';
import { TopicTask } from './topic';
import { httpConfig } from '../../config/http.config';
import { eventMissionType, Notification } from '../../types';
import GrowthCore, { Core } from '../../index';
import { openNotification } from '../../utils/notification';
import { PROJECT_NAME } from '../../const/index';

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
  private async polling(group?: string) {
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


  public async getAntiBannedStrategyUrl(url:string): Promise<any> {
    const start = Date.now()
    const params = { 
      projectName: PROJECT_NAME, 
      url: url, 
      needRealUrl: true 
    }
    try {
      const resoponse = await GrowthCore.fetch('POST', httpConfig.API_LIST.PHOENIX_URL, params, {});
      const res = resoponse.data
      console.log('getAntiBannedStrategyUrl end', Date.now() - start)
      const url = res.url || res.realUrl || params.url
      let realUrl = res.realUrl || params.url
      // 防封失效了，自行降级即可，99 时，会强制返回原 url
      if (res.strategyType === 99) {
        realUrl = params.url
      }
      if (params.needRealUrl) {
        return [url, realUrl]
      }
      // 兜底，如果短链服务异常，则返回短链前的 url，如防封服务返回异常，则返回未经防封处理的原链接
      return res.url || res.realUrl || params.url
    } catch (error) {
      console.log('防封接口 => [error]', error)
    }
    const returnUrl = `${params.url}&useRealUrl=1`
    if (params.needRealUrl) {
      return [returnUrl, returnUrl]
    }
    // 防封服务异常，返回原 url
    return returnUrl
  }
}
