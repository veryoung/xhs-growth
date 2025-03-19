export declare const httpConfig: {
    BASE_URL: {
        development: string;
        production: string;
    };
    BASE_CONFIG: {
        defaults: {
            transform: boolean;
            timeout: number;
        };
    };
    API_LIST: {
        /** 登陆接口 */
        login: string;
        /** 获取用户类型区分 新回活 */
        userType: string;
        /** 获取任务列表 */
        taskTable: string;
        /** 领取任务 */
        claimTask: string;
        /** 完成任务 */
        completeTask: string;
        /** 轮询消息 */
        polling: string;
        /** 获取记录 */
        qureyRecord: string;
        /** 生成分享防封链接 */
        PHOENIX_URL: string;
    };
};
//# sourceMappingURL=http.config.d.ts.map