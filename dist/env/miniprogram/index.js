var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { httpConfig } from "../../config/http.config";
import GrowthCore from "../../index";
export default class MiniProgramEnv {
    constructor(config) {
        this.isAuthing = false;
        this.authRetryCount = 0;
        this.MAX_AUTH_RETRY_COUNT = 3;
        this.authRequests = {};
        this.fetchCore = config.fetchCore;
        this.coreBaseUrl = config.baseUrl || '';
        this.activityId = config.activityId || '';
        this.deviceId = config.deviceId || '';
    }
    go(path, params) {
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
            const url = path.replace('https://', '');
            const [urlPath, query] = url.split('?');
            const deeplink = `xhsdiscover://webview/${urlPath}?${decodeURIComponent(query)}`;
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
            header = Object.assign(Object.assign(Object.assign({}, header), (this.requestToken && { 'authorization': `${this.requestToken}` })), (this.deviceId && { 'X-Legacy-Did': `${this.deviceId}` }));
            this.fetchCore.request({
                url,
                method,
                data,
                header,
                success: (res) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if (((_a = res.data) === null || _a === void 0 ? void 0 : _a.code) === 10009) {
                        if ((this.authRetryCount < this.MAX_AUTH_RETRY_COUNT) && !this.isAuthing) {
                            this.authRetryCount++;
                            this.requestToken = '';
                            GrowthCore.code = '';
                            const { code: newCode } = yield xhs.login();
                            yield this.executeAuthRequest(newCode);
                            return resolve(yield this.fetch(method, url, data, header));
                        }
                        else if (!this.isAuthing) {
                            console.log(`已达到最大授权重试次数 ${this.MAX_AUTH_RETRY_COUNT}，请求失败`);
                            this.authRetryCount = 0;
                            return resolve({
                                code: 10010,
                                msg: '授权失败，已达到最大重试次数',
                                data: null
                            });
                        }
                    }
                    resolve(res.data);
                }),
                fail: (error) => __awaiter(this, void 0, void 0, function* () {
                    reject(error);
                })
            });
        });
    }
    init(code, force) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentCode = GrowthCore.code;
            try {
                if (!currentCode) {
                    if (!code) {
                        const { code: xhsCode } = yield xhs.login();
                        GrowthCore.setCode(xhsCode);
                        currentCode = xhsCode;
                    }
                    else {
                        GrowthCore.setCode(code);
                        currentCode = code;
                    }
                }
                if (!currentCode) {
                    throw new Error('请完成小程序登录');
                }
                const token = yield this.setAuthorization(currentCode, force);
                return token;
            }
            catch (error) {
                return '';
            }
        });
    }
    setAuthorization(code, force) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.requestToken && !force) {
                return this.requestToken;
            }
            if (!this.authRequests[code]) {
                this.authRequests[code] = [];
            }
            return new Promise((resolve) => {
                this.authRequests[code].push(resolve);
                if (this.authRequests[code].length === 1) {
                    this.executeAuthRequest(code);
                }
            });
        });
    }
    executeAuthRequest(code) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.isAuthing = true;
                const res = yield this.fetch('POST', httpConfig.API_LIST.login, {
                    code,
                });
                this.isAuthing = false;
                if ((_a = res.data) === null || _a === void 0 ? void 0 : _a.authorization) {
                    this.requestToken = res.data.authorization;
                    const resolvers = [...this.authRequests[code]];
                    resolvers.forEach(resolve => resolve(this.requestToken));
                }
                else {
                    throw new Error('授权失败');
                }
            }
            catch (error) {
                console.error('授权请求失败', error);
                const resolvers = [...this.authRequests[code]];
                resolvers.forEach(resolve => resolve(''));
            }
            finally {
                delete this.authRequests[code];
            }
        });
    }
    getUserType() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    getActivityId() {
        return this.activityId;
    }
    getRequestToken() {
        return this.requestToken;
    }
}
