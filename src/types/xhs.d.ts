declare namespace XHS {
  interface LoginResult {
    code: string;
    // 可以根据实际需要添加更多返回值类型
  }

  interface XhsSDK {
    login(): LoginResult;
    navigateTo(options: any): void;
    openXhsDeeplink(options: any): void;
    checkSession(options?: any): void;
  }
}

declare const xhs: XHS.XhsSDK; 