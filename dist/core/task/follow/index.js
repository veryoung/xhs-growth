<<<<<<< HEAD
<<<<<<< HEAD
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
import GrowthCore from "../../../index";
export class FollowTask {
<<<<<<< HEAD
    takeFollow(accountId, taskMetaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GrowthCore.task.claimTask(taskMetaId);
            console.log("🚀 ~ FollowTask ~ takeFollow ~ res:", res);
        });
=======
    /** 关注 */
    async takeFollow(accountId, taskMetaId) {
        const res = await GrowthCore.task.claimTask(taskMetaId);
        if (res.code === 0) {
            console.log("🚀 ~ FollowTask ~ takeFollow ~ res:", res);
        }
        return res;
=======
<<<<<<< HEAD
import GrowthCore from "../../../index";
export class FollowTask {
    /** 关注 */
    async takeFollow(accountId, taskMetaId) {
        const res = await GrowthCore.task.claimTask(taskMetaId);
        console.log("🚀 ~ FollowTask ~ takeFollow ~ res:", res);
>>>>>>> e45e8c3 (feat: 修复发布问题)
        // go(`xhsdiscover://user/${accountId}`, {
        //   type: 'deeplink',
        //   success: (res: any) => {
        //     console.log('success', res)
        //   },
        //   fail: (res: any) => {
        //     console.log('fail', res)
        //   },
        //   complete: (res: any) => {
        //     console.log('complete', res)
        //   }
        // });
<<<<<<< HEAD
>>>>>>> 9d8f8bc (feat: lastEdition)
    }
=======
    }
    /** 取消关注 */
=======
import { go } from "../../../index";
export class FollowTask {
    takeFollow(accountId) {
        go(`xhsdiscover://user/${accountId}`, {
            type: 'deeplink',
            success: (res) => {
                console.log('success', res);
            },
            fail: (res) => {
                console.log('fail', res);
            },
            complete: (res) => {
                console.log('complete', res);
            }
        });
    }
>>>>>>> b932bf8 (feat: 修复发布问题)
>>>>>>> e45e8c3 (feat: 修复发布问题)
=======
import GrowthCore from "../../../index";
export class FollowTask {
    takeFollow(accountId, taskMetaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GrowthCore.task.claimTask(taskMetaId);
            console.log("🚀 ~ FollowTask ~ takeFollow ~ res:", res);
        });
    }
>>>>>>> 9354520 (feat: 新增能力)
    cancelFollow() {
        console.log("Cancel follow task");
    }
}
