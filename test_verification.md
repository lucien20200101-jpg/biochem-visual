# 验证清单

## 1. 点击节点 console 输出
- 打开浏览器 DevTools (F12 -> Console)
- 在 Map 页面点击任意节点（如 Pyruvate）
- 应该看到两行日志：
  1) [node click] pyruvate Pyruvate  (来自 SvgMapViewer)
  2) [selected change] pyruvate Pyruvate  (来自 MapView)

## 2. Wheel 缩放事件
- 在 Map 页面用鼠标滚轮放大/缩小
- Console 中不应该出现 "Unable to preventDefault inside passive event listener" 错误
- 缩放应该正常工作（右上角百分比改变）

## 3. 文字不再重叠
- 检查 Pyruvate、Glucose 等节点
- 应该只显示一层黑色文字
- 不应该有灰色底字 + 黑色字的重叠现象

## 代码确认检查

### SvgMapViewer.jsx
✓ handleNodeClick 有 console.log("[node click]", node.id, node.name)
✓ startPan 有 if (event.target?.closest?.(".map-node")) return; 保护
✓ handleWheel 是 non-passive 事件监听：addEventListener("wheel", ..., { passive: false })
✓ SVG base 加载时删除了 text/tspan/title/desc 元素：doc.querySelectorAll("text, tspan, title, desc").forEach(node => node.remove())

### MapView.jsx
✓ SvgMapViewer 只传 3 个 props：mapUrl / nodes / onNodeClick
✓ useEffect 有 console.log("[selected change]", selectedNodeId, selectedNode?.name)

