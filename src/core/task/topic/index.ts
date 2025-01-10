import { fetch, go } from "../../../index";

export class TopicTask {
  /** 浏览话题 */
  viewTopic(pageId: string) {
    console.log('pageId', pageId)
    const path = `https://www.xiaohongshu.com/page/topics/${pageId}?fullscreen=true&naviHidden=yes`
    console.log("🚀 ~ TopicTask ~ viewTopic ~ path:", path)
    go(path, {
      type: 'url',
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
}
