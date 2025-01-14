import { httpConfig } from "../../../config/http.config";
import { fetch, go } from "../../../index";
// import { genCapaPostDeeplink } from './capa'
import { eventMissionType } from "../../../types";

const filterPageIds = (arrayString: string) => {
  const str = arrayString.slice(2, -2);
  return str;
  // const arr = str.split(',');
    // const pageIds = ids.split(',').filter((id: string) => id.trim() !== '')
    // return pageIds.map(pageId => ({ page_id: pageId.trim() }))
}

export class PublishNotesTask  {
  public task: any;
  constructor(task: any) {
    this.task = task;
  }
  // 发布笔记
  async publish(taskMetaId: string){
    const res = await this.task.claimTask(taskMetaId);
    if (res.code === 0) {
      return {
        code: 0,
        message: 'success',
      }
    } else {
      return {
        code: res.code,
        message: res.msg,
      }
    }
  }
}
