export default class MiniProgramEnv {
    go(path, params) {
        // 实现小程序的跳转逻辑
        console.log('MiniProgram go to:', path, params);
    }
    fetch(method, url, data, header) {
        // 实现小程序的网络请求逻辑
        // console.log('MiniProgram fetch:', method, url, data);
        // this.fetch.request({
        //   url: url,
        //   method: method,
        //   data: data,
        //   header: header,
        // });
    }
    authorization(code) {
        // 实现小程序的授权逻辑
        console.log('MiniProgram authorization:', code);
        return { 'Authorization': '5fd05bb56b4f4828bf24d3c4f1cc334' };
    }
}
//# sourceMappingURL=index.js.map