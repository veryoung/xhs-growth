import { Core } from '../../index';
import { FollowTask } from './follow/index';
export class TaskBus extends Core {
    constructor() {
        super();
        this.follow = new FollowTask(this);
    }
}
//# sourceMappingURL=index.js.map