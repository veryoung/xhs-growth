import { httpConfig } from "../../config/http.config";
export default class MiniProgramEnv {
    constructor(config) {
        this.fetchCore = config.fetchCore;
        this.coreBaseUrl = config.baseUrl || '';
        this.activityId = config.activityId;
    }
    go(path, params) {
        console.log("🚀 ~ MiniProgramEnv ~ go ~ params:", params);
        console.log("🚀 ~ MiniProgramEnv ~ go ~ path:", path);
        if ((params === null || params === void 0 ? void 0 : params.type) === 'deeplink') {
            xhs.openXhsDeeplink({
                link: path || '',
                success: params === null || params === void 0 ? void 0 : params.success,
                fail: params === null || params === void 0 ? void 0 : params.fail,
                complete: params === null || params === void 0 ? void 0 : params.complete
            });
            return;
        }
        if ((params === null || params === void 0 ? void 0 : params.type) === 'url') {
            // 去掉https://
            const url = path.replace('https://', '');
            // 分离url和query
            const [urlPath, query] = url.split('?');
            // 添加xhsdiscover://webview/
            const deeplink = `xhsdiscover://webview/${urlPath}?${decodeURIComponent(query)}`;
            // 实现小程序的跳转逻辑
            console.log("🚀 ~ MiniProgramEnv ~ go ~ deeplink:", deeplink);
            xhs.openXhsDeeplink({
                link: deeplink,
                success: params === null || params === void 0 ? void 0 : params.success,
                fail: params === null || params === void 0 ? void 0 : params.fail,
                complete: params === null || params === void 0 ? void 0 : params.complete
            });
            return;
        }
    }
    fetch(method, url, data, header) {
        return new Promise((resolve, reject) => {
            url = url.replace('{activityId}', this.activityId);
            if (!url.startsWith(this.coreBaseUrl)) {
                url = this.coreBaseUrl + url;
            }
            console.log("🚀 ~ MiniProgramEnv ~ returnnewPromise ~ url:", url);
            if (this.requestToken) {
                header = {
                    ...header,
                    'authorization': `${this.requestToken}`
                };
            }
            this.fetchCore.request({
                url,
                method,
                data,
                header,
                success: async (res) => {
                    var _a;
                    console.log("success", res);
                    if (((_a = res.data) === null || _a === void 0 ? void 0 : _a.code) === 10009) {
                        await this.init();
                        console.log(method, url, data, header);
                        this.fetch(method, url, data, header);
                        return;
                    }
                    resolve(res.data);
                },
                fail: (error) => {
                    console.log("fail", error);
                    reject(error);
                }
            });
        });
    }
    async init() {
        const { code } = await xhs.login();
        if (!code) {
            throw new Error('请完成小程序登录');
        }
        await this.setAuthorization(code);
    }
    /** 设置授权 */
    async setAuthorization(code) {
        // 实现小程序的授权逻辑
        const res = await this.fetch('POST', httpConfig.API_LIST.login, {
            code: code,
        });
        console.log('MiniProgram authorization:', res);
        this.requestToken = res.data.authorization;
    }
    async getUserType() {
        // console.log("🚀 ~ MiniProgramEnv ~ getUserType ~ header:", header)
        const res = await this.fetch('POST', httpConfig.API_LIST.userType);
        console.log("🚀 ~ MiniProgramEnv ~ getUserType ~ res:", res);
        return res;
    }
}
