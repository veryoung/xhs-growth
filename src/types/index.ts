export type Platform = 'webview' | 'miniprogram' | 'rn';

export interface Config {
  platform: Platform;
  appId: string
  fetchCore: any;
  activityId: string;
  isDebugger?: boolean;
  baseUrl?: string;
  deviceId?: string;
}

export interface NavigateParams {
  event?: any;
  type?: 'url' | 'deeplink'
  success?: (res?:any) => void;
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

export enum eventMissionType {
  // 发布笔记
  NOTE_CHANGE = 'NOTE_CHANGE',

  // 笔记浏览
  NOTE_BROWSE = 'NOTE_BROWSE',

  // 笔记点赞
  NOTE_LIKE = 'NOTE_LIKE',

  // 关注用户
  FOLLOW_USER = 'FOLLOW_USER',

  // 笔记搜索
  SEARCH_NOTE = 'SEARCH_NOTE',

  // 邀请助力
  INVITE_ASSIST = 'INVITE_ASSIST'
}

export interface ViewTopicParams {
  times?: number;
  source?: string;
  asc?: number;
  totalSize?: number;
}

export interface UserTypeResponse {
  data: {
    userType: string;
  }
}

export type QueryParams = {
  [key: string]: string | number | boolean | undefined;
}

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
  }
  instanceId?: string;
}

/** 防封返回的链接 */
export interface IStrategyResult {
  // 处理后的 url，当前返回值一定是个 url，可以是原链接、处理后的 url、短链 等
  url: string
  // 原始 url，只有当开启短链时会返回（即 短链对应的原始 url）
  realUrl?: string
  // 只有开启口令策略时才会生效，返回此字段，且如果口令返回无效，请使用 url 参数或自己兜底
  commandString?: string

  strategyType: number // 防封的标识，当返回 99 时，标识所有防封策略均失效
}
