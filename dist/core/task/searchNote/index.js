var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setTaskNeededInfo } from "../../../utils/url";
import { go } from "../../../index";
import GrowthCore from "../../../index";
import { eventMissionType } from "../../../types";
export class SearchNote {
    searchNote(id, taskId, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskInfo = {
                    instanceId: taskId,
                    triggerMeta: {
                        triggerCondition: keyword,
                    },
                };
                const res = yield setTaskNeededInfo(id, taskInfo);
                if (res.code !== 0) {
                    return res;
                }
                const { instanceId, triggerMeta = {} } = res.data;
                const queryList = triggerMeta.triggerCondition || [];
                const targetURL = `xhsdiscover://search/result?keyword=${queryList[0]}`;
                console.log("🚀 ~ SearchNote ~ searchNote ~ targetURL:", targetURL);
                const completeRes = yield GrowthCore.task.completeTask(instanceId, eventMissionType.SEARCH_NOTE, {});
                go(targetURL, {
                    type: 'deeplink',
                    success: (res) => {
                        return {
                            code: res.code,
                            msg: res.msg,
                        };
                    },
                });
                return completeRes;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
