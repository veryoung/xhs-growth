import { Platform } from '../types';
import WebviewEnv from './webview/index';
import MiniProgramEnv from './miniprogram';
import RNEnv from './rn';
export declare function createEnvironment(platform: Platform, config: {
    fetchCore: any;
}): WebviewEnv | MiniProgramEnv | RNEnv;
//# sourceMappingURL=index.d.ts.map