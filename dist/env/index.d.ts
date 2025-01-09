import { Platform } from '../types';
import WebviewEnv from './webview/index';
import MiniProgramEnv from './miniprogram';
import RNEnv from './rn';
export declare function createEnvironment(platform: Platform, config: {
    /** 请求核心 */
    fetchCore: any;
    /** 活动id */
    activityId: string;
    /** 是否是调试模式 */
    isDebugger?: boolean;
    /** 请求根域名 */
    baseUrl?: string;
}): MiniProgramEnv | WebviewEnv | RNEnv;
//# sourceMappingURL=index.d.ts.map