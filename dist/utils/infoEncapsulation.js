import { TaskType } from "../types/task";
export const infoEncapsulation = (type, item) => {
    var _a, _b, _c, _d;
    switch (type) {
        case TaskType.TOPIC_NOTE_PUBLISH:
            return {
                topicId: JSON.parse((_a = item.triggerMeta.triggerCondition) !== null && _a !== void 0 ? _a : '[]'),
            };
        case TaskType.INVITE_ASSISTANCE:
            return {
                shareCode: item.extra.shareCode,
            };
        case TaskType.TOPIC_NOTE_BROWSE:
            return {
                viewTaskType: item.triggerMeta.action,
                pageId: JSON.parse((_b = item.triggerMeta.triggerCondition) !== null && _b !== void 0 ? _b : '[]'),
                timeLimit: JSON.parse((_c = item.triggerMeta.viewAttribute) !== null && _c !== void 0 ? _c : '{}'),
            };
        case TaskType.FOLLOW_USER:
            return {
                userId: JSON.parse((_d = item.triggerMeta.triggerCondition) !== null && _d !== void 0 ? _d : '[]'),
            };
        case TaskType.SEARCH_NOTE:
            return {};
        case TaskType.NOTE_LIKE:
            return {};
        default:
            return {};
    }
};
