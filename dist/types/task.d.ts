/**
 * 任务状态
 */
export declare enum TaskStatus {
    /** 未完成 */
    UNFINISHED = "UNFINISHED",
    /** 已完成 */
    FINISHED = "FINISHED",
    /** 未领取 */
    UNCLAIMED = "UNCLAIMED",
    /** 过期的 */
    TIMEOUT = "TIMEOUT",
    /** 过期的 */
    EXPIRED = "EXPIRED"
}
/**
 * 任务类型
 */
export declare enum TaskType {
    TOPIC_NOTE_PUBLISH = "TOPIC_NOTE_PUBLISH",
    INVITE_ASSISTANCE_LIMIT = "INVITE_ASSISTANCE_LIMIT",
    TOPIC_NOTE_BROWSE = "TOPIC_NOTE_BROWSE",
    NOTE_LIKE = "NOTE_LIKE",
    FOLLOW_USER = "FOLLOW_USER",
    SEARCH_NOTE = "SEARCH_NOTE"
}
//# sourceMappingURL=task.d.ts.map