import { TaskType, TaskStatus } from "./task";
export type Platform = 'webview' | 'miniprogram' | 'rn';
export interface Config {
    platform: Platform;
    appId: string;
    fetchCore: any;
    activityId: string;
    isDebugger?: boolean;
    baseUrl?: string;
    deviceId?: string;
}
export interface NavigateParams {
    event?: any;
    type?: 'url' | 'deeplink';
    success?: (res?: any) => void;
    fail?: (err?: any) => void;
    complete?: (res: any) => void;
}
export interface EnvConfig {
    fetchCore: any;
    activityId: string;
    isDebugger?: boolean;
    baseUrl?: string;
    deviceId?: string;
}
export declare enum eventMissionType {
    NOTE_CHANGE = "NOTE_CHANGE",
    NOTE_BROWSE = "NOTE_BROWSE",
    NOTE_LIKE = "NOTE_LIKE",
    FOLLOW_USER = "FOLLOW_USER",
    SEARCH_NOTE = "SEARCH_NOTE",
    INVITE_ASSIST = "INVITE_ASSIST"
}
export interface ViewTopicParams {
    times?: number;
    source?: string;
    asc?: number;
    totalSize?: number;
}
export declare enum UserType {
    /** 新用户 */
    NEW = "NEW",
    /** 召回用户 */
    RECALL = "RECALL",
    /** 拉活用户 */
    REVIVE = "REVIVE",
    /** 老用户 */
    ACTIVE = "ACTIVE"
}
export interface UserTypeResponse {
    data: {
        userType: UserType;
    };
}
export type QueryParams = {
    [key: string]: string | number | boolean | undefined;
};
export interface Notification {
    notificationData: NotificationData;
    notificationId: string;
}
export interface NotificationData {
    taskType: string;
    avatarUrl: string;
    useIName: string;
}
export interface ITaskElement {
    taskMetaId: string;
    instanceId: string;
    taskType: TaskType;
    name: string;
    taskStatus: TaskStatus;
    progress: string;
    expireTime: string;
    triggerMeta: {
        triggerCondition: string | undefined;
        viewAttribute?: string | undefined;
        action?: string | undefined;
    };
    extra: {
        shareCode?: string | undefined;
    };
}
export interface ItriggerMetaData {
    triggerCondition: Array<string> | undefined;
    viewAttribute?: Record<string, any> | undefined;
    action?: string | undefined;
}
export interface ITaskInfo {
    triggerMeta?: ItriggerMetaData;
    instanceId?: string | undefined;
    taskStatus?: TaskStatus;
    extra?: {
        shareCode?: string | undefined;
    };
}
/** 防封返回的链接 */
export interface IStrategyResult {
    url: string;
    realUrl?: string;
    commandString?: string;
    strategyType: number;
}
//# sourceMappingURL=index.d.ts.map