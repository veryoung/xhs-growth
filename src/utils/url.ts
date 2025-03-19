/** 携带挂件进行跳转 */
import { go } from "../index";
import GrowthCore from "../index";
import { eventMissionType, ItriggerMetaData, ITaskInfo, QueryParams } from "../types/index";
import { TaskStatus } from "../types/task";



export const handleGoWithCountView = (url: string, h5Url: string) => {
  const targetURL = `xhsdiscover://webview/${h5Url}?fullscreen=true&naviHidden=yes&widget_size=60.60&widget_position=0.24&openPage=yes&widget_url=${url}`
  // todo: 实现跳转
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
  return isDebugger ? 'https://miniprogram.beta.xiaohongshu.com/growth' : 'https://miniprogram.xiaohongshu.com/growth'
}

export const getQueryString = (query: QueryParams) => {
  return Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
}

export const setTaskNeededInfo = async (id: string, taskInfo?: ITaskInfo) => {
  let res = {};
  if (taskInfo && taskInfo.instanceId && taskInfo.instanceId !== '0') {
    res = {
      code: 0,
      data: {
        triggerMeta: taskInfo.triggerMeta,
        extra: taskInfo?.extra,
        instanceId: taskInfo.instanceId,
        taskStatus: taskInfo?.taskStatus,
      },
      msg: 'triggerMetaInfoValid'
    };
    return res
  }
  return await GrowthCore.task.claimTask(id)
}

export const filterTriggerMetaData = (triggerMeta: ItriggerMetaData) => {
  const result: Record<string, any> = {}
  if (!triggerMeta) return result
  Object.entries(triggerMeta).forEach(([key, value]) => {
    try {
      result[key] = JSON.parse(value);
    } catch (e) {
      // 如果不是 JSON 字符串，直接使用原值
      result[key] = value;
    }
  });
  
  return result
}

export const handleOnlyView = async (triggerCondition: string[], instanceId: string) => {
  const path = `www.xiaohongshu.com/page/topics/${triggerCondition[0]}`;
  const microAppUrl = `xhsdiscover://webview/${path}`
  
  go(microAppUrl, {
    type: 'deeplink',
  })
  
  const completeRes = await GrowthCore.task.completeTask(instanceId, eventMissionType.NOTE_BROWSE, {})
  return completeRes
}

export const handleViewWithCountParams = async (instanceId: string, viewAttribute: any, actionNum: number, taskStatus: string) => {
  const baseUrlForView = 'xhsdiscover://rn/growthfeeds?'
  const queryParams = Object.entries({
    activityId: GrowthCore.activityId,
    singleMaxCount: viewAttribute.singleNoteViewTime ?? 0,
    taskId: instanceId,
    taskType: actionNum,
    totalSize: viewAttribute.totalSize ?? 0,
    type: 'xhsCore',
    token: GrowthCore.getRequestToken(),
    fullscreen: 'true',
    needCountWidget: taskStatus === TaskStatus.FINISHED ? 0 : 1,
  })
  .map(([key, value]) => `${key}=${value}`)
  .join('&')
  const path = `${baseUrlForView}${queryParams}`
  go(path, {
    type: 'deeplink',
  })
}