var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class RequestQueue {
    constructor(concurrency) {
        this.queue = [];
        this.running = 0;
        this.concurrency = concurrency;
    }
    add(task) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.running < this.concurrency) {
                return this.runTask(task);
            }
            return new Promise((resolve, reject) => {
                this.queue.push(() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const result = yield task();
                        resolve(result);
                    }
                    catch (error) {
                        reject(error);
                    }
                }));
            });
        });
    }
    runTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            this.running++;
            try {
                const result = yield task();
                return result;
            }
            catch (error) {
                console.error('Task execution failed:', error);
                throw error;
            }
            finally {
                this.running--;
                this.processQueue();
            }
        });
    }
    processQueue() {
        if (this.queue.length === 0 || this.running >= this.concurrency) {
            return;
        }
        const nextTask = this.queue.shift();
        if (nextTask) {
            this.runTask(nextTask)
                .catch(error => {
                console.error('Queue task error:', error);
            });
        }
    }
    clear() {
        this.queue = [];
        this.running = 0;
    }
    get size() {
        return this.queue.length;
    }
    get activeCount() {
        return this.running;
    }
}
