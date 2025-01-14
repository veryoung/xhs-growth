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
GrowthCore.init(config);
```

## 在不同框架中使用

### React

```typescript
import React, { useEffect } from 'react';
import type { Config } from '@veryoung/xhs-growth/src/types';

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

#### init(config) 初始化 SDK

###### config 参数说明
    
| 参数名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| platform | `'webview'` \| `'miniprogram'` \| `'rn'` | 平台标识（-webview  h5页面 -miniprogram  小程序 -rn  ReactNAtive应用） | 是 |
| appId | string | 应用标识 | 是 |
| fetchCore | any | 请求实例 | 是 |
| activityId | string | 活动 ID | 是 |
| isDebugger | boolean | 是否开启测试模式 | 否 |
| baseUrl | string | API 基础地址 | 是 |

#### go(path: string, navigateParams?: NavigateParams)
统一的页面跳转方法

###### navigateParams 参数说明

| 参数名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| event | any | 事件对象 | 否 |
| type | `'url'` \| `'deeplink'` | 跳转类型 | 否 |
| success | `(res?: any) => void` | 成功回调函数 | 否 |
| fail | `(err?: any) => void` | 失败回调函数 | 否 |
| complete | `(res: any) => void` | 完成回调函数（无论成功失败） | 否 |

#### getUserType() 获取用户类型
用户类型说明：
  | 类型 | 说明 |
  |------|------|
  | NEW | 新用户 |
  | RECALL | 召回用户 |
  | REVIVE | 拉活用户 |
  | ACTIVE | 老用户 |

#### fetch(method: string, url: string, data?: object, header?: object) 请求方法

#### Task 任务实例
任务管理系统，提供任务相关的功能

- `polling(group?: string)` 任务轮询

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | group | string |活动下查询的分组，不传则使用默认 COMMON 分组 | 是 |


- `queryRecord(limit: number)` 获取助力记录

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | limit | string |单次查询的数量限制 | 是 |


##### task.follow
关注任务相关方法
- `takeFollow()`: 发起关注
- `completeFollowTask(instanceId: string)` 完成关注任务

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | instanceId | string |任务实例 ID | 是 |

##### task.publishNotes
笔记任务相关方法
- `publishNote()`: 发布笔记

- `completeNoteChangeTask(instanceId: string)` 完成发布笔记任务

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | instanceId | string |任务实例 ID | 是 |

- `completeNoteBrowserTask(instanceId: string)` 完成笔记浏览任务

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | instanceId | string |任务实例 ID | 是 |

- `completeNoteLikeTask(instanceId: string)` 完成笔记点赞任务

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | instanceId | string |任务实例 ID | 是 |

- `completeSearchNoteTask(instanceId: string)` 完成笔记搜索任务

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | instanceId | string |任务实例 ID | 是 |

##### task.topic
话题任务相关方法
- `viewTopic()`: 查看话题

#### task.inviteFriends
好友助力任务相关方法

- `completeInviteAssistTask(instanceId: string, shareCode: string)` 完成邀请助力任务

    | 参数名 | 类型 | 说明 | 必填 |
    |--------|------|------|------|
    | instanceId | string |任务实例 ID | 是 |
    | shareCode | string |任务实例 ID | 是 |

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

