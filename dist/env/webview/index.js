export default class WebviewEnv {
    constructor(config) {
        this.fetchCore = config.fetchCore;
    }
    go(path, params) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
        // 实现 webview 的跳转逻辑
=======
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
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
