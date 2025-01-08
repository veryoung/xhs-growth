export default class MiniProgramEnv {
    private fetchCore;
    constructor(config: {
        fetchCore: any;
    });
    go(path: string, params?: object): void;
    fetch(method: string, url: string, data?: object, header?: object): void;
    authorization(code: string): {
        Authorization: string;
    };
}
//# sourceMappingURL=index.d.ts.map