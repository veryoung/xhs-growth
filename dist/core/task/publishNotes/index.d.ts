import { Core } from "../../../index";
export declare class PublishNotesTask {
    core: Core;
    constructor(core: Core);
    onlyPublish(topicIdList: string[]): Promise<void>;
    publish(id: string, taskId: string, topicId: Array<string>): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map