/** 携带挂件进行跳转 */
import { QueryParams } from "../types/index";
import { ItriggerMeta } from "../types/index";
export declare const handleGoWithCountView: (url: string, h5Url: string) => void;
export declare const countPageBaseUrl: (isDebugger: boolean) => "https://yingzheng.beta.xiaohongshu.com/growth" | "https://yingzheng.xiaohongshu.com/growth";
export declare const getQueryString: (query: QueryParams) => string;
export declare const setTaskNeedInfo: (taskMetaId: string, triggerMetaInfo?: ItriggerMeta) => Promise<any>;
export declare const filterTriggerMetaData: (triggerMeta: ItriggerMeta) => Record<string, any>;
export declare const handleOnlyView: (triggerCondition: string[], instanceId: string) => Promise<any>;
//# sourceMappingURL=url.d.ts.map