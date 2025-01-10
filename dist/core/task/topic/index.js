import { go } from "../../../index";
export class TopicTask {
    /** 浏览话题 */
    viewTopic(pageId) {
        console.log('pageId', pageId);
        const path = `https://www.xiaohongshu.com/page/topics/${pageId}?fullscreen=true&naviHidden=yes`;
        console.log("🚀 ~ TopicTask ~ viewTopic ~ path:", path);
        go(path, {
            type: 'url',
            success: (res) => {
                console.log('success', res);
            },
            fail: (res) => {
                console.log('fail', res);
            },
            complete: (res) => {
                console.log('complete', res);
            }
        });
    }
}
//# sourceMappingURL=index.js.map