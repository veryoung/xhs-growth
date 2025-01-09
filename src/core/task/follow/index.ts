import { fetch, go } from "../../../index";
export class FollowTask  {
  /** 关注 */
  takeFollow(accountId: string) {
    go(`xhsdiscover://user/${accountId}`);
  }


  getFollowInfo(accountId: string) {
    // fetch('POST', `https://api.xhsdiscover.com/v1/user/info`, {
    //   accountId: accountId
    // }, {
    //   'authorization': `Bearer ${getRequestToken()}`
    // });
  }

  /** 取消关注 */
  cancelFollow() {
    console.log("Cancel follow task");
    // 实现专注任务的取消逻辑
  }
}
