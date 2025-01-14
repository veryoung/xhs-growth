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
<<<<<<< HEAD
<<<<<<< HEAD
    const res = await this.core.task.claimTask(taskMetaId);
    return res;
=======
    const res = await this.task.claimTask(taskMetaId);
=======
    const res = await this.core.task.claimTask(taskMetaId);
>>>>>>> 51d55f3 (发布笔记改动)
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
