import { httpConfig } from "../../../config/http.config";
import { eventMissionType } from "../../../types";
<<<<<<< HEAD
<<<<<<< HEAD
import GrowthCore, { Core, go } from "../../../index";
import { getQueryString } from "../../../utils/url";
=======
import GrowthCore from "../../../index";
>>>>>>> 949e608 (feat: 修改任务实现)
=======
import GrowthCore, { Core, go } from "../../../index";
>>>>>>> 51d55f3 (发布笔记改动)

const getQueryString = (query: any) => {
  return Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
}
export class InviteFriendsTask {
  core: Core;
  constructor(core: Core) {
    this.core = core;
  }
  // 完成邀请助力任务
  async completeInviteAssistTask(instanceId: string, shareCode: string) {
    const res = await GrowthCore.fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId,
      eventType: eventMissionType.INVITE_ASSIST,
      param: {
        shareCode,
      }
    }); 
    return res;
  }

<<<<<<< HEAD
  // 分享邀请助力任务
=======
>>>>>>> 51d55f3 (发布笔记改动)
  async shareFriends (taskMetaId: string, extraQuery?: any){
    const res = await GrowthCore.task.claimTask(taskMetaId);
    if(res.code === 0) {
      const { data: { extra: { shareCode }, instanceId } } = res;
        let path = `https://yingzheng.xiaohongshu.com/miniprogram?shareCode=${shareCode}&instanceid=${instanceId}&activityId=${this.core.activityId}&activityType=${this.core.activityId}`;
      if(extraQuery) {
        path += `&${getQueryString(extraQuery)}`;
      }
<<<<<<< HEAD
      return {
        ...res,
        data: {
          path,
        }
      }
    }
    return res;
=======
      return path;
    }
    return {
      code: res.code,
      message: res.msg,
    }
>>>>>>> 51d55f3 (发布笔记改动)
  }
}
