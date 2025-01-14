
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
    } 
    return {
      code: res.code,
      message: res.msg,
    }
  }
}
