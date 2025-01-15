export default class WebviewEnv {
    private fetchCore;
    constructor(config: {
        fetchCore: any;
    });
    go(path: string, params?: object): void;
    fetch(method: string, url: string, data?: object, header?: object): void;
}
//# sourceMappingURL=index.d.ts.map