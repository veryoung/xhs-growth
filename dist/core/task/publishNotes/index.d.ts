export declare class PublishNotesTask {
    core: any;
    constructor(core: any);
    onlyPublish(topicIdList: string[]): Promise<void>;
    publish(taskMetaId: string, completeTaskId?: string, topicId?: Array<string>): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map