import { httpConfig } from "src/config/http.config";
import { fetch, go } from "../../../index";
import { eventMissionType } from "src/types";
export class FollowTask  {

  /** 关注 */
  takeFollow(accountId: string) {
    go(`xhsdiscover://user/${accountId}`, {
      type: 'deeplink',
      success: (res: any) => {
        console.log('success', res)
      },
      fail: (res: any) => {
        console.log('fail', res)
      },
      complete: (res: any) => {
        console.log('complete', res)
      }
    });
  }

  // 完成关注任务
  async completeFollowTask(instanceId: string) {
    const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId: instanceId,
      eventType: eventMissionType.FOLLOW_USER,
    }); 
    return res;
  }

  /** 取消关注 */
  cancelFollow() {
    console.log("Cancel follow task");
  }
}
