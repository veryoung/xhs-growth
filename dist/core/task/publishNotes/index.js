import { go } from "../../../index";
import { genCapaPostDeeplink } from './capa';
const filterPageIds = (ids) => {
    const pageIds = ids.split(',').filter((id) => id.trim() !== '');
    return pageIds.map(pageId => ({ page_id: pageId.trim() }));
};
export class PublishNotesTask {
    //    发布笔记
    publish(pageId) {
        console.log('pageId', pageId);
        const publishNotePage = genCapaPostDeeplink({
            attach: { topics: filterPageIds(pageId) },
            config: {
                is_post_jump: 0,
                // callback: `xhsdiscover://webview/${window.location.href.split('//')[1]}&from=post`,
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
    }
}
//# sourceMappingURL=index.js.map