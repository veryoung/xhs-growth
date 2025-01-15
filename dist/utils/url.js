import { go } from "../index";
export const handleGoWithCountView = (url, h5Url) => {
    const targetURL = `xhsdiscover://webview/${h5Url}?fullscreen=true&naviHidden=yes&widget_size=60.60&widget_position=0.24&openPage=yes&widget_url=${url}`;
    // todo: 实现跳转
    console.log("🚀 ~ handleGoWithCountView ~ targetURL:", targetURL);
    go(targetURL, {
        type: 'deeplink',
        success: (res) => {
            return res;
        },
        fail: (res) => {
            return res;
        },
        complete: (res) => {
            return res;
        }
    });
};
export const countPageBaseUrl = (isDebugger) => {
    return isDebugger ? 'https://yingzheng.beta.xiaohongshu.com/growth' : 'https://yingzheng.xiaohongshu.com/growth';
};
export const getQueryString = (query) => {
    return Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
};
//# sourceMappingURL=url.js.map