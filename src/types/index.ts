export type Platform = 'webview' | 'miniprogram' | 'rn';

export interface Config {
  platform: Platform;
  appId: string
  fetchCore: any;
}
