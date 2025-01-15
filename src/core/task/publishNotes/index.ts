export class PublishNotesTask  {
  public core: any;
  constructor(core: any) {
    this.core = core;
  }
  // 发布笔记
  async publish(taskMetaId: string){
    const res = await this.core.task.claimTask(taskMetaId);  
    if (res.code !== 0) {
      return res;
    }
    return {
      code: 0,
      success: true,
      msg: "成功",
      data: {
        topicId: res.data.triggerMeta.triggerCondition
      },
    };
  }
}
