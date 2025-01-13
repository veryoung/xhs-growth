import { httpConfig } from "src/config/http.config";
import { eventMissionType } from "src/types";
import { fetch } from "../../../index";
export class InviteFriendsTask {

  // 完成邀请助力任务
  async completeInviteAssistTask(instanceId: string, shareCode: string) {
    const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId,
      eventType: eventMissionType.INVITE_ASSIST,
      params: {
        shareCode,
      }
    }); 
    return res;
  }

  // async shareFriend(title: string, desc: string, imgUrl: string){
    // const url = window.location.href;
    // const params = new URL(url).searchParams;
    // const activityVersion = params.get('activityVersion');
    // const templateId = params.get('templateId');
    // const activityType =  params.get('activityType');

    // console.log()
    // fetch('POST', '')
    
    // getInviteCode({
    //   activityId: activityType as string,
    // }).then(async (res: any) => {
      // await setShareContent({
      //   title,
      //   desc,
      //   imgUrl,
      //   link: `${window.location.origin}${`/fe/growthgame/${Math.random().toString(36).slice(2)}/homepage`}?activityVersion=${activityVersion}&activityType=${activityType}&templateId=${templateId || 'lottery'}&isFrom=share&inviteCode=${res.inviteCode}&naviHidden=yes`,
      // })
      // await showShareMenu()
    // })
  // }
}
