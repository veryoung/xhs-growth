import { Platform } from '../types';
import WebviewEnv from './webview/index';
import MiniProgramEnv from './miniprogram';
import RNEnv from './rn';
export declare function createEnvironment(platform: Platform, config: {
    fetchCore: any;
    activityId: string;
    isDebugger?: boolean;
    baseUrl?: string;
}): WebviewEnv | MiniProgramEnv | RNEnv;
//# sourceMappingURL=index.d.ts.map