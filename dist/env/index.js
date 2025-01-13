import WebviewEnv from './webview/index';
import MiniProgramEnv from './miniprogram';
import RNEnv from './rn';
import { httpConfig } from '../config/http.config';
export function createEnvironment(platform, config) {
    let baseUrl = config.baseUrl;
    // 如果不是测试模式则使用正式环境
    if (!config.isDebugger) {
        baseUrl = httpConfig.BASE_URL.production;
    }
    else {
        // 如果有传入baseUrl则使用传入的baseUrl，否则使用测试环境
        baseUrl = config.baseUrl || httpConfig.BASE_URL.development;
    }
    // 重置baseUrl
    config.baseUrl = baseUrl;
    switch (platform) {
        case 'webview':
            return new WebviewEnv(config);
        case 'miniprogram':
            return new MiniProgramEnv(config);
        case 'rn':
            return new RNEnv(config);
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
}
