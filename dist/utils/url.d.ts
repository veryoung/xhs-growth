import { ItriggerMetaData, ITaskInfo, QueryParams } from "../types/index";
export declare const handleGoWithCountView: (url: string, h5Url: string) => void;
export declare const countPageBaseUrl: (isDebugger: boolean) => "https://miniprogram.beta.xiaohongshu.com/growth" | "https://miniprogram.xiaohongshu.com/growth";
export declare const getQueryString: (query: QueryParams) => string;
export declare const setTaskNeededInfo: (id: string, taskInfo?: ITaskInfo) => Promise<any>;
export declare const filterTriggerMetaData: (triggerMeta: ItriggerMetaData) => Record<string, any>;
export declare const handleOnlyView: (triggerCondition: string[], instanceId: string) => Promise<any>;
export declare const handleViewWithCountParams: (instanceId: string, viewAttribute: any, actionNum: number, taskStatus: string) => Promise<void>;
//# sourceMappingURL=url.d.ts.map