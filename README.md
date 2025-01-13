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

### 1. 初始化

```typescript
import growthCore from '@veryoung/xhs-growth';

// 初始化配置
const core = await growthCore.init({
  //使用增长能力平台
  platform: 'webview', // 'webview' | 'miniprogram' | 'rn'
  //小程序标识码
  appId: ''，
  //请求实例
  fetchCore: xhs,
  //活动ID
  activityId: '',
  //测试模式
  isDebugger: true,
  //测试模式基地址
  baseUrl: " https://logan.devops.xiaohongshu.com/proxy/redgamecenter",
  // 其他配置项...
});
```

### 2. 基础功能使用

####  页面跳转
```typescript
growthCore.go(path, NavigateParams);
growthCore.go('/task-list', { id: 123 });
```

##### NavigateParams 参数说明
| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| event | any | 否 | 事件对象 |
| type | 'url' \| 'deeplink' | 否 | 跳转类型（deeplink为跳转小红书页面） |
| success | (res?: any) => void | 否 | 成功回调函数 |
| fail | (err?: any) => void | 否 | 失败回调函数 |
| complete | (res: any) => void | 否 | 完成回调函数（无论成功失败） |


### 请求
```typescript
growthCore.fetch(method, url, data, header)
growthCore.fetch('get', { id: 123 });
```
### 获取用户类型
```typescript
growthCore.getUserType()
```
| 返回值 | 说明 |
| --- | --- |
| NEW | 新用户 |
| RECALL | 召回用户 |
| REVIVE | 拉活 |
| ACTIVE | 老用户 |

### 使用任务功能
#### 获取任务列表
```typescript
growthCore.task.getTaskList();
// 示例响应
{
    "code":0,  
    "msg":"成功",
    "success": true,
    "data": {
        "tasks": [
            {    
                "tasketaId":"", // 任务元ID 领取任务时使用
                "instanceId":"", // 该字段需要用户领取了任务才会有 如果没有领取任务这个字段为空
                "taskType":"", // 任务类型 必有
                "name":"", // 任务名称
                "taskStatus":"", // 任务状态 必有
                "progress":"", //进度
                "expireTime": "", //失效时间
                "triggerMeta":{
                     "triggerCondition":[], //话题ID 关注者用户ID 根据任务类型返回不同的ID集合 关注任务返回关注userId 发布笔记任务返回话题ID 浏览任务返回pageId
                }, // 任务元信息
                "extra":{
                    "shareCode":"" // 邀请码
                }
            }
        ]
    }
}
```
#### 领取任务
```typescript
growthCore.task.claimTask(taskMetaId);
// 请求参数taskMetaId 任务元ID
// 示例响应
{
    "code":0,  
    "msg":"成功",
    "success": true,
    "data": {    
                "tasketaId":"", // 任务元ID 领取任务时使用
                "instanceId":"", // 该字段需要用户领取了任务才会有 如果没有领取任务这个字段为空
                "taskType":"", // 任务类型 必有
                "name":"", // 任务名称
                "taskStatus":"", // 任务状态 必有
                "progress":"", //进度
                "expireTime": "", //失效时间
                "triggerMeta":{
                     "triggerCondition":[], //话题ID 关注者用户ID 根据任务类型返回不同的ID集合 关注任务返回关注userId 发布笔记任务返回话题ID 浏览任务返回pageId
                }, // 任务元信息
                "extra":{
                    "shareCode":""
                }
            }
}
```
#### 完成任务
```typescript
growthCore.task.completeTask(instanceId: string, eventType: eventMissionType, params: any);
// 请求参数
{
    "instanceId":"" // 任务实例ID
    "eventType":""
    "param":{
        "shareCode":"" // 助力任务时传入 其它任务当前不用传
    } // map kv格式
}
```

#### 事件轮询
```typescript
growthCore.task.polling(group?: string);
// 请求参数
{
   "group":"" // 活动下查询的分组，可以对同一活动同一类型的通知进行数据隔离。不传则使用默认COMMON分组
}
// 示例响应
{
    "code":0,  
    "msg":"成功",
    "success": true,
    "data": {
        "nextQueryAfter":"", //下一次轮训间隔
        "notifications":[
            {
                "notificationId"::"", // 通知ID
                "notificationData":{
            
                } // 具体的内容 map kv格式
            }
        ]
    }
}
```
#### 获取助力记录
```typescript
growthCore.task.queryRecord();
// 示例响应
{
    "code":0,  
    "msg":"成功",
    "success": true,
    "data": [
        {
            "avatar":"", // 头像
            "nickname":"", // 昵称
        }  
    ]
}
```

```typescript
// 使用权益功能(待实现)
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
  platform: 'webview' | 'miniprogram' | 'rn';
  // 其他配置项...
}
```

#### go(path: string, params?: object)
统一的页面跳转方法

### TaskBus

任务管理系统，提供任务相关的功能

#### task.follow
专注任务相关方法
- `takeFollow()`: 发起关注
- `cancelFollow()`: 取消关注

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

