export class PublishNotesTask {
    constructor(core) {
        this.core = core;
    }
    async publish(taskMetaId) {
        const res = await this.core.task.claimTask(taskMetaId);
        if (res.code === 0) {
            return {
                code: 0,
                message: 'success',
            };
        }
        return {
            code: res.code,
            message: res.msg,
        };
    }
}
