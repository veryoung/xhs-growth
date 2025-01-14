import GrowthCore from "../../../index";
export class PublishNotesTask  {
  public core: any;
  constructor(core: any) {
    this.core = core;
  }
  // 发布笔记
  async publish(taskMetaId: string){
<<<<<<< HEAD
<<<<<<< HEAD
    const res = await this.core.task.claimTask(taskMetaId);
<<<<<<< HEAD
    return res;
=======
    const res = await this.task.claimTask(taskMetaId);
=======
    const res = await this.core.task.claimTask(taskMetaId);
>>>>>>> 51d55f3 (发布笔记改动)
=======
>>>>>>> 4b345bd (发布笔记改动)
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
<<<<<<< HEAD
>>>>>>> 949e608 (feat: 修改任务实现)
=======
>>>>>>> 4b345bd (发布笔记改动)
  }
}
