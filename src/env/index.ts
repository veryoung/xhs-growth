import { Platform } from '../types';
import WebviewEnv from './webview/index';
import MiniProgramEnv from './miniprogram';
import RNEnv from './rn';

export function createEnvironment(platform: Platform, config: {
  fetchCore: any;
}) {
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