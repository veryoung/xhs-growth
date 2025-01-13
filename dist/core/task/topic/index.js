import { go } from "../../../index";
export class TopicTask {
    viewTopic(pageId, params) {
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
        const queryParams = new URLSearchParams({
            activityId: 'xyxiaomaibu',
            taskId: '3124',
            taskType: 'TOPIC_NOTE_BROWSE',
            ...((params === null || params === void 0 ? void 0 : params.times) && { times: params.times.toString() }),
            ...((params === null || params === void 0 ? void 0 : params.source) && { source: params.source }),
            ...((params === null || params === void 0 ? void 0 : params.asc) && { asc: params.asc.toString() }),
            ...((params === null || params === void 0 ? void 0 : params.totalSize) && { totalSize: params.totalSize.toString() })
        }).toString();
        const statsPath = `https://yingzheng.xiaohongshu.com/overview?${queryParams}`;
        go(statsPath, { type: 'url' });
    }
}
