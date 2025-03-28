import { TaskType } from "../types/task";
export const infoEncapsulation = (type, item) => {
    var _a, _b, _c, _d, _e, _f;
    switch (type) {
        case TaskType.TOPIC_NOTE_PUBLISH:
            return {
                topicId: JSON.parse((_a = item.triggerMeta.triggerCondition) !== null && _a !== void 0 ? _a : '[]'),
            };
        case TaskType.INVITE_ASSISTANCE_LIMIT:
            return {
                shareCode: (_b = item.extra) === null || _b === void 0 ? void 0 : _b.shareCode,
            };
        case TaskType.TOPIC_NOTE_BROWSE:
            return {
                viewTaskType: item.triggerMeta.action,
                pageId: JSON.parse((_c = item.triggerMeta.triggerCondition) !== null && _c !== void 0 ? _c : '[]'),
                timeLimit: JSON.parse((_d = item.triggerMeta.viewAttribute) !== null && _d !== void 0 ? _d : '{}'),
            };
        case TaskType.FOLLOW_USER:
            return {
                userId: JSON.parse((_e = item.triggerMeta.triggerCondition) !== null && _e !== void 0 ? _e : '[]'),
            };
        case TaskType.SEARCH_NOTE:
            return {
                keyword: JSON.parse((_f = item.triggerMeta.triggerCondition) !== null && _f !== void 0 ? _f : '[]'),
            };
        case TaskType.NOTE_LIKE:
            return {};
        default:
            throw new Error(`不支持的任务类型,请联系默风进行排查: ${type}`);
    }
};
