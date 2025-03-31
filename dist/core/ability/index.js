var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { go } from "../../index";
export class AbilityBus {
    constructor(core) {
        this.core = core;
    }
    goTargetUserPage(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `xhsdiscover://user/${userId}`;
            go(url, {
                type: 'deeplink',
                success: (res) => {
                    return {
                        code: res.code || 0,
                        msg: res.msg || '跳转目标主页成功',
                    };
                },
                fail: (err) => {
                    return {
                        code: -300,
                        msg: err.message || '跳转目标主页失败',
                    };
                }
            });
        });
    }
}
