import { fetch, go } from "../../../index";
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

  /** 取消关注 */
  cancelFollow() {
    console.log("Cancel follow task");
    // 实现专注任务的取消逻辑
  }
}
