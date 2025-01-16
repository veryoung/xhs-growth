export declare class RequestQueue {
    private queue;
    private running;
    private readonly concurrency;
    constructor(concurrency: number);
    add<T>(task: () => Promise<T>): Promise<T>;
    private runTask;
    private processQueue;
    clear(): void;
    get size(): number;
    get activeCount(): number;
}
//# sourceMappingURL=queue.d.ts.map