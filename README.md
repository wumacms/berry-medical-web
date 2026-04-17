# Berry Medical Nuxt App

基于 Nuxt 3 + Vue 3 + TypeScript + TailwindCSS 构建的医疗管理前端应用。

## 技术栈

- **框架**: Nuxt 3
- **UI**: Vue 3 (Composition API)
- **样式**: TailwindCSS 4
- **类型**: TypeScript

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 项目结构

```
├── assets/           # 静态资源
├── components/       # Vue 组件
├── layouts/          # 布局文件
├── pages/            # 页面文件 (基于文件的路由)
├── public/           # 公共静态资源
├── app.vue           # 应用入口
├── nuxt.config.ts    # Nuxt 配置
└── package.json
```

## 路由

Nuxt 使用基于文件的路由系统：

- `pages/index.vue` → `/`
- `pages/about.vue` → `/about`
- `pages/users/[id].vue` → `/users/:id`

更多信息请参考 [Nuxt 3 文档](https://nuxt.com/docs)。
