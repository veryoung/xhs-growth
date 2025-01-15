import { go } from "../../../index";
import { genCapaPostDeeplink } from "./capay";

export class PublishNotesTask  {
  public core: any;
  constructor(core: any) {
    this.core = core;
  }
  // 发布笔记
  async publish(taskMetaId: string){
    const res = await this.core.task.claimTask(taskMetaId);  
    if (res.code !== 0) {
      return res;
    }
    const topicId = res?.data?.triggerMeta?.triggerCondition;
    const topicIds = topicId.slice(2,-2).split(',');
    const idStr = topicIds.map((id: string) => ({ page_id: id.replace('"','').trim() }));
    const publishNotePage = genCapaPostDeeplink({
      attach: { topics: idStr },
      config: {
        is_post_jump: 0,
      },
    })
    go(publishNotePage, {
      type: 'deeplink',
      fail: (err: any)=>{
        console.log('error', err)
      }
    })
  }
}
