const PROTOCOL = "xhsdiscover:";
function transformConfig(searchConfig) {
    const keys = Object.keys(searchConfig);
    const result = {};
    keys.forEach(key => {
        const value = searchConfig[key];
        if (typeof value === 'string') {
            result[key] = value;
        }
        else {
            result[key] = JSON.stringify(value);
        }
    });
    return result;
}
function genDeeplink(deeplinkConfig) {
    const { protocol = PROTOCOL, hostname, pathname = '', searchConfig = {}, } = deeplinkConfig;
    if (pathname && !pathname.startsWith('/')) {
        throw new Error('The pathname should starts with `/`');
    }
    let search = '';
    if (searchConfig && Object.keys(searchConfig).length !== 0) {
        const searchRecord = transformConfig(searchConfig);
        let str = '';
        Object.keys(searchRecord).forEach((value, index) => {
            str += `${index ? '&' : ''}${value}=${encodeURIComponent(searchRecord[value])}`;
        });
        search = `?${str}`;
    }
    return `${protocol}//${hostname}${pathname}${search}`;
}
export const genCapaPostDeeplink = (searchConfig) => {
    return genDeeplink({
        hostname: 'post_new_note',
        searchConfig,
    });
};
