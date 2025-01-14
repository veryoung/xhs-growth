import WebviewEnv from './webview/index';
import MiniProgramEnv from './miniprogram';
import RNEnv from './rn';
import { httpConfig } from '../config/http.config';
export function createEnvironment(platform, config) {
    let baseUrl = config.baseUrl;
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
    // 如果不是测试模式则使用正式环境
=======
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
=======
>>>>>>> 9354520 (feat: 新增能力)
    if (!config.isDebugger) {
        baseUrl = httpConfig.BASE_URL.production;
    }
    else {
<<<<<<< HEAD
<<<<<<< HEAD
        baseUrl = config.baseUrl || httpConfig.BASE_URL.development;
    }
=======
<<<<<<< HEAD
        // 如果有传入baseUrl则使用传入的baseUrl，否则使用测试环境
        baseUrl = config.baseUrl || httpConfig.BASE_URL.development;
    }
    // 重置baseUrl
=======
        baseUrl = config.baseUrl || httpConfig.BASE_URL.development;
    }
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
=======
        baseUrl = config.baseUrl || httpConfig.BASE_URL.development;
    }
>>>>>>> 9354520 (feat: 新增能力)
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
