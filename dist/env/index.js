import WebviewEnv from './webview/index';
import MiniProgramEnv from './miniprogram';
import RNEnv from './rn';
import { httpConfig } from '../config/http.config';
export function createEnvironment(platform, config) {
    let baseUrl = config.baseUrl;
    if (!config.isDebugger) {
        baseUrl = httpConfig.BASE_URL.production;
    }
    else {
        baseUrl = config.baseUrl || httpConfig.BASE_URL.development;
    }
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
