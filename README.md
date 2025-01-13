# XHS Growth Core SDK

Growth Core SDK 是一个跨平台的成长体系核心库，支持 Webview、小程序和 React Native 等多个平台，提供统一的任务管理和权益系统接口。

## 特性

- 🎯 跨平台支持（Webview、小程序、React Native）
- 🔄 统一的任务管理系统
- 🎁 完整的权益系统
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

// 初始化配置
const core = await GrowthCore.init(config);
```

## 在不同框架中使用

### React

```typescript
import React, { useEffect } from 'react';
import growthCore from '@veryoung/xhs-growth';

const TaskComponent: React.FC = () => {
  useEffect(() => {
    growthCore.init({
      platform: 'webview',
    });
  }, []);

  const handleStartTask = () => {
    growthCore.task.follow.takeFollow();
  };

  return (
    <button onClick={handleStartTask}>
      关注
    </button>
  );
};
```

### Vue

```typescript
import { defineComponent } from 'vue';
import growthCore from '@veryoung/xhs-growth';

export default defineComponent({
  name: 'TaskComponent',
  mounted() {
    growthCore.init({
      platform: 'webview',
    });
  },
  methods: {
    handleStartTask() {
        growthCore.task.follow.takeFollow();
    },
  },
});
```

### 小程序

```typescript
// app.ts
import growthCore from '@veryoung/xhs-growth';

App({
  onLaunch() {
    growthCore.init({
      platform: 'miniprogram',
    });
  }
});
```

## API 文档

### Core

#### init(config: Config)
初始化 SDK

```typescript
interface Config {
  platform: 'webview' | 'miniprogram' | 'rn'; //小程序标识码
  appId: string, //请求实例
  fetchCore: any, //活动ID
  activityId: string, //测试模式
  isDebugger: Boolean, //测试模式基地址
  baseUrl: string, 
}
```

#### go(path: string, navigateParams?: NavigateParams)
统一的页面跳转方法

###### navigateParams 参数说明

```typescript
interface NavigateParams {
  event?: any;
  type?: 'url' | 'deeplink'
  success?: (res?:any) => void;
  fail?: (err?: any) => void;
  complete?: (res: any) => void;
}
```

#### getUserType()
获取用户类型

用户类型说明:
NEW 新用户 |
RECALL 召回用户 |
REVIVE 拉活 |
ACTIVE 老用户

#### fetch(method: string, url: string, data?: object, header?: object)
请求方法

#### TaskBus
任务管理系统，提供任务相关的功能

- `getTaskList()` 获取任务列表
  
- `claimTask(taskMetaId: string)` 领取任务
  - `taskMetaId`: 任务元数据 ID

- `polling(group?: string)` 任务轮询
  - `group`: 活动分组标识，用于数据隔离，默认为 COMMON 分组

- `queryRecord(limit: number)` 获取助力记录
  - `limit`: 单次查询的数量限制


#### task.follow
专注关注相关方法
- `takeFollow()`: 发起关注
- `cancelFollow()`: 取消关注
- `completeFollowTask(instanceId: string)` 完成关注任务
  - `instanceId`: 任务实例 ID

#### task.publishNotes
专注笔记相关方法
- `publishNote()`: 发布笔记
- `completeNoteChangeTask(instanceId: string)` 完成发布笔记任务
  - `instanceId`: 任务实例 ID

- `completeNoteBrowserTask(instanceId: string)` 完成笔记浏览任务
  - `instanceId`: 任务实例 ID

- `completeNoteLikeTask(instanceId: string)` 完成笔记点赞任务
  - `instanceId`: 任务实例 ID

- `completeSearchNoteTask(instanceId: string)` 完成笔记搜索任务
  - `instanceId`: 任务实例 ID

#### task.topic
专注话题相关方法
- `viewTopic()`: 查看话题

#### task.inviteFriends
专注邀请助力相关方法
- `completeInviteAssistTask(instanceId: string, shareCode: string)` 完成邀请助力任务
  - `instanceId`: 任务实例 ID
  - `shareCode`: 助力任务的邀请码

### BenefitBus（待实现）

权益管理系统，提供权益相关的功能

## 最佳实践

1. **初始化时机**
```typescript
// 在应用入口处初始化
growthCore.init({
  platform: process.env.PLATFORM || 'webview',
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

