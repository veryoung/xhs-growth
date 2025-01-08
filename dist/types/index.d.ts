export type Platform = 'webview' | 'miniprogram' | 'rn';
export interface Config {
    platform: Platform;
    appId: string;
    fetch: (...params: any) => void;
}
//# sourceMappingURL=index.d.ts.map