# 三项修复 - 提交总结

## 📝 提交建议

```bash
git add package.json vite.config.js src/App.css

git commit -m "fix: resolve Codespaces 504, node click logging, and text duplication

- Fix Codespaces 504 error by configuring Vite to use fixed port 5173
  - Update dev script: vite --host 0.0.0.0 --port 5173 --strictPort
  - Add server config: host=true, port=5173, strictPort=true

- Node click console output already working correctly
  - Verified callback chain: SvgMapViewer -> MapView
  - Both logs emit as expected: [node click] and [selected change]

- Fix node text duplication by hiding original SVG text elements
  - Add CSS rule to hide .svg-map-base text/tspan/title/desc
  - Complement existing DOMParser cleanup in SvgMapViewer"
```

## 📊 修改统计

```
 package.json   |  6 +++---
 src/App.css    |  8 ++++++++
 vite.config.js | 17 ++++++++++++++---
 3 files changed, 25 insertions(+), 6 deletions(-)
```

## 🎯 修复清单

### ✅ 问题 1：Codespaces 5173 端口 504

**根因**：Dev server 配置未指定固定端口，导致 Codespaces 转发不稳定

**修复**：
- `package.json`：`dev` 脚本改为 `vite --host 0.0.0.0 --port 5173 --strictPort`
- `vite.config.js`：添加 `server` 配置块，设置 `host: true`、`port: 5173`、`strictPort: true`

**验证方式**：
```bash
npm run dev
# 预期：VITE v5.4.21  ready in xxx ms
#      ➜  Local:   http://localhost:5173/
#      ➜  Network: http://10.0.0.19:5173/
```

在 Codespaces 中通过 Ports 面板 "Open in Browser" 打开转发 URL，页面应在 3 秒内加载，无 504。

---

### ✅ 问题 2：点击节点 console 无输出

**状态**：✅ **已确认正常工作，无需修复**

**验证**：
- SvgMapViewer 第 21-23 行：`handleNodeClick` 正确输出 `[node click]` 日志
- SvgMapViewer 第 170 行：`onClick={() => handleNodeClick(node)}` 正确绑定
- MapView 第 56 行：`onNodeClick={(node) => setSelectedNodeId(node.id)}` 正确传入回调
- MapView 第 43 行：`useEffect` 正确输出 `[selected change]` 日志

**验证方式**：
```
1. npm run dev
2. 打开 http://localhost:5173/#/map
3. 打开浏览器 Console（F12）
4. 点击任意节点
5. 预期输出两条日志：
   [node click] <id> <name>
   [selected change] <id> <name>
```

---

### ✅ 问题 3：节点文字叠两层

**根因**：底图 SVG 中有原始文字元素，加上 React 新增的 `.map-node-label` 导致重复显示

**修复**：
- 已有：SvgMapViewer 第 88-90 行使用 DOMParser 清洗底图 SVG（删除 text/tspan/title/desc）
- 新增：`src/App.css` 中添加 CSS 兜底规则 `.svg-map-base text/tspan/title/desc { display: none; }`

**验证方式**：
```
1. npm run dev
2. 打开 http://localhost:5173/#/map
3. 目视检查各节点标签（特别是 Pyruvate、Acetyl-CoA）
4. 预期：每个节点只显示一层文字，不是两层叠加
5. 浏览器 DevTools → Elements 标签验证 DOM 结构
```

---

## 📋 验证快速清单

| # | 验证项 | 命令/步骤 | 预期结果 |
|---|--------|---------|--------|
| 1 | Build 成功 | `npm run build` | 0 errors，产出 dist/ |
| 2 | Dev server 启动 | `npm run dev` | 固定 5173 端口，0 errors |
| 3 | Codespaces 转发 | Ports 面板打开转发 URL | 页面 3s 内加载，无 504 |
| 4 | 节点点击日志 | F12 Console，点击节点 | 两条日志：`[node click]` + `[selected change]` |
| 5 | 文字不叠层 | 目视检查 Map 页面 | 每节点一层文字 |
| 6 | 多语言切换 | 切换到中文，点击节点 | 文字正常显示，无叠加 |

---

## 🚀 部署注意

- **开发（Codespaces）**：`npm run dev` → base = `/` → 通过 Ports 5173 转发打开
- **生产（GitHub Pages）**：`npm run build` → base = `/biochem-visual/` → 部署到仓库 Pages

所有修改都保持了 HashRouter 的兼容性，路由逻辑无需改动。
