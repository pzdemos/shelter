# Shelter 项目分析文档

## 项目概述

Shelter 是一个基于 React + Vite 的现代 Web 应用程序，使用了 Ant Design 作为 UI 组件库。该项目是一个单页面应用（SPA），具有用户认证、文件上传和用户管理等功能。

### 技术栈
- **前端框架**: React 18.3.1
- **构建工具**: Vite 7.2.2
- **UI 组件库**: Ant Design 5.28.1
- **路由**: React Router DOM 7.9.6
- **HTTP 客户端**: Axios 1.13.2
- **部署服务器**: Deno (通过 server.ts)

### 项目架构
- 采用组件化架构，布局组件分离（Header、Sidebar、MainContent）
- 使用 React Router 实现前端路由
- 集中化的 HTTP 请求管理（utils/request.js）
- 支持响应式侧边栏折叠功能

## 构建和运行

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产构建
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 代码检查
```bash
# 运行 ESLint 检查
npm run lint
```

### 部署
项目使用 Deno 作为部署服务器，通过 `server.ts` 处理静态文件服务和 SPA 路由回退。

## 开发约定

### 代码规范
- 使用 ESLint 进行代码规范检查
- 组件文件使用 `.jsx` 扩展名
- 工具函数放在 `src/utils` 目录下
- API 相关代码放在 `src/api` 目录下

### 组件结构
- 布局组件位于 `src/components/layout/`
- 页面组件位于 `src/pages/`
- 资源文件位于 `src/assets/`

### API 请求约定
- 使用统一的 axios 实例进行 HTTP 请求
- API 基础路径为 `/api/v1`
- 请求拦截器自动添加 Authorization token
- 响应拦截器统一处理错误信息

### 路由结构
- `/signin`: 登录页面
- `/`: 首页
- `/users`: 用户管理页面
- `/upload`: 文件上传页面

### 代理配置
开发环境下，API 请求代理到 `https://www.haoaiganfan.top`

## 项目特点

1. **现代化技术栈**: 使用最新的 React 和 Vite 技术
2. **完整的 UI 框架**: 基于 Ant Design 的企业级 UI 组件
3. **TypeScript 支持**: 配置了 TypeScript 类型定义
4. **生产就绪**: 包含完整的构建和部署配置
5. **前后端分离**: 通过代理实现前后端分离开发

## 注意事项

- 项目目前使用 JavaScript 而非 TypeScript，但已配置 TypeScript 类型定义
- React Compiler 未启用，如需启用请参考官方文档
- 生产环境部署需要先运行 `npm run build` 构建静态资源