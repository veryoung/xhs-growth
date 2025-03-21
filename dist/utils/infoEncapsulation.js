import { TaskType } from "../types/task";
export const infoEncapsulation = (type, item) => {
    var _a, _b, _c, _d, _e;
    switch (type) {
        // 话题笔记发布
        case TaskType.TOPIC_NOTE_PUBLISH:
            return {
                topicId: JSON.parse((_a = item.triggerMeta.triggerCondition) !== null && _a !== void 0 ? _a : '[]'),
            };
<<<<<<< HEAD
        // 邀请助力
=======
>>>>>>> 885b3bb (feat: 更新版本)
        case TaskType.INVITE_ASSISTANCE_LIMIT:
            return {
                shareCode: item.extra.shareCode,
            };
        // 话题笔记浏览
        case TaskType.TOPIC_NOTE_BROWSE:
            return {
                viewTaskType: item.triggerMeta.action,
                pageId: JSON.parse((_b = item.triggerMeta.triggerCondition) !== null && _b !== void 0 ? _b : '[]'),
                timeLimit: JSON.parse((_c = item.triggerMeta.viewAttribute) !== null && _c !== void 0 ? _c : '{}'),
            };
        // 关注用户
        case TaskType.FOLLOW_USER:
            return {
                userId: JSON.parse((_d = item.triggerMeta.triggerCondition) !== null && _d !== void 0 ? _d : '[]'),
            };
        // 搜索笔记
        case TaskType.SEARCH_NOTE:
            return {
                keyword: JSON.parse((_e = item.triggerMeta.triggerCondition) !== null && _e !== void 0 ? _e : '[]'),
            };
        // 笔记点赞
        case TaskType.NOTE_LIKE:
            return {};
        default:
            throw new Error(`不支持的任务类型,请联系默风进行排查: ${type}`);
    }
};
//# sourceMappingURL=infoEncapsulation.js.map