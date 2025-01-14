<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> e45e8c3 (feat: 修复发布问题)
=======
>>>>>>> 9354520 (feat: 新增能力)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
=======
>>>>>>> 9354520 (feat: 新增能力)
import { httpConfig } from "../../config/http.config";
export default class MiniProgramEnv {
    constructor(config) {
        this.fetchCore = config.fetchCore;
        this.coreBaseUrl = config.baseUrl || '';
        this.activityId = config.activityId;
    }
    go(path, params) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        console.log("🚀 ~ MiniProgramEnv ~ go ~ params:", params);
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
=======
>>>>>>> 9354520 (feat: 新增能力)
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
<<<<<<< HEAD
<<<<<<< HEAD
            const url = path.replace('https://', '');
            const [urlPath, query] = url.split('?');
            const deeplink = `xhsdiscover://webview/${urlPath}?${decodeURIComponent(query)}`;
=======
<<<<<<< HEAD
            // 去掉https://
            const url = path.replace('https://', '');
            // 分离url和query
            const [urlPath, query] = url.split('?');
            // 添加xhsdiscover://webview/
            const deeplink = `xhsdiscover://webview/${urlPath}?${decodeURIComponent(query)}`;
            // 实现小程序的跳转逻辑
=======
            const url = path.replace('https://', '');
            const [urlPath, query] = url.split('?');
            const deeplink = `xhsdiscover://webview/${urlPath}?${decodeURIComponent(query)}`;
            console.log("🚀 ~ MiniProgramEnv ~ go ~ deeplink:", deeplink);
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
=======
            const url = path.replace('https://', '');
            const [urlPath, query] = url.split('?');
            const deeplink = `xhsdiscover://webview/${urlPath}?${decodeURIComponent(query)}`;
>>>>>>> 9354520 (feat: 新增能力)
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
<<<<<<< HEAD
<<<<<<< HEAD
            if (this.requestToken) {
                header = Object.assign(Object.assign({}, header), { 'authorization': `${this.requestToken}` });
=======
<<<<<<< HEAD
            if (this.requestToken) {
                header = {
                    ...header,
                    'authorization': `${this.requestToken}`
                };
=======
            console.log("🚀 ~ MiniProgramEnv ~ returnnewPromise ~ url:", url);
            if (this.requestToken) {
                header = Object.assign(Object.assign({}, header), { 'authorization': `${this.requestToken}` });
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
=======
            if (this.requestToken) {
                header = Object.assign(Object.assign({}, header), { 'authorization': `${this.requestToken}` });
>>>>>>> 9354520 (feat: 新增能力)
            }
            this.fetchCore.request({
                url,
                method,
                data,
                header,
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
                success: async (res) => {
                    var _a;
                    console.log("success", res);
                    if (((_a = res.data) === null || _a === void 0 ? void 0 : _a.code) === 10009) {
                        await this.init();
                        console.log(method, url, data, header);
                        return await this.fetch(method, url, data, header);
                    }
                    resolve(res.data);
                },
                fail: async (error) => {
=======
>>>>>>> e45e8c3 (feat: 修复发布问题)
=======
>>>>>>> 9354520 (feat: 新增能力)
                success: (res) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    console.log("success", res);
                    if (((_a = res.data) === null || _a === void 0 ? void 0 : _a.code) === 10009) {
                        yield this.init();
                        console.log(method, url, data, header);
<<<<<<< HEAD
<<<<<<< HEAD
                        return yield this.fetch(method, url, data, header);
                    }
                    resolve(res.data);
                }),
                fail: (error) => __awaiter(this, void 0, void 0, function* () {
                    console.log("fail", error);
                    reject(error);
                })
            });
        });
    }
=======
                        this.fetch(method, url, data, header);
                        return;
=======
                        return yield this.fetch(method, url, data, header);
>>>>>>> 9354520 (feat: 新增能力)
                    }
                    resolve(res.data);
                }),
                fail: (error) => __awaiter(this, void 0, void 0, function* () {
                    console.log("fail", error);
                    reject(error);
                })
            });
        });
    }
<<<<<<< HEAD
<<<<<<< HEAD
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
        var _a;
        try {
            const res = await this.fetch('POST', httpConfig.API_LIST.userType);
            if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.userType) {
                return res.data.userType;
            }
            return '';
        }
        catch (error) {
            return '';
        }
    }
    getActivityId() {
        return this.activityId;
    }
    getRequestToken() {
        return this.requestToken;
=======
>>>>>>> e45e8c3 (feat: 修复发布问题)
=======
>>>>>>> 9354520 (feat: 新增能力)
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = yield xhs.login();
            if (!code) {
                throw new Error('请完成小程序登录');
            }
            yield this.setAuthorization(code);
        });
    }
    setAuthorization(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.fetch('POST', httpConfig.API_LIST.login, {
                code: code,
            });
            console.log('MiniProgram authorization:', res);
            this.requestToken = res.data.authorization;
        });
    }
    getUserType() {
        return __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 24408f1 (feat: changeToPromiseType)
            var _a;
            try {
                const res = yield this.fetch('POST', httpConfig.API_LIST.userType);
                if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.userType) {
                    return res.data.userType;
                }
                return '';
            }
            catch (error) {
                return '';
            }
<<<<<<< HEAD
        });
    }
    getActivityId() {
        return this.activityId;
    }
    getRequestToken() {
        return this.requestToken;
=======
            const res = yield this.fetch('POST', httpConfig.API_LIST.userType);
            console.log("🚀 ~ MiniProgramEnv ~ getUserType ~ res:", res);
            return res;
=======
>>>>>>> 24408f1 (feat: changeToPromiseType)
        });
<<<<<<< HEAD
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
=======
    }
    getActivityId() {
        return this.activityId;
    }
    getRequestToken() {
        return this.requestToken;
>>>>>>> 9354520 (feat: 新增能力)
    }
}
