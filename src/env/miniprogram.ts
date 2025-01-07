export default class MiniProgramEnv {
    go(path: string, params?: object) {
      // 实现小程序的跳转逻辑
      console.log('MiniProgram go to:', path, params);
    }


    fetch(method: string, url: string, data?: object) {
      // 实现小程序的网络请求逻辑
      console.log('MiniProgram fetch:', method, url, data);

    }
  }