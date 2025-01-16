var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RequestQueue } from './queue';
class NotificationPoller {
    constructor(poll, interval = 3000, concurrency = 3, callback) {
        this.lastAnimationFrameId = null;
        this.lastExecutionTime = 0;
        this.scheduleNextExecution = () => {
            const now = new Date().getTime();
            const timeSinceLastExecution = now - this.lastExecutionTime;
            if (timeSinceLastExecution >= this.interval) {
                this.executeNotifications();
                this.lastExecutionTime = now;
            }
            this.lastAnimationFrameId = setTimeout(this.scheduleNextExecution, this.interval);
        };
        this.poll = poll;
        this.interval = interval;
        this.callback = callback;
        this.requestQueue = new RequestQueue(concurrency);
    }
    createRequestTask(poll) {
        return () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let response;
                response = yield poll();
                this.interval = ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.nextQueryAfter) || 3000;
                if (response) {
                    try {
                        this.callback({ notifications: ((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.notifications) || [] });
                    }
                    catch (emitError) {
                        console.warn(`轮播失败`, emitError);
                    }
                }
                return response;
            }
            catch (error) {
                console.error(`轮播失败`, error);
                throw error;
            }
        });
    }
    executeNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestTasks = this.createRequestTask(this.poll);
                yield Promise.all([requestTasks()]);
            }
            catch (error) {
                console.error('executeNotifications error:', error);
                // 如果出现错误，等待一段时间后重试
                if (this.lastAnimationFrameId !== null) {
                    setTimeout(() => {
                        this.executeNotifications();
                    }, this.interval);
                }
            }
        });
    }
    start() {
        if (this.lastAnimationFrameId) {
            return;
        }
        // console.log('启动通知轮询，间隔:', this.interval, 'ms')
        this.executeNotifications();
        this.lastExecutionTime = new Date().getTime();
        this.lastAnimationFrameId = setTimeout(this.scheduleNextExecution, this.interval);
    }
    stop() {
        if (this.lastAnimationFrameId) {
            cancelAnimationFrame(this.lastAnimationFrameId);
            this.lastAnimationFrameId = null;
        }
    }
}
let poller;
export const openNotification = (polling, callback) => {
    if (!poller) {
        poller = new NotificationPoller(polling, 5000, 3, callback);
        poller.start();
    }
};
//# sourceMappingURL=notification.js.map