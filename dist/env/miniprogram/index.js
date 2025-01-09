import { httpConfig } from "../../config/http.config";
import { xhs } from "../../types/xhs.d";
export default class MiniProgramEnv {
    constructor(config) {
        this.fetchCore = config.fetchCore;
        this.coreBaseUrl = config.baseUrl || '';
        this.activityId = config.activityId;
    }
    go(path, params) {
        // 实现小程序的跳转逻辑
        xhs.navigateTo({
            url: path || '',
            event: params === null || params === void 0 ? void 0 : params.event,
            success: params === null || params === void 0 ? void 0 : params.success,
            fail: params === null || params === void 0 ? void 0 : params.fail,
            complete: params === null || params === void 0 ? void 0 : params.complete
        });
    }
    fetch(method, url, data, header) {
        return new Promise((resolve, reject) => {
            url = url.replace('{activityId}', this.activityId);
            url = this.coreBaseUrl + url;
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
                success: (res) => {
                    resolve(res.data);
                },
                fail: async (error) => {
                    if (error.code === 10009) {
                        await this.init();
                        this.fetch(method, url, data, header);
                        return;
                    }
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
        const res = await this.fetch('POST', '/api/growth/haydn/{activityId}/user/type');
        console.log("🚀 ~ MiniProgramEnv ~ getUserType ~ res:", res);
        return res;
    }
}
//# sourceMappingURL=index.js.map