import GrowthCore from "../../../index";
export class PublishNotesTask  {
<<<<<<< HEAD
  public core: any;
  constructor(core: any) {
    this.core = core;
  }
=======
  public task: any;

>>>>>>> 4f9e07e (feat: lastEdition)
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
