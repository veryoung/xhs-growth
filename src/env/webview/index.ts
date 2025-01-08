export default class WebviewEnv {
  private fetchCore: any;
  constructor(config: {
    fetchCore: any;
  }) {
    this.fetchCore = config.fetchCore;
  }
  go(path: string, params?: object) {
    // 实现 webview 的跳转逻辑
    window.open(path, '_blank');
  }

  fetch(method: string, url: string, data?: object, header?: object) {
    
    if(method === 'POST') {
      this.fetchCore.post(url, data, header)
    }
    if(method === 'GET') {
      this.fetchCore.get(url, data, header)
    }
  }
}
