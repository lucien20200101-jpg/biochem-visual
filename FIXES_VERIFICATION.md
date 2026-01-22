# 三项修复的验证指南

本文档提供逐步验证上述 3 个问题修复的指南。

## 修改的文件

| 文件 | 修改内容 |
|------|--------|
| `package.json` | 更新 dev 脚本使用 `vite --host 0.0.0.0 --port 5173 --strictPort` |
| `vite.config.js` | 添加 `server` 配置：`host: true`、`port: 5173`、`strictPort: true` |
| `src/App.css` | 添加 CSS 规则隐藏底图 SVG 的文字元素（`.svg-map-base text/tspan/title/desc`） |

### 关键 Diff

#### package.json
```diff
- "dev": "node node_modules/vite/bin/vite.js",
+ "dev": "vite --host 0.0.0.0 --port 5173 --strictPort",
```

#### vite.config.js
```diff
+ server: {
+   host: true,
+   port: 5173,
+   strictPort: true,
+ },
```

#### src/App.css
```diff
+/* Hide original SVG text elements to prevent duplication */
+.svg-map-base text,
+.svg-map-base tspan,
+.svg-map-base title,
+.svg-map-base desc {
+  display: none;
+}
```

---

## 验证步骤

### ✅ 验证 1：Codespaces 端口转发（修复问题 1）

**目标**：确认 dev 服务器在固定的 5173 端口上运行，且通过 Codespaces 转发后能正常访问。

**步骤**：

1. **启动 dev 服务器**
   ```bash
   npm run dev
   ```
   
   **预期输出**：
   ```
   VITE v5.4.21  ready in xxx ms
   
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://10.0.0.19:5173/
   ➜  press h + enter to show help
   ```
   
   **验证点**：
   - ✓ 固定使用端口 5173
   - ✓ `--host 0.0.0.0` 使其对网络可访问
   - ✓ `--strictPort` 确保端口被占用时立即失败（易于发现冲突）

2. **在 Codespaces 中打开转发端口**
   
   - 打开 VS Code 底部的 "Ports" 面板
   - 应该看到端口 5173 在运行
   - 点击 "Open in Browser" 或将转发地址复制到浏览器
   
   **预期行为**：
   - ✓ 页面在 3 秒内加载，无 504 超时
   - ✓ 显示首页内容（app title、导航菜单等）
   - ✓ 没有 404 错误关于资源（检查浏览器开发者工具 → Network/Console）

3. **验证 Network 标签**
   
   - 打开浏览器开发者工具（F12 → Network）
   - 刷新页面
   - 检查 `index.html`、CSS、JS 文件的状态码
   
   **预期结果**：
   - ✓ 所有资源状态码为 200
   - ✓ 没有 5xx 错误

---

### ✅ 验证 2：节点点击回调链路（修复问题 2）

**目标**：确认点击节点时，两条日志都正常输出。

**步骤**：

1. **导航到 Map 页面**
   - 在首页点击导航菜单中的 "Map" 链接
   - 或直接访问 `/#/map`
   
   **预期结果**：
   - ✓ Map 页面正常加载
   - ✓ 底图和节点圆圈可见

2. **打开浏览器控制台**
   - 打开浏览器开发者工具（F12）
   - 切换到 Console 标签
   - 清空现有日志（点击清理按钮或按 Ctrl+L）

3. **点击任意节点**
   - 在地图上点击任意节点（如"Pyruvate"、"Acetyl-CoA"等）
   
   **预期输出**：应该看到两行日志：
   ```
   [node click] <node_id> <node_name>
   [selected change] <node_id> <node_name>
   ```
   
   例如：
   ```
   [node click] pyruvate Pyruvate
   [selected change] pyruvate Pyruvate
   ```
   
   **验证点**：
   - ✓ `[node click]` 日志由 SvgMapViewer 的 `handleNodeClick` 输出
   - ✓ `[selected change]` 日志由 MapView 的 `useEffect` 输出
   - ✓ 右侧 panel 的节点信息正确更新

4. **多次点击不同节点**
   - 点击 3-4 个不同的节点
   
   **预期结果**：
   - ✓ 每次点击都输出两条日志
   - ✓ 日志中的 id 和 name 与所点击的节点一致
   - ✓ 右侧 panel 的内容随之更新

---

### ✅ 验证 3：节点文字不叠层（修复问题 3）

**目标**：确认节点文字不再重复显示，特别是"Pyruvate"等节点。

**步骤**：

1. **在 Map 页面观察节点**
   - 已在前一步打开了 Map 页面
   
2. **检查各个节点的文字**
   - 仔细观察各节点的标签文字
   - 特别关注 "Pyruvate"、"Acetyl-CoA" 等关键节点
   
   **预期结果**：
   - ✓ 每个节点只显示一行文字
   - ✓ 文字清晰可见，不是两层叠加
   - ✓ 文字与圆形节点对齐，位置在节点中心

3. **使用浏览器开发者工具验证 DOM**
   - 打开浏览器开发者工具（F12）
   - 切换到 "Elements" / "Inspector" 标签
   - 点击 Inspector 的"选择元素"按钮
   - 在地图上点击一个节点（如 Pyruvate）来检查其 DOM 结构
   
   **预期 DOM 结构**：
   ```html
   <g class="svg-map-base">
     <!-- SVG 原始元素（paths 等），但 text/tspan 已被 CSS 隐藏 -->
   </g>
   <g class="map-node-layer">
     <g class="map-node ...">
       <circle cx="..." cy="..." r="26" />
       <circle class="map-node-core" cx="..." cy="..." r="8" />
       <text class="map-node-label" x="..." y="...">
         Pyruvate
       </text>
     </g>
   </g>
   ```
   
   **验证点**：
   - ✓ `.svg-map-base` 容器中的 text/tspan 元素存在但被 `display: none` 隐藏
   - ✓ `.map-node-label` 文字单独显示
   - ✓ 控制台无警告或错误关于文字渲染

4. **切换语言验证**
   - 点击页面顶部的语言切换按钮（English / 中文）
   - 切换到中文
   
   **预期结果**：
   - ✓ 节点文字更新为中文标签
   - ✓ 仍然只显示一层，没有叠加
   - ✓ 文字对齐和布局保持正确

---

## 总结

| 修复项 | 预期结果 | 验证方式 |
|--------|--------|--------|
| **504 错误** | 页面在 3 秒内加载成功 | 1. dev server 输出确认 5173 固定端口 2. Codespaces 转发 URL 打开无 504 |
| **console 无输出** | 点击节点时输出 2 条日志 | 打开浏览器 Console 标签，点击节点检查日志 |
| **文字叠层** | 每个节点只显示一层文字 | 目视检查节点标签，用 Inspector 验证 DOM 和 CSS |

---

## 故障排查

### 问题：dev server 无法启动，提示"端口被占用"

**原因**：`--strictPort` 模式下，5173 端口如果被占用会立即失败。

**解决**：
```bash
# 查找占用 5173 的进程
lsof -i :5173

# 杀死该进程
kill -9 <PID>

# 或直接杀死所有 vite 进程
pkill -f "vite"

# 重新启动
npm run dev
```

### 问题：打开 Codespaces 转发 URL 仍然 504

**排查**：
1. 确认 dev server 仍在运行（查看终端）
2. 检查 Ports 面板中 5173 的状态（应为绿色 "Running"）
3. 尝试刷新页面
4. 检查浏览器控制台是否有 CORS 或其他错误

### 问题：点击节点没有日志输出

**排查**：
1. 确认 Console 标签是否打开且未被过滤
2. 尝试点击不同的节点
3. 检查浏览器控制台是否有其他错误（红色消息）
4. 查看 Network 标签确认所有资源加载成功

### 问题：节点文字仍然叠层

**排查**：
1. 打开浏览器 DevTools 的 Elements 标签
2. 选择节点文字，检查计算样式（Computed）
3. 确认 `.svg-map-base text` 的 `display` 值为 `none`
4. 清空浏览器缓存（Ctrl+Shift+Delete）后重新加载
