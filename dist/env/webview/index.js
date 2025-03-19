export default class WebviewEnv {
    constructor(config) {
        this.fetchCore = config.fetchCore;
    }
    go(path, params) {
        // 实现 webview 的跳转逻辑
        window.open(path, '_blank');
    }
    fetch(method, url, data, header) {
        if (method === 'POST') {
            this.fetchCore.post(url, data, header);
        }
        if (method === 'GET') {
            this.fetchCore.get(url, data, header);
        }
    }
}
//# sourceMappingURL=index.js.map