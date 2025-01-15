export class PublishNotesTask  {
  public core: any;
  constructor(core: any) {
    this.core = core;
  }
  // 发布笔记
  async publish(taskMetaId: string){
    const res = await this.core.task.claimTask(taskMetaId);
    return res;
  }
}
