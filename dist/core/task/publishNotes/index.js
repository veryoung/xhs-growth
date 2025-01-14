var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class PublishNotesTask {
    constructor(core) {
        this.core = core;
    }
<<<<<<< HEAD
<<<<<<< HEAD
    publish(taskMetaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.task.claimTask(taskMetaId);
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
        });
=======
    // 发布笔记
=======
>>>>>>> 9d8f8bc (feat: lastEdition)
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
>>>>>>> 7d7f6f8 (发布笔记改动)
    }
}
