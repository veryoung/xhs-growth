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
                    console.log("success", res);
                    if (((_a = res.data) === null || _a === void 0 ? void 0 : _a.code) === 10009) {
                        yield this.init();
                        console.log(method, url, data, header);
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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            let currentCode = GrowthCore.code;
            if (!currentCode) {
                const { code } = yield xhs.login();
                GrowthCore.setCode(code);
                currentCode = code;
            }
            if (!currentCode) {
                throw new Error('请完成小程序登录');
            }
            yield this.setAuthorization(currentCode);
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
