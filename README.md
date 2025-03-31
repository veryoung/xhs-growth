# XHS Growth Core SDK

Growth Core SDK 是一个跨平台的成长体系核心库，支持 Webview、小程序和 React Native 等多个平台，提供统一的任务管理能力。

## 特性

- 🎯 跨平台支持（Webview、小红书小程序、React Native）
- 🔄 统一的任务管理系统
- 📱 平台无关的路由跳转
- 💡 TypeScript 支持
- 🔒 单例模式确保全局状态一致

## 安装

```bash
# 使用 npm
npm install @veryoung/xhs-growth

# 使用 yarn
yarn add @veryoung/xhs-growth

# 使用 pnpm
pnpm add @veryoung/xhs-growth
```

## 快速开始

```typescript
import GrowthCore from '@veryoung/xhs-growth';

/**
 * init 方法是一个异步函数
 * 所有方法必须等待init完成
 */
await GrowthCore.init(config);

/**
 * GrowthCore.getCode()
 * 该方法内部会调用xhs.login()
 * 请业务避免直接使用该api,直接使用会导致GrowthCore和业务竞争登陆态
 * 如果有使用xhs.login()的场景请使用GrowthCore.getCode代替
 */

/**
 * bad
 */
const code = xhs.login()

/**
 * good
 */
const code = await GrowthCore.getCode()

```

## 在不同框架中使用

### React

```typescript
import React, { useEffect } from 'react';
import GrowthCore from '@veryoung/xhs-growth';

const TaskComponent: React.FC = () => {
  useEffect(async () => {
    await GrowthCore.init({
      platform: 'webview',
    });
  }, []);

  const getTaskList = () => {
      const list = await GrowthCore.task.getTaskList()
  }

  return (
    <button onClick={getTaskList}>
      获取任务列表
    </button>
  );
};
```

### Vue

```typescript
import { defineComponent } from 'vue';
import GrowthCore from '@veryoung/xhs-growth';

export default defineComponent({
  name: 'TaskComponent',
  mounted() {
    await GrowthCore.init({
      platform: 'webview',
    });
    this.getTaskList();
  },
  methods: {
    async getTaskList() {
      const list = await GrowthCore.task.getTaskList()
    },
  },
});
```

### 小程序

```typescript
// app.ts
import GrowthCore from '@veryoung/xhs-growth';

App({
  async onLaunch() {
    await GrowthCore.init({
      platform: 'miniprogram',
    });
    const list = await GrowthCore.task.getTaskList()
  }
});
```

## API 文档

### GrowthCore 通用方法

#### GrowthCore.init(config) 初始化 SDK

###### config 初始化参数说明
| 属性名 | 类型 | 说明 |
|--------|------|------|
| platform | 枚举 | miniprogram: 小程序环境  rn: react-native环境  webview: h5环境 |
| appId | string | 申请接入的appId |
| fetchCore | string | 根据环境输入的请求实例 小程序可使用xhs 其余环境可以使用fetch |
| activityId | string | 在增长环境申请的活动id |
| deviceId | string | 设备id |
```typescript
import GrowthCore from '@veryoung/xhs-growth';

let isInit = false

onLoad(async () => {
  await GrowthCore.init({
    platform: 'miniprogram',
    appId: '677d1625993c2f0001fe0778',
    fetchCore: xhs,
    activityId: 'inner',
    deviceId: 'aaad3838-9262-37eb-8afa-e881e9ceaf38',
  })
  isInit = true // 初始化完成
})
```    


#### `GrowthCore.getUserType()` 获取增长侧判断的用户类型
用户类型说明：

| 枚举值 | 类型 | 说明 |
|--------|------|------|
| `NEW` | string | 新用户 |
| `RECALL` | string | 召回用户 |
| `REVIVE` | string | 拉活用户 |
| `ACTIVE` | string | 老用户 |
| `''` | string | 获取用户类型失败 |

```typescript
import GrowthCore from '@veryoung/xhs-growth';

onLoad(async () => {
  const res = await GrowthCore.getUserType()
  console.log('用户类型：', res)
})
```    

#### `GrowthCore.getCode(force?: boolean)` 获取小程序登录最新code

| 枚举值 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| `force` | boolean | 是否强制获取最新code，否则获取当前可用code | 否 |

```typescript
import GrowthCore from '@veryoung/xhs-growth';

onLoad(async () => {
  const res = await GrowthCore.getCode(true)
  console.log('code：', res)
})
```  

## GrowthCore.task 任务实例
任务相关示例，提供任务相关的功能

#### `GrowthCore.task.getTaskList()` 获取任务列表
  - 返回元素类型

  | 参数名 | 类型 | 说明 | 备注 |
  |--------|------|------|------|
  | `id` | string | 元数据ID ||
  | `taskId` | string | 任务id ||
  | `type` | string |任务类型 |参考任务类型说明|
  | `status` | string |任务状态 |参考任务状态说明，每个任务都会需要领取才能生效，增长侧方法会在第一次执行任务的时候,自动领取任务并且执行对应任务|
  | `extraParams` | any | 任务信息 | 特定任务类型独有参数，具体取值参考下方私有参数表格 |

  - 任务类型

  | 类型 | 枚举值 |
  |------|------|
  | `话题笔记发布` | TOPIC_NOTE_PUBLISH |
  | `邀请助力` | INVITE_ASSISTANCE_LIMIT |
  | `话题笔记浏览` | TOPIC_NOTE_BROWSE |
  | `关注用户` | FOLLOW_USER |
  | `笔记搜索` | SEARCH_NOTE |

  - 任务状态

  | 枚举值 | 说明 | 备注 |
  |------|------|-----|
  | `UNFINISHED` | 未完成 |
  | `FINISHED` | 已完成 |
  | `UNCLAIMED` | 未领取 | 任务需要领取后才可以完成，首次完成任务,实例会自动帮用户领取任务并扭转状态(待优化) |
  | `TIMEOUT` | 超时 | 当前任务在活动周期内领取了但是没完成 |
  | `EXPIRED` | 过期 | 当前用户在活动周期内未领取失效 |

  - 私有变量说明

  | 任务类型依赖 | 属性 | 类型 | 说明 |
  |------|--------|------|------|
  | 话题笔记发布 | `topicId` | Array<string> | 发布话题ID |
  | 邀请助力 | `shareCode` | string | 助力生成分享码 |
  | 话题笔记浏览 | `viewTaskType` | string | 细分浏览话题任务 |
  |  | `pageId` | Array<string> | 浏览话题页ID |
  |  | `timeLimit.singleNoteViewTime` | number | 单篇笔记最大阅读时长 |
  |  | `timeLimit.totalSize` | number | 计次：笔记最大阅读篇数；计时：总任务阅读时长 |
  | 关注用户 | `userId` | Array<string> | 关注目标ID |

  **viewTaskType 枚举值:**

  | 浏览任务类型 | 对应字段 | 备注 |
  |--------|------|------|
  | 简单浏览 | SIMPLE_VIEW |只需进入话题页,不进行计时，可用于任务完成,让用户进入信息流页|
  | 信息流计次浏览 | VIEW_COUNT_NUM |指定浏览信息流页笔记次数，单次阅读笔记达最大时间则累计一次，累计次数达标后自动完成任务|
  | 信息流计时浏览 | VIEW_COUNT_TIME |指定浏览信息流页时长，阅读笔记总时长达标后自动完成任务|

#### `GrowthCore.task.queryRecord(limit: number)` 获取助力记录
  - 请求参数

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | limit | number |单次查询数量 | 是 |

  - 返回值

    | 参数名 | 类型 | 说明 |
    |--------|------|------|
    | `avatar` | string | 助力人头像 |
    | `nickname` | string | 助力人昵称 |

#### `GrowthCore.task.startNotification(callback(notifications: Notification) => any)` 轮询助力记录通知
  - 请求参数

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | `callback` | (notifications: []) => any | 获取任务完成的回调,callback每间隔一段时间都会执行，不断刷新最新的任务完成记录 | 是 |

    - Notification 类型

    | 参数名 | 类型 | 说明  |
    |--------|------|------|
    | `notificationData` | object | 通知详细数据  |
    | `notificationData.taskType` | string | 任务类型  |
    | `notificationData.avatarUrl` | string | 用户头像地址  |
    | `notificationData.useIName` | string | 用户昵称  |
    | `notificationId` | string | 通知ID  |

#### `GrowthCore.task.getAntiBannedStrategyUrl(url:string, needRealUrl:boolean): Promise<any>` 防封地址申请
  - 请求参数

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | `url` | string | 传入拼接过所需参数的落地页url | 是 |
    | `needRealUrl` | boolean | 需要真实url，默认值为true | 是 |

## GrowthCore.task.follow
关注任务相关方法

#### `GrowthCore.task.follow.takeFollow(id:string，taskId: string, userId: Array<string>, status: string, goUserPage: boolean)` 发起关注

  | 属性 | 类型 | 必选 | 说明 |
  |--------|------|------|------|
  | `id` | string | 必选 | 任务元id |
  | `taskId` | string | 必选 | 任务id |
  | `userId` | Array<string> | 必选 | 关注目标ID |
  | `status` | string | 必选 | 当前任务状态 |
  | `goUserPage` | boolean | 可选 | 是否需要前往用户主页关注，默认否，支持业务自行通过小程序能力发起关注 |

```typescript
import GrowthCore from '@veryoung/xhs-growth';

//调用过程
const { id, taskId, userId, status } = (await GrowthCore.task.getTaskList()).data.find(item => item.type === 'FOLLOW_USER')

const res = await GrowthCore.task.follow.takeFollow(id, taskId, userId, status, false)
```

## GrowthCore.task.publishNotes
笔记任务相关方法

#### `GrowthCore.task.publishNotes.publish(id: string, taskId: string, topicId: Array<string>)` 发布笔记

  | 属性 | 类型 | 必选 | 说明 |
  |--------|------|------|------|
  | `id` | string | 必选 | 任务元id |
  | `taskId` | string | 必选 | 任务id |
  | `topicId` | Array<string> | 必选 | 发布话题ID列表 |

```typescript
import GrowthCore from '@veryoung/xhs-growth';

//调用过程
const { id, taskId, topicId } = (await GrowthCore.task.getTaskList()).data.find(item => item.type === 'TOPIC_NOTE_PUBLISH')

const res = await GrowthCore.task.publishNotes.publish(id, taskId, topicId)
```

#### `GrowthCore.task.publishNotes.onlyPublish(topicIdList: string[])`: 仅发布笔记,不进行任务完成

  | 属性 | 类型 | 说明 |
  |--------|------|------|
  | `topicIdList` | Array<string> | 发布话题ID列表 |

```typescript
import GrowthCore from '@veryoung/xhs-growth';

const res = await GrowthCore.task.publishNotes.onlyPublish(['62db0ed7000000000101cfa9', '5c2edf56000000000a00b35c'])
```

## GrowthCore.task.topic
话题任务相关方法
#### `GrowthCore.task.topic.viewTask(id:string, taskMetaInfo: Record<string, any>)`: 完成话题相关的浏览任务
任务包括（详细查看viewTaskType字段）
##### SIMPLE_VIEW 
普通浏览任务 可进入话题页做页面浏览
##### VIEW_COUNT_NUM
信息流计次任务
##### VIEW_COUNT_TIME
信息流计时任务

  | 属性 | 类型 | 必选 | 说明 |
  |--------|------|------|------|
  | `id` | string | 必选 | 任务元id |
  | `taskMetaInfo` | Record<string,any> | 必选 | 任务完成必要信息 |

  -`taskMetaInfo`具体属性

  | 属性 | 类型 | 必选 | 说明 |
  |--------|------|------|------|
  | `taskId` | string | 必选 | 任务id |
  | `viewTaskType` | string | 必选 | 浏览任务类型：'SIMPLE_VIEW' 或 'VIEW_COUNT_NUM' 或 'VIEW_COUNT_TIME' |
  | `pageId` | Array<string> | 必选 | 话题浏览ID |
  | `timeLimit` | Record<string, any> | 必选 | 阅读笔记的必要参数 |
  | `status` | string | 必选 | 任务状态，完成状态会自动进入纯浏览任务 |

```typescript
import GrowthCore from '@veryoung/xhs-growth';

//调用过程
const { name, type, id, ...taskMetaInfo } = (await GrowthCore.task.getTaskList()).data.find(item => item.type === 'TOPIC_NOTE_BROWSE')

const res = GrowthCore.task.topic.viewTask(id, taskMetaInfo)
```

## GrowthCore.task.inviteFriends
好友助力任务相关方法
#### `GrowthCore.task.inviteFriends.shareFriends (id: string, taskId: string, shareCode: string, extraQuery?: Record<string, any>)` 分享邀请助力任务

  | 属性 | 类型 | 必选 | 说明 |
  |--------|------|------|------|
  | `id` | string | 必选 | 任务元id |
  | `taskId` | string | 必选 | 任务id |
  | `shareCode` | string | 必选 | 助力任务生成的分享码 |
  | `extraQuery` | Record<string, any> | 可选 | 需要拼接进入url参数，支持object |

  - 返回参数类型

  | 属性 | 类型 | 必选 | 说明 |
  |--------|------|------|------|
  | `path` | string | 必选 | 分享页url |

```typescript
import GrowthCore from '@veryoung/xhs-growth';

//调用过程
const { id, taskId, shareCode } = (await GrowthCore.task.getTaskList()).data.find(item => item.type === 'INVITE_ASSISTANCE_LIMIT')

const res = GrowthCore.task.inviteFriends.shareFriends(id, taskId, shareCode, {})
```
#### `GrowthCore.task.inviteFriends.completeInviteAssistTask(instanceId: string, shareCode: string)` 完成邀请助力任务

  | 属性 | 类型 | 必选 | 说明 |
  |--------|------|------|------|
  | `taskId` | string | 必选 | 触发任务状态变化 |
  | `shareCode` | string | 必选 | 主态生成分享码 |

```typescript
/**
 * 请求参数，instanceId 和 shareCode 可以从分享页url的query中获取
*/
import GrowthCore from '@veryoung/xhs-growth';

const res = await GrowthCore.task.inviteFriends.completeInviteAssistTask('34264', 'YG4qr6')
```

## GrowthCore.task.search
搜索相关方法
#### `GrowthCore.task.search.searchNote (id: string, taskId: string, keyword: Record<string, any>)` 搜索指定关键词

  | 属性 | 类型 | 必选 | 说明 |
  |--------|------|------|------|
  | `id` | string | 必选 | 任务元id |
  | `taskId` | string | 必选 | 任务id |
  | `keyword` | Record<string, any> | 必选 | 需要搜索的目标 |


```typescript
import GrowthCore from '@veryoung/xhs-growth';

//调用过程
const { id, taskId, keyword } = (await GrowthCore.task.getTaskList()).data.find((item: any) => item.type === 'SEARCH_NOTE')

const resNote = await GrowthCore.task.search.searchNote(id, taskId, keyword)

```

### Ability

能力开放系统，提供不依赖任务体系功能

## GrowthCore.ability
纯能力任务核心

#### `GrowthCore.ability.goTargetUserPage(targetUserId: string)` 前往关注目标主页

  | 属性 | 类型 | 必选 | 说明 |
  |--------|------|------|------|
  | `targetUserId` | string | 必选 | 关注目标ID |

```typescript
import GrowthCore from '@veryoung/xhs-growth';

/**
 * case1 根据关注任务目标主页id直接跳转
 */
const { userId } = (await GrowthCore.task.getTaskList()).data.find(item => item.type === 'FOLLOW_USER')

const res = await GrowthCore.ability.goTargetUserPage(userId[0])

/**
 * case2 指定目标主页id直接跳转
 */
const target = '5b3dca654eacab77e57267d1'

const res = await GrowthCore.ability.goTargetUserPage(target)
```

### BenefitBus（待实现）

权益管理系统，提供权益相关的功能

## 最佳实践

1. **初始化时机**
```typescript
// 在应用入口处初始化
GrowthCore.init({
  platform: process.env.PLATFORM || 'webview',
})
```

2. **错误处理**
```typescript
try {
  GrowthCore.task.follow.takeFollow();
} catch (error) {
  console.error('Task start failed:', error);
}
```

3. **TypeScript 支持**
```typescript
import { Config } from '@your-org/growth-core/types';

const config: Config = {
  platform: 'webview',
};
```

## 注意事项

1. 确保在使用任何功能前先调用 `init` 方法
2. 根据不同平台使用正确的配置
3. SDK 使用单例模式，全局共享一个实例
4. 注意在多页面应用中的初始化时机