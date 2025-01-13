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
growthCore.init({
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

```typescript
// 页面跳转
growthCore.go('/task-list', { id: 123 });

// 使用任务功能
growthCore.task.follow.takeFollow();
growthCore.task.follow.cancelFollow();

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
