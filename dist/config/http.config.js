export const httpConfig = {
    BASE_URL: {
        development: 'https://edith.beta.xiaohongshu.com',
        production: 'https://edith.xiaohongshu.com',
    },
    BASE_CONFIG: {
        defaults: {
            transform: true,
            timeout: 100000,
        },
    },
    API_LIST: {
        login: '/api/growth/haydn/{activityId}/login',
        userType: '/api/growth/haydn/{activityId}/user/type',
        taskTable: '/api/growth/haydn/{activityId}/task/table',
        claimTask: '/api/growth/haydn/{activityId}/task/claim',
        completeTask: '/api/growth/haydn/{activityId}/task/advance',
        polling: '/api/growth/haydn/{activityId}/notification/poll',
        qureyRecord: '/api/growth/haydn/{activityId}/fission/record',
        PHOENIX_URL: '/phoenix/api/strategy/getAppStrategy',
    }
};
