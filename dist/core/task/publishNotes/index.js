export class PublishNotesTask {
    constructor(task) {
        this.task = task;
    }
    // 发布笔记
    async publish(taskMetaId) {
        const res = await this.task.claimTask(taskMetaId);
        if (res.code === 0) {
            return {
                code: 0,
                message: 'success',
            };
        }
        else {
            return {
                code: res.code,
                message: res.msg,
            };
        }
    }
}
