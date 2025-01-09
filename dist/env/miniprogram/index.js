import { httpConfig } from "../../config/http.config";
export default class MiniProgramEnv {
    constructor(config) {
        this.fetchCore = config.fetchCore;
        this.coreBaseUrl = config.baseUrl || '';
        this.activityId = config.activityId;
    }
    go(path, params) {
        // 实现小程序的跳转逻辑
        console.log('MiniProgram go to:', path, params);
        this.fetchCore.navigateTo({
            url: path,
            success: params === null || params === void 0 ? void 0 : params.success,
            fail: params === null || params === void 0 ? void 0 : params.fail,
            complete: params === null || params === void 0 ? void 0 : params.complete
        });
    }
    async fetch(method, url, data, header) {
        // 替换活动id
        url = url.replace('{activityId}', this.activityId);
        // 拼接baseUrl
        url = this.coreBaseUrl + url;
        console.log("🚀 ~ MiniProgramEnv ~ fetch ~ url:", url);
        try {
            const res = await this.fetchCore.request({
                url: url,
                method: method,
                data: data,
                header: header,
            });
            console.log("🚀 ~ MiniProgramEnv ~ fetch ~ res:", res);
            return res;
        }
        catch (error) {
            console.log("🚀 ~ MiniProgramEnv ~ fetch ~ error:", error);
            throw error;
        }
    }
    async init() {
        const { code } = await xhs.login();
        if (!code) {
            throw new Error('请完成小程序登录');
        }
        this.requestToken = await this.authorization(code);
        // return this.authorization(code);
    }
    async authorization(code) {
        // 实现小程序的授权逻辑
        console.log('MiniProgram authorization:', code);
        const res = await this.fetch('POST', httpConfig.API_LIST.login, {
            code: code,
        }, {});
        const response = res;
        console.log("1111");
        console.log("🚀 ~ MiniProgramEnv ~ authorization ~ res:", response);
        console.log("🚀 ~ MiniProgramEnv ~ authorization ~ res:", response.data.authorization);
        return response.data.authorization;
    }
    getUserType() {
        // console.log("🚀 ~ MiniProgramEnv ~ getUserType ~ header:", header)
        return this.fetch('POST', '/api/growth/haydn/{activityId}/user/type', {}, {
            'authorization': `Bearer ${this.requestToken}`
        });
    }
}
//# sourceMappingURL=index.js.map