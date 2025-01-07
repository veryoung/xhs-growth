import { FollowTask } from './follow/index';
export class TaskBus {
    constructor(core) {
        this.core = core;
        this.follow = new FollowTask(this);
    }
}
//# sourceMappingURL=index.js.map