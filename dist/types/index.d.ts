export declare type Platform = 'webview' | 'miniprogram' | 'rn';
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
//# sourceMappingURL=index.d.ts.map