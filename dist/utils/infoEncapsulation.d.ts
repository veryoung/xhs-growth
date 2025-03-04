import { TaskType } from "../types/task";
export declare const infoEncapsulation: (type: TaskType, item: any) => {
    topicId: any;
    shareCode?: undefined;
    viewTaskType?: undefined;
    pageId?: undefined;
    timeLimit?: undefined;
    userId?: undefined;
} | {
    shareCode: any;
    topicId?: undefined;
    viewTaskType?: undefined;
    pageId?: undefined;
    timeLimit?: undefined;
    userId?: undefined;
} | {
    viewTaskType: any;
    pageId: any;
    timeLimit: any;
    topicId?: undefined;
    shareCode?: undefined;
    userId?: undefined;
} | {
    userId: any;
    topicId?: undefined;
    shareCode?: undefined;
    viewTaskType?: undefined;
    pageId?: undefined;
    timeLimit?: undefined;
} | {
    topicId?: undefined;
    shareCode?: undefined;
    viewTaskType?: undefined;
    pageId?: undefined;
    timeLimit?: undefined;
    userId?: undefined;
};
//# sourceMappingURL=infoEncapsulation.d.ts.map