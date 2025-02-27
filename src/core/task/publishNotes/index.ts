import { go } from "../../../index";
import { genCapaPostDeeplink } from "./capa";

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
  async publish(taskMetaId: string){
    const res = await this.core.task.claimTask(taskMetaId);  
    if (res.code !== 0) {
      return res;
    }

    const url = `miniprogram.xiaohongshu.com/miniprogram/${this.core.activityId}/${Math.random().toString(36).slice(2)}/entry?activityId=${this.core.activityId}&activityType=${this.core.activityId}`
    const topicId = res?.data?.triggerMeta?.triggerCondition;
    const topicIds = JSON.parse(topicId);
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
  }
}
