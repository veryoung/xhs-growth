/**
 * 任务状态
 */
export enum TaskStatus {
    /** 未完成 */
    UNFINISHED = 'UNFINISHED',
    /** 已完成 */
    FINISHED = 'FINISHED',
    /** 未领取 */
    UNCLAIMED = 'UNCLAIMED',
    /** 过期的 */
    TIMEOUT = "TIMEOUT",
    /** 过期的 */
    EXPIRED = "EXPIRED",
}

/**
 * 任务类型
 */
export enum TaskType {
    // 话题笔记发布
    TOPIC_NOTE_PUBLISH = "TOPIC_NOTE_PUBLISH",
    // 邀请助力
    INVITE_ASSISTANCE_LIMIT = "INVITE_ASSISTANCE_LIMIT",
    // 话题笔记浏览
    TOPIC_NOTE_BROWSE = "TOPIC_NOTE_BROWSE",
    // 笔记点赞
    NOTE_LIKE = "NOTE_LIKE",
    // 关注用户
    FOLLOW_USER = "FOLLOW_USER",
    // 搜索笔记
    SEARCH_NOTE = "SEARCH_NOTE",
}
