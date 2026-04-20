# 贝瑞医疗后台管理系统开发计划

> 文档版本: v1.0
> 创建时间: 2026-04-20
> 项目: berry-medical-nuxt

---

## 一、项目概述

### 1.1 目标
为贝瑞医疗官网开发一套后台管理系统，使管理员能够通过邮箱+密码登录后管理网站内容，包括新闻动态、页面区块、联系表单等。

### 1.2 技术栈
| 技术 | 用途 |
|------|------|
| Nuxt 3 | 框架 |
| Supabase Auth | 邮箱+密码认证 |
| Supabase Database | 数据存储 |
| Tailwind CSS | 样式框架 |
| TypeScript | 类型安全 |

---

## 二、功能模块规划

### 2.1 认证模块
- [x] 邮箱+密码登录
- [x] 登录状态保持（JWT Token）
- [x] 路由保护（未登录跳转登录页）
- [x] 退出登录

### 2.2 仪表盘
- [x] 数据统计卡片（新闻数量、待处理表单等）
- [x] 快捷操作入口
- [x] 最近活动

### 2.3 新闻管理
- [x] 新闻列表（分页、筛选、搜索）
- [x] 新建新闻
- [x] 编辑新闻
- [x] 删除新闻
- [x] 批量操作（可选）

### 2.4 页面管理
- [x] 页面列表（按导航顺序展示）
- [x] 新建页面
- [x] 编辑页面基本信息（名称、路径、描述）
- [x] 页面 SEO 配置（标题、描述、关键词）
- [x] 删除页面（含关联区块）

### 2.5 区块内容管理
- [x] 区块列表（按页面+排序顺序展示）
- [x] 编辑区块内容（JSONB 配置编辑）
- [x] 区块排序（拖拽排序）
- [x] 区块显隐控制
- [x] 批量操作（可选）

### 2.6 联系表单管理
- [x] 表单提交列表
- [x] 查看详情
- [x] 标记已处理
- [x] 删除记录

### 2.7 网站配置
- [x] 网站基础信息编辑（公司名、标语、描述等）
- [x] 导航栏管理（菜单项、排序、显示/隐藏）
- [x] 页脚管理（底部链接、版权信息、ICP备案）
- [x] 联系方式配置（电话、邮箱、地址）
- [x] 全局 SEO 配置
- [x] Logo 和 Favicon

---

## 三、页面路由

```
/admin/login              # 登录页
/admin                    # 仪表盘
/admin/news               # 新闻列表
/admin/news/new           # 新建新闻
/admin/news/[id]/edit     # 编辑新闻
/admin/pages              # 页面管理
/admin/pages/[id]         # 页面详情/区块编辑
/admin/contacts          # 联系表单
/admin/settings           # 网站配置
```

---

## 四、数据表设计

### 4.1 管理员表（需新增）
```sql
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 4.2 页面表（pages）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| website_id | TEXT | 所属网站 |
| name | TEXT | 页面名称 |
| path | TEXT | 页面路径（唯一） |
| description | TEXT | 页面描述 |
| seo | JSONB | SEO 配置 |

### 4.3 区块表（blocks）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| page_id | UUID | 所属页面 |
| type | TEXT | 区块类型 |
| title | TEXT | 区块标题 |
| sort_order | INTEGER | 排序 |
| config | JSONB | 区块配置 |
| is_published | BOOLEAN | 是否发布 |

### 4.4 其他现有表（复用）
- `websites` - 网站配置
- `news` - 新闻数据
- `contact_submissions` - 联系表单

---

## 五、开发阶段

### 第一阶段：基础设施
1. 创建数据库管理员表
2. 实现登录认证（Supabase Auth）
3. 创建管理后台布局组件
4. 实现路由守卫中间件

### 第二阶段：核心功能
1. 仪表盘页面
2. 新闻管理 CRUD
3. 区块内容编辑
4. 联系表单查看

### 第三阶段：完善功能
1. 网站配置页面
2. 页面管理
3. 响应式适配
4. 错误处理优化

---

## 六、文件结构

```
├── components/
│   └── admin/           # 管理后台组件
│       ├── AdminSidebar.vue
│       ├── AdminHeader.vue
│       ├── DataTable.vue
│       ├── NewsForm.vue
│       ├── PageForm.vue     # 页面表单
│       ├── BlockEditor.vue   # 区块编辑器
│       └── ContactDetail.vue # 表单详情
├── composables/
│   ├── useAuth.ts       # 认证逻辑
│   ├── useNews.ts       # 新闻管理（已存在）
│   ├── usePages.ts      # 页面管理
│   └── useBlocks.ts     # 区块管理
├── layouts/
│   └── admin.vue        # 管理后台布局
├── middleware/
│   └── admin.ts         # 路由守卫
├── pages/
│   └── admin/
│       ├── index.vue    # 仪表盘
│       ├── login.vue    # 登录页
│       ├── news/
│       │   ├── index.vue     # 新闻列表
│       │   ├── new.vue       # 新建新闻
│       │   └── [id]/edit.vue # 编辑新闻
│       ├── pages/
│       │   ├── index.vue     # 页面列表
│       │   ├── new.vue       # 新建页面
│       │   └── [id]/
│       │       └── edit.vue  # 编辑页面+区块
│       ├── contacts.vue
│       └── settings.vue
└── types/
    └── admin.ts         # 管理端类型定义
```

---

## 七、UI 设计方向

### 7.1 风格
- 简洁专业的管理后台风格
- 左侧导航 + 右侧内容区布局
- 卡片式数据展示

### 7.2 配色
沿用前台主色调，保持品牌一致性

### 7.3 响应式
- 桌面端优先
- 平板/手机端自适应

---

## 八、隔离方案

### 前台与后台隔离策略

采用 **子目录 + 中间件守卫** 方案：

```
前台路由（SSR）：/                   # 网站首页（公开）
                 /news/*            # 新闻页面（公开）
                 /contact           # 联系我们（公开）

后台路由（CSR）：/admin/login       # 登录页
                 /admin/*           # 管理页面（需认证）
```

### 隔离机制

1. **路由层面**
   - 前台使用 SSR（`routeRules` 配置 `prerender: true`）
   - 后台使用 CSR（`routeRules` 配置 `ssr: false`）
   - 后台路由全部在 `/admin/` 路径下

2. **中间件守卫**
   ```typescript
   // middleware/admin.ts
   // 所有 /admin/* 路由自动检查认证状态
   // 未登录 → 跳转 /admin/login
   // 已登录访问登录页 → 跳转 /admin
   ```

3. **数据层面**
   - 前台：公开数据（RLS 允许 SELECT）
   - 后台：所有数据操作（使用 service_role 密钥）

4. **部署层面**
   - 前台：静态托管（CDN 加速）
   - 后台：SSR 服务（保护敏感操作）

### 访问控制矩阵

| 角色 | 前台（公开） | 后台登录 | 后台功能 |
|------|------------|---------|---------|
| 访客 | ✅ | ❌ | - |
| 管理员 | ✅ | ✅ | 全部 |
| 超级管理员 | ✅ | ✅ | 全部 + 用户管理 |

---

## 九、安全考虑

1. **认证安全**
   - Supabase Auth 托管认证
   - 安全的 JWT token 存储（httpOnly cookie）
   - 登录失败限制（可选）
   - 定期 token 刷新

2. **数据安全**
   - 管理员专属 RLS 策略
   - service_role 密钥仅在后端使用
   - XSS/CSRF 防护

3. **路由安全**
   - 所有 `/admin/*` 路由需验证身份
   - 未登录自动跳转登录页
   - 登录后访问登录页自动跳转仪表盘

---

## 十、开发优先级

| 优先级 | 功能 | 预计工时 |
|--------|------|---------|
| P0 | 登录认证 | 2h |
| P0 | 仪表盘 | 1h |
| P0 | 新闻管理 | 4h |
| P0 | 页面管理 | 3h |
| P1 | 区块编辑 | 4h |
| P1 | 联系表单 | 2h |
| P1 | 网站配置 | 4h |

**总预计工时: 20 小时**

---

## 十一、待确认事项

- [ ] 管理员账号如何创建？（初始账号由 Supabase 控制台创建？）
- [ ] 是否需要多管理员支持？
- [ ] 新闻分类是否需要单独管理？
- [ ] 区块编辑是否需要可视化编辑器，还是 JSONB 表单编辑？
- [ ] 是否需要富文本编辑器？
- [ ] 文件上传是否需要支持？
- [ ] 页面路径是否允许自定义？（需考虑与现有路由冲突）
- [ ] 页面删除时，关联区块是否一并删除？

---

> 文档状态：草稿，待评审后开始开发
