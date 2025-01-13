import { httpConfig } from "src/config/http.config";
import { fetch, go } from "../../../index";
import { genCapaPostDeeplink } from './capa'
import { eventMissionType } from "src/types";

const filterPageIds = (ids: string) => {
    const pageIds = ids.split(',').filter((id: string) => id.trim() !== '')
    return pageIds.map(pageId => ({ page_id: pageId.trim() }))
}

export class PublishNotesTask  {
  //    发布笔记
  publish(pageId: string){
    const publishNotePage = genCapaPostDeeplink({
      attach: { topics: filterPageIds(pageId as string) },
      config: {
        is_post_jump: 0,
      },
    })
    go(publishNotePage, {
      type: 'deeplink',
      fail: (res: any)=>{
        console.log('error', res)
      }
    })
  }


  // 完成发布笔记任务
  async completeNoteChangeTask(instanceId: string) {
    const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId: instanceId,
      eventType: eventMissionType.NOTE_CHANGE,
    }); 
    return res;
  }

  // 完成笔记浏览任务
  async completeNoteBrowserTask(instanceId: string) {
    const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId: instanceId,
      eventType: eventMissionType.NOTE_BROWSE,
    }); 
    return res;
  }

   // 完成笔记点赞任务
   async completeNoteLikeTask(instanceId: string) {
    const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId: instanceId,
      eventType: eventMissionType.NOTE_LIKE,
    }); 
    return res;
  }

  // 完成笔记搜索任务
  async completeSearchNoteTask(instanceId: string) {
    const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
      instanceId: instanceId,
      eventType: eventMissionType.SEARCH_NOTE,
    }); 
    return res;
  }
}
