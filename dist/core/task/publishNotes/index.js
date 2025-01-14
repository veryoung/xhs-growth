import { httpConfig } from "../../../config/http.config";
import { fetch, go } from "../../../index";
import { genCapaPostDeeplink } from './capa';
import { eventMissionType } from "../../../types";
const filterPageIds = (ids) => {
    const pageIds = ids.split(',').filter((id) => id.trim() !== '');
    return pageIds.map(pageId => ({ page_id: pageId.trim() }));
};
export class PublishNotesTask {
    //    发布笔记
    publish(pageId) {
        const publishNotePage = genCapaPostDeeplink({
            attach: { topics: filterPageIds(pageId) },
            config: {
                is_post_jump: 0,
            },
        });
        go(publishNotePage, {
            type: 'deeplink',
            fail: (res) => {
                console.log('error', res);
            }
        });
    }
    // 完成发布笔记任务
    async completeNoteChangeTask(instanceId) {
        const res = await fetch('POST', httpConfig.API_LIST.completeTask, {
            instanceId: instanceId,
            eventType: eventMissionType.NOTE_CHANGE,
        });
        return res;
    }
}
