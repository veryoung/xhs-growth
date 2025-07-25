import { go } from "../../../index";
import { genCapaPostDeeplink } from "./capa";
import { setTaskNeededInfo } from "../../../utils/url";
import { Core } from "../../../index";

export class PublishNotesTask {
  public core: Core;
  
  constructor(core: Core) {
    this.core = core;
  }

  /**
   * 仅发布笔记，不关联任务
   * @param topicIdList 话题ID列表
   * @returns Promise<void>
   */
  async onlyPublish(topicIdList: string[]): Promise<void> {
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
  
  /**
   * 发布笔记并关联任务
   * @param id 任务ID
   * @param taskId 任务实例ID
   * @param topicId 话题ID列表
   * @returns Promise<any>
   */
  async publish(id: string, taskId: string, topicId: Array<string>): Promise<any> {
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
  
      const topicIds = res.data?.triggerMeta?.triggerCondition
      const idStr = topicIds?.map((id: string) => ({ page_id: id.trim() }));
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
    } catch (error) {
      console.error('PublishNotesTask publish error:', error)
      return error
    }
  }
}
