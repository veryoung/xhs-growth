export default class RNEnv {
  private fetchCore: any;
  constructor(config: {
    fetchCore: any;
  }) {
    this.fetchCore = config.fetchCore;
  }
  go(path: string, params?: object) {
    // 实现 React Native 的跳转逻辑
    console.log('React Native go to:', path, params);
  }

}