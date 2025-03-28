export var eventMissionType;
(function (eventMissionType) {
    // 发布笔记
    eventMissionType["NOTE_CHANGE"] = "NOTE_CHANGE";
    // 笔记浏览
    eventMissionType["NOTE_BROWSE"] = "NOTE_BROWSE";
    // 笔记点赞
    eventMissionType["NOTE_LIKE"] = "NOTE_LIKE";
    // 关注用户
    eventMissionType["FOLLOW_USER"] = "FOLLOW_USER";
    // 笔记搜索
    eventMissionType["SEARCH_NOTE"] = "SEARCH_NOTE";
    // 邀请助力
    eventMissionType["INVITE_ASSIST"] = "INVITE_ASSIST";
})(eventMissionType || (eventMissionType = {}));
export var UserType;
(function (UserType) {
    /** 新用户 */
    UserType["NEW"] = "NEW";
    /** 召回用户 */
    UserType["RECALL"] = "RECALL";
    /** 拉活用户 */
    UserType["REVIVE"] = "REVIVE";
    /** 老用户 */
    UserType["ACTIVE"] = "ACTIVE";
})(UserType || (UserType = {}));
//# sourceMappingURL=index.js.map