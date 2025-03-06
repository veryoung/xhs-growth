export const httpConfig = {
    BASE_URL: {
        development: 'https://edith.beta.xiaohongshu.com',
        production: 'https://edith.xiaohongshu.com',
    },
    BASE_CONFIG: {
        // default http config
        defaults: {
            transform: true,
            timeout: 100000,
        },
    },
    API_LIST: {
        /** 登陆接口 */
        login: '/api/growth/haydn/{activityId}/login',
        /** 获取用户类型区分 新回活 */
        userType: '/api/growth/haydn/{activityId}/user/type',
        /** 获取任务列表 */
        taskTable: '/api/growth/haydn/{activityId}/task/table',
        /** 领取任务 */
        claimTask: '/api/growth/haydn/{activityId}/task/claim',
        /** 完成任务 */
        completeTask: '/api/growth/haydn/{activityId}/task/advance',
        /** 轮询消息 */
        polling: '/api/growth/haydn/{activityId}/notification/poll',
        /** 获取记录 */
        qureyRecord: '/api/growth/haydn/{activityId}/fission/record',
        /** 生成分享防封链接 */
        PHOENIX_URL: '/phoenix/api/strategy/getAppStrategy',
    }
};
//# sourceMappingURL=http.config.js.map