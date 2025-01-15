import { eventMissionType } from "../../../types";
import GrowthCore, { go } from "../../../index";

export class TopicTask {
  async viewTopic(taskMetaId: string) {
    const res = await GrowthCore.task.claimTask(taskMetaId)
    console.log("🚀 ~ TopicTask ~ viewTopic ~ res:", res)
    if (res.code === 0) {
      const triggerCondition = JSON.parse(res.data.triggerMeta.triggerCondition)[0];
      const path = `www.xiaohongshu.com/page/topics/${triggerCondition}`;
      const microAppUrl = `xhsdiscover://webview/${path}`
      console.log("🚀 ~ TopicTask ~ viewTopic ~ microAppUrl:", microAppUrl)
      go(microAppUrl, {
        type: 'deeplink',
      })
      const completeRes = await GrowthCore.task.completeTask(res.data.instanceId, eventMissionType.NOTE_BROWSE, {})
      console.log("🚀 ~ TopicTask ~ viewTopic ~ completeRes:", completeRes)
      return completeRes
    }
    return {
      code: -200,
      msg: '领取任务失败',
    }
  }
}
