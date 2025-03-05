import { go } from "../../../index";
import { genCapaPostDeeplink } from "./capa";
import { setTaskNeededInfo } from "../../../utils/url";

export class PublishNotesTask  {
  public core: any;
  constructor(core: any) {
    this.core = core;
  }

  async onlyPublish(topicIdList: string[]){
    const idStr = topicIdList?.map((item) => ({ page_id: item.trim() }));
    const publishNotePage = genCapaPostDeeplink({
      attach: { topics: idStr },
      config: {
        is_post_jump: 0,
      },
    })
    go(publishNotePage, {
      type: 'deeplink',
      fail: (err: any) => {
        console.log('error', err)
      }
    })
  }
  // 发布笔记
  async publish(id: string, taskId: string, topicId: Array<string>){
    try {
      const taskInfo = {
        instanceId: taskId,
        triggerMeta: {
          triggerCondition: topicId,
        },
      }
      const res = await setTaskNeededInfo(id, taskInfo)
      if (res.code !== 0) {
        return res
      }
  
      const url = `miniprogram.xiaohongshu.com/miniprogram/${this.core.activityId}/${Math.random().toString(36).slice(2)}/entry?activityId=${this.core.activityId}&activityType=${this.core.activityId}`
      const topicIds = res.data?.triggerMeta?.triggerCondition
      const idStr = topicIds?.map((id: string) => ({ page_id: id.trim() }));
      const publishNotePage = genCapaPostDeeplink({
        attach: { topics: idStr },
        config: {
          is_post_jump: 0,
          callback: `xhsdiscover://webview/${url}&from=post`,
        },
      })
      go(publishNotePage, {
        type: 'deeplink',
        fail: (err: any) => {
          console.log('error', err)
        }
      })
    } catch (error) {
      console.error('PublishNotesTask publish error:', error)
      return error
    }
  }
}
