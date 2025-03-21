/**
 * 任务状态
 */
export var TaskStatus;
(function (TaskStatus) {
    /** 未完成 */
    TaskStatus["UNFINISHED"] = "UNFINISHED";
    /** 已完成 */
    TaskStatus["FINISHED"] = "FINISHED";
    /** 未领取 */
    TaskStatus["UNCLAIMED"] = "UNCLAIMED";
    /** 过期的 */
    TaskStatus["TIMEOUT"] = "TIMEOUT";
    /** 过期的 */
    TaskStatus["EXPIRED"] = "EXPIRED";
})(TaskStatus || (TaskStatus = {}));
/**
 * 任务类型
 */
export var TaskType;
(function (TaskType) {
    // 话题笔记发布
    TaskType["TOPIC_NOTE_PUBLISH"] = "TOPIC_NOTE_PUBLISH";
<<<<<<< HEAD
    // 邀请助力
    TaskType["INVITE_ASSISTANCE_LIMIT"] = "INVITE_ASSISTANCE_LIMIT";
    // 话题笔记浏览
=======
    TaskType["INVITE_ASSISTANCE_LIMIT"] = "INVITE_ASSISTANCE_LIMIT";
>>>>>>> 885b3bb (feat: 更新版本)
    TaskType["TOPIC_NOTE_BROWSE"] = "TOPIC_NOTE_BROWSE";
    // 笔记点赞
    TaskType["NOTE_LIKE"] = "NOTE_LIKE";
    // 关注用户
    TaskType["FOLLOW_USER"] = "FOLLOW_USER";
    // 搜索笔记
    TaskType["SEARCH_NOTE"] = "SEARCH_NOTE";
})(TaskType || (TaskType = {}));
//# sourceMappingURL=task.js.map