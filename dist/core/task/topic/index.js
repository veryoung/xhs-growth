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
        //   const queryParams = new URLSearchParams({
        //     activityId: 'xyxiaomaibu',
        //     taskId: '3124',
        //     taskType: 'TOPIC_NOTE_BROWSE',
        //     ...(params?.times && { times: params.times.toString() }),
        //     ...(params?.source && { source: params.source }),
        //     ...(params?.asc && { asc: params.asc.toString() }),
        //     ...(params?.totalSize && { totalSize: params.totalSize.toString() })
        //   }).toString();
        //   const statsPath = `https://yingzheng.xiaohongshu.com/overview?${queryParams}`;
        //   console.log("🚀 ~ TopicTask ~ viewTopic ~ statsPath:", statsPath)
        //   go(statsPath, { type: 'url' });
    }
}
