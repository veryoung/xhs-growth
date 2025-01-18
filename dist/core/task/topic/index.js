var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setTaskNeedInfo, filterTriggerMetaData, handleOnlyView, handleViewWithCountParams } from "../../../utils/url";
import GrowthCore from "../../../index";
export class TopicTask {
    viewTopic(taskMetaId, triggerMetaInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const res = yield setTaskNeedInfo(taskMetaId, triggerMetaInfo);
                console.log("🚀 ~ TopicTask ~ viewTopic ~ res:", res);
                if (res.code === 0) {
                    if (!((_a = res.data) === null || _a === void 0 ? void 0 : _a.triggerMeta)) {
                        return {
                            code: -406,
                            msg: '任务领取错误',
                        };
                    }
                    //using JSON.parse fixing possible errors
                    const fliteredTriggerMetaData = filterTriggerMetaData((_b = res.data) === null || _b === void 0 ? void 0 : _b.triggerMeta);
                    const { triggerCondition, viewAttribute = {}, action = 'SIMPLE_VIEW' } = fliteredTriggerMetaData;
                    GrowthCore.env.init();
                    switch (action) {
                        case 'SIMPLE_VIEW':
                            return handleOnlyView(triggerCondition, res.data.instanceId);
                        case 'VIEW_COUNT_NUM':
                            return handleViewWithCountParams(res.data.instanceId, viewAttribute, 2);
                        case 'VIEW_COUNT_TIME':
                            return handleViewWithCountParams(res.data.instanceId, viewAttribute, 1);
                    }
                }
                return {
                    code: res.code || -200,
                    msg: res.msg || '领取任务失败',
                };
            }
            catch (error) {
                console.error('TopicTask viewTopic error:', error);
                return error;
            }
        });
    }
}
//# sourceMappingURL=index.js.map