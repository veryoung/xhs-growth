export type Platform = 'webview' | 'miniprogram' | 'rn';
export interface Config {
    platform: Platform;
    appId: string;
    fetchCore: any;
    activityId: string;
    isDebugger?: boolean;
    baseUrl?: string;
}
export interface NavigateParams {
    event?: any;
    success?: () => void;
    fail?: () => void;
    complete?: () => void;
}
export interface EnvConfig {
    fetchCore: any;
    activityId: string;
    isDebugger?: boolean;
    baseUrl?: string;
}
export declare enum eventMissionType {
    NOTE_CHANGE = "NOTE_CHANGE",
    NOTE_BROWSE = "NOTE_BROWSE",
    NOTE_LIKE = "NOTE_LIKE",
    FOLLOW_USER = "FOLLOW_USER",
    SEARCH_NOTE = "SEARCH_NOTE",
    INVITE_ASSIST = "INVITE_ASSIST"
}
//# sourceMappingURL=index.d.ts.map