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
    NEW = "NEW",
    RECALL = "RECALL",
    REVIVE = "REVIVE",
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
export interface ItriggerMeta {
    triggerMeta: {
        triggerCondition: string;
        viewAttribute?: string;
        action?: string;
    };
    instanceId?: string;
}
export interface IStrategyResult {
    url: string;
    realUrl?: string;
    commandString?: string;
    strategyType: number;
}
//# sourceMappingURL=index.d.ts.map