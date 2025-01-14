import GrowthCore from "../../../index";
export class PublishNotesTask  {
  public core: any;
  constructor(core: any) {
    this.core = core;
  }
  // 发布笔记
  async publish(taskMetaId: string){
<<<<<<< HEAD
    const res = await this.core.task.claimTask(taskMetaId);
    return res;
=======
    const res = await this.task.claimTask(taskMetaId);
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
>>>>>>> 949e608 (feat: 修改任务实现)
  }
}
