/** 携带挂件进行跳转 */
import { QueryParams } from "../types/index";
import { go } from "../index";
export const handleGoWithCountView = (url: string, h5Url: string) => {
  const targetURL = `xhsdiscover://webview/${h5Url}?fullscreen=true&naviHidden=yes&widget_size=60.60&widget_position=0.24&openPage=yes&widget_url=${url}`
  // todo: 实现跳转
  console.log("🚀 ~ handleGoWithCountView ~ targetURL:", targetURL)
  go(targetURL, {
    type: 'deeplink',
    success: (res: any) => {
      return res
    },
    fail: (res: any) => {
      return res
    },
    complete: (res: any) => {
      return res
    }
  })
}

export const countPageBaseUrl = (isDebugger: boolean) => {
  console.log("🚀 ~ countPageBaseUrl ~ isDebugger:", isDebugger)
  return isDebugger ? 'https://yingzheng.beta.xiaohongshu.com/growth' : 'https://yingzheng.xiaohongshu.com/growth'
<<<<<<< HEAD
}

export const getQueryString = (query: QueryParams) => {
  return Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
=======
>>>>>>> 949e608 (feat: 修改任务实现)
}