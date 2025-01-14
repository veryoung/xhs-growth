<<<<<<< HEAD
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
=======
import { go } from "../../../index";
import { genCapaPostDeeplink } from './capa';
const filterPageIds = (ids) => {
    const pageIds = ids.split(',').filter((id) => id.trim() !== '');
    return pageIds.map(pageId => ({ page_id: pageId.trim() }));
};
export class PublishNotesTask {
    publish(pageId) {
        console.log('pageId', pageId);
        const publishNotePage = genCapaPostDeeplink({
            attach: { topics: filterPageIds(pageId) },
            config: {
                is_post_jump: 0,
            },
        });
        console.log('publishNotePage', publishNotePage);
        go(publishNotePage, {
            type: 'deeplink',
            fail: (res) => {
                console.log('error', res);
            }
        });
        return 1;
>>>>>>> b932bf8 (feat: 修复发布问题)
    }
}
