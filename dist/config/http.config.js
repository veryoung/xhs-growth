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
        login: '/api/growth/haydn/{activityId}/login',
    },
};
//# sourceMappingURL=http.config.js.map