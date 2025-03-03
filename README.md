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

###### config 参数说明
```typescript
interface initParams {
  platform: string //平台类型, 'miniprogram'|'rn'|'webview'
  appId: string //小程序标识码
  fetchCore: any // 当前平台请求实例
  activityId: string //小程序名称
  deviceId: string //当前设备信息
}
//usage
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


#### GrowthCore.getUserType() 获取增长侧判断的用户类型
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

#### GrowthCore.task 任务实例
任务相关示例，提供任务相关的功能

- `GrowthCore.task.getTaskList()` 获取任务列表
```typescript
interface commonOutputParams{

  metaId: string //当前任务ID

  completeTaskId: string //触发任务状态变化ID

  /**
   * 任务类型
   * 一共六种任务类型：1.话题笔记发布：TOPIC_NOTE_PUBLISH 2.邀请助力 INVITE_ASSISTANCE 3.话题笔记浏览 TOPIC_NOTE_BROWSE
   * 4.笔记点赞 NOTE_LIKE 5.关注用户 FOLLOW_USER 6.搜索笔记 SEARCH_NOTE
   * 目前支持 1 2 3 5
  */
  type: string

  /**
   * 任务状态
   * 区分五种状态：1. UNFINISHED: 未完成 2.FINISHED: 已完成 3.UNCLAIMED: 未领取 4.TIMEOUT: 超时的 5.EXPIRED 过期的
   * 备注: 每个任务都会需要领取才能生效，增长侧方法会在第一次执行任务的时候,自动领取任务并且执行对应任务
  */
  status: string

  /**
   * privateOutputParams
   * 额外参数位置
   * 依赖于任务类型type
  */
}

//TOPIC_NOTE_PUBLISH
interface privateOutputParams{
  topicId: Array<string> //发布话题ID
}

//INVITE_ASSISTANCE
interface privateOutputParams{
  shareCode: string //助力生成分享码
}

//TOPIC_NOTE_BROWSE
interface privateOutputParams{
  topicBrowserTaskType: string//细分浏览话题任务，三个状态：1.SIMPLE_VIEW：简单浏览 2.VIEW_COUNT_NUM：浏览计次 3.VIEW_COUNT_TIME：浏览计时
  pageId: Array<string> //浏览话题页ID
  timeLimit:{
    singleNoteViewTime: number//计次任务：单篇笔记最大阅读时长 计时任务：单篇笔记最大阅读时长
    totalSize: number//计次任务：笔记最大阅读篇数 计时任务：总任务阅读时长
  }//计时计次任务参数
}

//FOLLOW_USER
interface privateOutputParams{
  userId: Array<string> // 关注目标ID
}
```

- `GrowthCore.task.queryRecord(limit: number)` 获取助力记录
  - 请求参数

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | limit | number |单次查询数量 | 是 |

  - 返回值

    | 参数名 | 类型 | 说明 |
    |--------|------|------|
    | avatar | string | 助力人头像 |
    | nickname | string | 助力人昵称 |

- `GrowthCore.task.startNotification(callback(notifications: Notification) => any)` 轮询助力记录通知
  - 请求参数

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | callback | (notifications: []) => any | 获取任务完成的回调,callback每间隔一段时间都会执行，不断刷新最新的任务完成记录 | 是 |

    - Notification 类型

    | 参数名 | 类型 | 说明  |
    |--------|------|------|
    | notificationData | object | 通知详细数据  |
    | notificationData.taskType | string | 任务类型  |
    | notificationData.avatarUrl | string | 用户头像地址  |
    | notificationData.useIName | string | 用户昵称  |
    | notificationId | string | 通知ID  |

##### GrowthCore.task.follow
关注任务相关方法

###### GrowthCore.task.follow.takeFollow(metaId:string，isAutoFollow: boolean, completeTaskId?: string, userId?: Array<string>) 发起关注
- `takeFollow(metaId:string，isAutoFollow: boolean, completeTaskId?: string, userId?: Array<string>)`: 发起关注
```typescript
interface taskParams{
  metaId: string //任务元信息ID
  isAutoFollow: boolean //是否需要自动关注，初始值为true
  /**
   * 业务方主动触发任务状态变化所需参数
   * 下方参数可在GrowthCore.task.getTaskList()内部查询
  */
  completeTaskId?: string //触发任务状态变化ID
  userId?: Array<string> //关注目标ID
}
import GrowthCore from '@veryoung/xhs-growth';
GrowthCore.init({
  //neededParams
})

//核心自动完成
GrowthCore.task.follow.takeFollow('202501131142').then((res) => {
  console.log('res: ', res) //返回任务状态
})

//业务自行调用
GrowthCore.task.follow.takeFollow('202501131142',true,'13215',['5b3dca654eacab77e57267d1']).then((res) => {
  console.log('res: ', res) //返回任务状态
})
```

##### GrowthCore.task.publishNotes
笔记任务相关方法

- `GrowthCore.task.publishNotes.publish(metaId: string, completeTaskId?: string, topicId?: Array<string>)` 发布笔记
```typescript
interface taskParams{
  metaId:string // 任务元信息
  /**
  * 业务方主动触发任务状态变化所需参数
  * 下方参数可在GrowthCore.task.getTaskList()内部查询
  */
  completeTaskId?: string //触发任务状态变化ID
  topicId?: Array<string> //发布话题ID列表
}

import growthCore from '@veryoung/xhs-growth';

// 使用类型方法1: 直接传入任务元ID
growthCore.task.publishNotes.publish('202401131159').then((res) => {
  console.log("res: ",res)//返回任务领取结果
})

// 使用类型方法2: 按格式自定义参数传入，可以指定任务效果
growthCore.task.publishNotes.publish('202401131159','45167',['62db0ed7000000000101cfa9', '5c2edf56000000000a00b35c']).then((res) => {
  console.log("res: ",res)//返回任务领取结果
})
```

- `GrowthCore.task.publishNotes.onlyPublish(topicIdList: string[])`: 仅发布笔记,不进行任务完成
```typescript
interface taskParams{
  topicIdList?: Array<string> //发布话题ID列表
}

import growthCore from '@veryoung/xhs-growth';

growthCore.task.publishNotes.onlyPublish(['62db0ed7000000000101cfa9', '5c2edf56000000000a00b35c']).then((res) => {
  console.log("res: ",res)//返回任务领取结果
})
```

##### GrowthCore.task.topic
话题任务相关方法
- `GrowthCore.task.topic.viewTopic(metaId:string, completeTaskId?: string, viewTaskType?: string, pageId?: Array<string>, timeLimit?: Record<string, any>)`: 查看话题
```typescript
// 进行普通浏览话题页，浏览计时，浏览计次的功能
interface taskParams{
  metaId:string // 任务元信息
  /**
   * 业务方主动触发任务状态变化所需参数
   * 下方参数可在GrowthCore.task.getTaskList()内部查询
  */
  completeTaskId?: string //触发任务状态变化ID
  viewTaskType?: string // 'SIMPLE_VIEW' || 'VIEW_COUNT_NUM' || 'VIEW_COUNT_TIME"
  pageId?: Array<string> //话题浏览ID
  timeLimit?: Record<string, any> //计时计次参数
}

import growthCore from '@veryoung/xhs-growth';

// 使用类型方法1: 直接传入任务元ID
growthCore.task.topic.viewTopic('2025011411').then((res) => {
  console.log("res: ",res)//返回任务结果
})

// 使用类型方法2: 按格式自定义参数传入，可以指定任务效果
growthCore.task.topic.viewTopic('202501152131', '45168', 'VIEW_COUNT_NUM', ['62db0ed71d27af0001b4a199'], {
  singleNoteViewTime: 15,
  totalSize: 45,
}).then((res) => {
  console.log('res: ', res)
}).catch((err) => {
  console.log('err: ', err)
})
```

#### GrowthCore.task.inviteFriends
好友助力任务相关方法
- `GrowthCore.task.inviteFriends.shareFriends (metaId: string, extraQuery?: Record<string, any>, completeTaskId?: string, shareCode?: string)` 分享邀请助力任务
```typescript
interface inputParams{
  metaId:string // 任务元信息
  extraQuery?: Record<string, any> // 需要拼接进入url参数，支持object
  /**
   * 业务方主动触发任务状态变化所需参数
   * 下方参数可在GrowthCore.task.getTaskList()内部查询
  */
  completeTaskId?: string //触发任务状态变化ID
  shareCode?: string //助力任务生成的分享码
}

interface outParams{
  path: string //分享页url
}

import growthCore from '@veryoung/xhs-growth';

// 使用类型方法1: 直接传入任务元ID
growthCore.task.inviteFriends.shareFriends('2025011411').then((res) => {
  console.log("res: ",res)//返回任务结果
})

// 使用类型方法2: 按格式自定义参数传入，可以指定任务效果
growthCore.task.inviteFriends.shareFriends('202501152131', {}, '34264', 'YG4qr6').then((res) => {
  console.log('res: ', res)
}).catch((err) => {
  console.log('err: ', err)
})
```
- `GrowthCore.task.inviteFriends.completeInviteAssistTask(instanceId: string, shareCode: string)` 完成邀请助力任务
```typescript
/**
 * 请求参数，instanceId 和 shareCode 可以从分享页url的query中获取
*/
interface inputParams{
  instanceId: string //触发任务状态变化ID
  shareCode：string //主态生成分享码
}

import growthCore from '@veryoung/xhs-growth';

growthCore.task.inviteFriends.completeInviteAssistTask('34264', 'YG4qr6').then((res) => {
  console.log('res: ', res)
}).catch((err) => {
  console.log('err: ', err)
})
```
### BenefitBus（待实现）

权益管理系统，提供权益相关的功能

## 最佳实践

1. **初始化时机**
```typescript
// 在应用入口处初始化
growthCore.init({
  platform: process.env.PLATFORM || 'webview',
}).then(core => {
    // 确保拿到core初始化的实例
});
```

2. **错误处理**
```typescript
try {
  growthCore.task.follow.takeFollow();
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

