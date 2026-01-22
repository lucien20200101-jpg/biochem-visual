# 3 个修复 - 快速启动指南

## 🎯 修复内容

| 问题 | 修复 | 文件 |
|------|------|------|
| 1️⃣ Codespaces 5173 端口 504 | `--host 0.0.0.0 --port 5173 --strictPort` | `package.json` + `vite.config.js` |
| 2️⃣ 点击节点 console 无输出 | ✅ 已验证正常（无需修复） | N/A |
| 3️⃣ 节点文字叠两层 | CSS 隐藏底图文字元素 | `src/App.css` |

---

## 🚀 快速验证（3 分钟）

### Step 1: 启动开发服务器
```bash
npm install  # 如果首次运行
npm run dev
```

**期望输出**：
```
VITE v5.4.21  ready in xxx ms
➜  Local:   http://localhost:5173/
➜  Network: http://10.0.0.19:5173/
```

### Step 2: Codespaces 中验证转发端口
1. 看到下方提示："Your application running on port 5173 is available"
2. 点击 "Open in Browser" 或复制转发地址到浏览器
3. **预期**：页面在 3 秒内加载（无 504 错误）✅

### Step 3: 验证节点点击（打开 Map 页面）
1. 打开浏览器开发者工具：`F12` → `Console` 标签
2. 点击导航菜单中的 "Map"
3. 点击地图上的任意节点（如 "Pyruvate"）
4. **预期输出**：
   ```
   [node click] pyruvate Pyruvate
   [selected change] pyruvate Pyruvate
   ```
   ✅

### Step 4: 验证文字不叠层
1. 在 Map 页面观察各节点标签
2. **预期**：每个节点标签清晰，只显示一层（无重复）✅
3. 点击右上角的中文按钮，切换语言
4. **预期**：标签更新为中文，仍然只显示一层✅

---

## 📝 提交代码

```bash
git add package.json vite.config.js src/App.css

git commit -m "fix: Codespaces 504, node text duplication

- Fix Codespaces 504 by using fixed port 5173 with --strictPort
- Add Vite server config: host=true, port=5173, strictPort=true
- Hide duplicate text from base SVG via CSS (.svg-map-base)"
```

---

## 📂 修改文件详情

### package.json
```diff
- "dev": "node node_modules/vite/bin/vite.js",
+ "dev": "vite --host 0.0.0.0 --port 5173 --strictPort",
```

### vite.config.js (新增 server 配置)
```javascript
server: {
  host: true,
  port: 5173,
  strictPort: true,
},
```

### src/App.css (新增 CSS)
```css
/* Hide original SVG text elements to prevent duplication */
.svg-map-base text,
.svg-map-base tspan,
.svg-map-base title,
.svg-map-base desc {
  display: none;
}
```

---

## ✅ 验证清单

- [ ] `npm run dev` 启动成功，固定 5173 端口
- [ ] Codespaces 转发地址打开无 504
- [ ] Map 页面可以访问（`/#/map`）
- [ ] 点击节点有两条 console 日志
- [ ] 节点文字不重复显示
- [ ] 切换语言后文字正常更新
- [ ] `npm run build` 成功，无错误

---

## 💡 Codespaces 故障排查

### 端口冲突
```bash
pkill -f "vite"
npm run dev
```

### 转发 URL 仍然 504
1. 检查 Ports 面板中 5173 是否为绿色 "Running"
2. 刷新浏览器页面
3. 检查浏览器 Console 是否有错误

---

## 📖 详细文档

- [FIXES_VERIFICATION.md](./FIXES_VERIFICATION.md) - 详细验证步骤
- [FIXES_COMMIT_SUMMARY.md](./FIXES_COMMIT_SUMMARY.md) - 提交摘要与提交建议
