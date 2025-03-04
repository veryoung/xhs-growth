import { httpConfig } from "../../../config/http.config";
import { eventMissionType } from "../../../types";
import GrowthCore, { Core, go } from "../../../index";
import { getQueryString, setTaskNeededInfo } from "../../../utils/url";

export class InviteFriendsTask {
  core: Core;
  constructor(core: Core) {
    this.core = core;
  }
  // 完成邀请助力任务
  async completeInviteAssistTask(taskId: string, shareCode: string) {
    const res = await GrowthCore.fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId: taskId,
      eventType: eventMissionType.INVITE_ASSIST,
      param: {
        shareCode,
      }
    }); 
    return res;
  }

  // 分享邀请助力任务
  async shareFriends (id: string, extraQuery?: any, taskId?: string, shareCode?: string){
    try {
      const taskInfo = {
        instanceId: taskId,
        extra: {
          shareCode: shareCode,
        },
      }
      const res = await setTaskNeededInfo(id, taskInfo)
      if(res.code === 0) {
        const { data: { extra: { shareCode }, instanceId } } = res;
        let path = `https://miniprogram.xiaohongshu.com/miniprogram/entry?shareCode=${shareCode}&instanceid=${instanceId}&activityId=${this.core.activityId}&activityType=${this.core.activityId}`;
        if(extraQuery) {
          path += `&${getQueryString(extraQuery)}`;
        }
        const strategyUrls = await GrowthCore.task.getAntiBannedStrategyUrl(path);
        console.log('原分享路径：', strategyUrls[1]);
        console.log('应用路径：', strategyUrls[0]);
        if(strategyUrls[0] !== strategyUrls[1]) {
          path = strategyUrls[0]
        }
        // todo: 降级口令，目前没有这个可能性
        return {
          ...res,
          data: {
            path,
          }
        }
      }
    } catch (error) {
      console.error('InviteFriendsTask shareFriends error:', error)
      return error
    }
  }
}
