# Codespaces 路径问题修复总结

## 问题描述
在 Codespaces 中通过 forwarded port 打开项目时，由于 `vite.config.js` 中 `base` 硬编码为 `/biochem-visual/`，导致页面无法正确加载，显示 404。

## 解决方案

### 修改文件：`vite.config.js`

**变更前：**
```javascript
export default defineConfig({
  base: "/biochem-visual/",
  plugins: [react()],
});
```

**变更后：**
```javascript
export default defineConfig(({ mode }) => {
  // In development (Codespaces, dev server): base = /
  // In production (GitHub Pages): base = /biochem-visual/
  const base = mode === "production" ? "/biochem-visual/" : "/";

  return {
    base,
    plugins: [react()],
  };
});
```

### 原理
- **开发模式（`npm run dev`）**：`mode === "development"`，`base = "/"`
  - 适用于本地开发和 Codespaces 的 forwarded port
  - 应用可在根路径 `/` 直接访问
  
- **生产模式（`npm run build`）**：`mode === "production"`，`base = "/biochem-visual/"`
  - 适用于 GitHub Pages 部署
  - 应用部署在子路径 `/biochem-visual/` 下

### 为什么可行
1. **HashRouter 兼容**：使用 `HashRouter` 的路由不依赖 base 配置（所有路由通过 `#` 处理），只是静态资源路径受 base 影响
2. **静态资源自动处理**：Vite 会自动处理 `import` 的资源（如 SVG、图片等），根据 base 配置调整其在 HTML 中的路径
3. **最小改动**：仅改动 Vite 配置，无需修改 React 代码

## 修改的文件列表

| 文件 | 变更类型 | 关键改动 |
|------|--------|--------|
| `vite.config.js` | 修改 | 将 `base` 从硬编码 `/biochem-visual/` 改为动态配置：生产环境用 `/biochem-visual/`，开发环境用 `/` |

## 验证步骤

### 1. 开发环境验证（Codespaces）

```bash
# 启动开发服务器
npm run dev

# Vite 会在终端输出类似信息：
# VITE v5.4.21  ready in 123 ms
# ➜  Local:   http://localhost:5173/
# ➜  press h to show help
```

然后：
- 通过 Codespaces 的 "Forwarded Ports" 功能，打开转发地址（通常是 `https://*.app.github.dev`）
- **验证点**：
  - ✓ 页面正常加载，显示首页内容
  - ✓ 可以正常点击导航菜单
  - ✓ 点击 "Map" 链接可以访问 `/#/map`，Map 页面能正常渲染
  - ✓ 控制台无 404 错误关于资源加载

### 2. 生产环境验证（Build）

```bash
# 构建项目
npm run build

# 预览生产构建
npm run preview
```

检查生成的 `dist/index.html`：
```bash
cat dist/index.html | head -20
```

**验证点**：
- ✓ `<script>` 和 `<link>` 标签中的资源路径都包含 `/biochem-visual/` 前缀
- ✓ 例如：`<script type="module" src="/biochem-visual/assets/index-*.js"></script>`

本地预览时访问 `http://localhost:4173/biochem-visual/` 可正常加载

### 3. 资源加载验证

- ✓ SVG 地图文件加载正常（MapView.jsx 中 `import mapSvg from "../assets/maps/mini-metabolism.svg"`）
- ✓ i18n JSON 文件加载正常
- ✓ CSS 样式加载正常

## 额外说明

### 关于 HashRouter
项目使用 `react-router-dom` 的 `HashRouter`，这意味着：
- 所有路由都在 URL hash (`#`) 之后
- 例如：`http://localhost:5173/#/map`
- **好处**：HashRouter 不依赖服务器端路由配置，完全客户端处理，因此不需要修改 React 代码

### 关于兼容性
修改后的配置完全兼容两种部署方式：
1. **Codespaces 开发**：当 `npm run dev` 时，base = `/`，forwarded port 打开后直接看到应用
2. **GitHub Pages 部署**：当 `npm run build` 后部署到 `https://github.com/lucien20200101-jpg/biochem-visual/` 仓库，Pages 自动使用 `/biochem-visual/` 路径，构建产物中的 base 已正确配置

### 后续维护
如果需要添加其他环境变量，可在 `vite.config.js` 中通过 `mode` 参数进行判断。常见的 mode 值：
- `development`：`npm run dev` 时
- `production`：`npm run build` 时
- 自定义：`vite --mode staging`
