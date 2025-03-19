import { Core } from "../../../index";
export declare class PublishNotesTask {
    core: Core;
    constructor(core: Core);
    /**
     * 仅发布笔记，不关联任务
     * @param topicIdList 话题ID列表
     * @returns Promise<void>
     */
    onlyPublish(topicIdList: string[]): Promise<void>;
    /**
     * 发布笔记并关联任务
     * @param id 任务ID
     * @param taskId 任务实例ID
     * @param topicId 话题ID列表
     * @returns Promise<any>
     */
    publish(id: string, taskId: string, topicId: Array<string>): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map