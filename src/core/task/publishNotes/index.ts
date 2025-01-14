import GrowthCore from "../../../index";
export class PublishNotesTask  {
  public core: any;
  constructor(core: any) {
    this.core = core;
  }
  // 发布笔记
  async publish(taskMetaId: string){
    const res = await this.core.task.claimTask(taskMetaId);
    if (res.code === 0) {
      return {
        code: 0,
        message: 'success',
      }
    } 
    return {
      code: res.code,
      message: res.msg,
    }
  }
}
