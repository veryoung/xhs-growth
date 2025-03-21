export var TaskStatus;
(function (TaskStatus) {
    TaskStatus["UNFINISHED"] = "UNFINISHED";
    TaskStatus["FINISHED"] = "FINISHED";
    TaskStatus["UNCLAIMED"] = "UNCLAIMED";
    TaskStatus["TIMEOUT"] = "TIMEOUT";
    TaskStatus["EXPIRED"] = "EXPIRED";
})(TaskStatus || (TaskStatus = {}));
export var TaskType;
(function (TaskType) {
    TaskType["TOPIC_NOTE_PUBLISH"] = "TOPIC_NOTE_PUBLISH";
    TaskType["INVITE_ASSISTANCE_LIMIT"] = "INVITE_ASSISTANCE_LIMIT";
    TaskType["TOPIC_NOTE_BROWSE"] = "TOPIC_NOTE_BROWSE";
    TaskType["NOTE_LIKE"] = "NOTE_LIKE";
    TaskType["FOLLOW_USER"] = "FOLLOW_USER";
    TaskType["SEARCH_NOTE"] = "SEARCH_NOTE";
})(TaskType || (TaskType = {}));
