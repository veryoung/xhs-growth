export default class RNEnv {
    constructor(config) {
        this.fetchCore = config.fetchCore;
    }
    go(path, params) {
        console.log('React Native go to:', path, params);
    }
}
