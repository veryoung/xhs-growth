import { setTaskNeededInfo } from "../../../utils/url";
import { go } from "../../../index";
import GrowthCore from "../../../index";
import { eventMissionType } from "../../../types";

export class SearchNote {
  async searchNote(id: string, taskId: string, keyword: Array<string>) {
    try {
      const taskInfo = {
        instanceId: taskId,
        triggerMeta: {
          triggerCondition: keyword,
        },
      }
      const res = await setTaskNeededInfo(id, taskInfo)
      if (res.code !== 0) {
        return res
      }
      const { instanceId, triggerMeta = {} } = res.data
      const queryList = triggerMeta.triggerCondition || []
      const targetURL = `xhsdiscover://search/result?keyword=${queryList[0]}`
      console.log("🚀 ~ SearchNote ~ searchNote ~ targetURL:", targetURL)
      const completeRes = await GrowthCore.task.completeTask(instanceId, eventMissionType.SEARCH_NOTE, {})
      go(targetURL, {
        type: 'deeplink',
        success: (res) => {
          return {
            code: res.code,
            msg: res.msg,
          }
        },
      })
      return completeRes
    } catch (error) {
      console.error(error)
    }
  }
}
