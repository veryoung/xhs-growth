import WebviewEnv from './webview/index';
import MiniProgramEnv from './miniprogram';
import RNEnv from './rn';
export function createEnvironment(platform) {
    switch (platform) {
        case 'webview':
            return new WebviewEnv();
        case 'miniprogram':
            return new MiniProgramEnv();
        case 'rn':
            return new RNEnv();
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
}
//# sourceMappingURL=index.js.map