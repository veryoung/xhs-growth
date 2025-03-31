import Core from '../../index';
import { go } from "../../index";

export class AbilityBus {
  private core: typeof Core;

  constructor(core: typeof Core) {
    this.core = core;
  }

  async goTargetUserPage(userId: string) {
    const url = `xhsdiscover://user/${userId}`
    go(url, {
      type: 'deeplink',
      success: (res) => {
        return {
          code: res.code || 0,
          msg: res.msg || '跳转目标主页成功',
        }
      },
      fail: (err) => {
        return {
          code: -300,
          msg: err.message || '跳转目标主页失败',
        }
      }
    })
  }
}