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

let isInit = fasle

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

  - 返回值 taskItem 类型：
  
    | 参数名 | 类型 | 说明 |
    |--------|------|------|
    | taskMetaId | string | 任务元ID |
    | instanceId | string | 任务实例ID |
    | taskType | string | 任务类型 |
    | progress | string | 进度 |
    | taskStauts | string | 任务状态: 区分三种状态：1. UNFINISHED: 未完成 2.FINISHED: 已完成 3.UNCLAIMED: 未领取 备注: 每个任务都会需要领取才能生效，增长侧方法会在第一次执行任务的时候,自动领取任务并且执行对应任务 | 
    | expireTime | string | 失效时间 |
    | triggerMeta | object | 任务信息 |
    | triggerMeta.triggerCondition | array | 根据任务类型返回不同的ID集合，例如：关注任务返回关注userId、发布笔记任务返回话题ID、浏览任务返回pageId |
    | extra | object | 额外信息 |
    | extra.shareCode | string | 分享码 |

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

###### GrowthCore.task.follow.takeFollow(taskMetaId:string) 发起关注
- `takeFollow(taskMetaId:string)`: 发起关注
```typescript
interface taskParams{
  taskMetaId: string //任务元信息ID
}
import GrowthCore from '@veryoung/xhs-growth';
GrowthCore.init({
  //neededParams
})
GrowthCore.task.follow.takeFollow('202501131142').then((res) => {
  console.log('res: ', res) //返回任务状态
})
```

##### GrowthCore.task.publishNotes
笔记任务相关方法

- `GrowthCore.task.publishNotes.publish(taskMetaId: string)` 发布笔记
  - 参数

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | taskMetaId | string | 任务元ID | 是 |

  - 返回值

    | 参数名 | 类型 | 说明 |
    |--------|------|-----|
    | topicId | string | 笔记话题ID |

- `GrowthCore.task.publishNotes.onlyPublish(topicIdList: string[])`: 仅发布笔记,不进行任务完成
  - 参数

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------| 
    | topicIdList | string[] | 话题ID列表 | 是 |

##### GrowthCore.task.topic
话题任务相关方法
- `GrowthCore.task.topic.viewTopic(taskMetaId:string, triggerMetaInfo?: ItriggerMeta)`: 查看话题
```typescript
// 进行普通浏览话题页，浏览计时，浏览计次的功能
interface taskParams{
  taskMetaId:string // 任务元信息
  triggerMetaInfo?: ItriggerMeta 
}

interface ItriggerMeta {
  triggerMeta: {
    triggerCondition: string 
    viewAttribute?: string 
    action?: string    
  } // 该对象可以通过获取任务列表接口直接填充
  instanceId?: string // 任务实例id
}
import growthCore from '@veryoung/xhs-growth';

// 使用类型方法1: 直接传入任务元ID
growthCore.task.topic.viewTopic('2025011411').then((res) => {
  console.log("res: ",res)//返回任务领取结果
})
// 使用类型方法2: 按格式自定义参数传入，可以指定任务效果
const metaInfo = {
  action: 'VIEW_COUNT_NUM',
  triggerCondition: '["62db0ed71d27af0001b4a199"]',
  viewAttribute: '{"singleNoteViewTime":15,"totalSize":45}',
}

growthCore.task.topic.viewTopic('202501152058', {
  instanceId: '14684',
  triggerMeta: metaInfo,
}).then((res) => {
  console.log('res: ', res)
}).catch((err) => {
  console.log('err: ', err)
})
```

#### GrowthCore.task.inviteFriends
好友助力任务相关方法
- `GrowthCore.task.inviteFriends.shareFriends (taskMetaId: string, extraQuery?: any)` 分享邀请助力任务
  - 请求参数
  
    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | taskMetaId | string |任务元ID | 是 |
    | extraQuery | any | 需要拼接到分享页面url上的参数，支持一个object | 否 |
  
  - 返回值

    | 参数名 | 类型 | 说明 |
    |--------|------|------|
    | path | string | 分享页url |

  
- `GrowthCore.task.inviteFriends.completeInviteAssistTask(instanceId: string, shareCode: string)` 完成邀请助力任务
  - 请求参数，instanceId 和 shareCode 可以从分享页url的query中获取
  
    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | instanceId | string |任务实例 ID | 是 |
    | shareCode | string | 分享码 | 是 |

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

