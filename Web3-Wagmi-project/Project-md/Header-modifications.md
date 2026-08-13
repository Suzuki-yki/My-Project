# Header Module — 修改记录与组件说明

说明：根据 Project-md 中的 UI 设计（Glassmorphism、Soft Neon、Dreamcore）与【AI 1】提示词对 Header 组件进行重构，目标是：组件化、TypeScript、响应式、可维护、避免直接写 Web3 逻辑（本次改为本地模拟连接行为）。

变更文件：
- src/components/header/Header.tsx
- src/components/header/Logo.tsx
- src/components/header/Navigation.tsx
- src/components/header/WalletButton.tsx

组件结构：
- Header (容器)
  - Logo (左侧，可点击)
  - Navigation (中间，md 以上显示，移动端折叠)
  - WalletButton (右侧，模拟连接状态)

设计要点：
- 玻璃拟态：背景 rgba + backdrop-blur + 细边框
- 软霓虹情感色：主色 #c18fa4，强调色 #67e8f9 / #f9a8d4
- 圆角与阴影：border-radius 24~32px 风格，soft shadow
- 动效：hover 缓动、移动端菜单过渡

实现细节：
- 使用 TypeScript 与 React 函数组件（返回 JSX.Element），保持类型可读性
- Navigation 接受 vertical prop，用于移动端展示
- WalletButton 移除对 wagmi 的直接依赖，改为本地 mock 连接切换（便于前端开发与后续替换）

如何审查与后续集成给 Web3 Engineer：
1. Wallet 接口点：WalletButton 中的 toggle/connect 行为为本地模拟。后续由 Web3 Engineer 将 connect/disconnect 替换为 wagmi hooks，并移除本地 mock 地址生成。建议保留同名回调（例如 onConnect/onDisconnect）以便替换。
2. 样式系统：Tailwind 类直接写在组件中。建议将共用颜色/边框/阴影抽到全局 Tailwind 配置（theme.extend.colors/shadow）以一致化视觉。
3. 字体：Logo 使用 Orbitron 建议在 index.html 或全局 CSS 中引入所需字体。当前组件使用类名并假设已在全局引入。
4. 可访问性：已为移动端菜单按钮添加 aria-label，导航链接在替换为 router 链接时建议使用 NavLink。

开发进度与建议下一步：
- 当前：Header 完成重构并提交（本地 mock wallet）。
- 下步（推荐，Web3 Engineer 执行）：替换 WalletButton 的 mock 行为为 wagmi 的 connect/disconnect，同时保留 UI/样式。
- 优化：将常用样式抽到组件库或 Tailwind 配置中，添加单元测试与 Storybook 展示。



附加修改（基于 UI-Design.md）：

变更文件：
- src/components/AICompanion.tsx
- src/components/PersonaRoom.tsx
- src/components/SoulPanel.tsx
- src/App.tsx (主布局：三栏结构)
- src/components/header/Navigation.tsx (导航项更新)

修改说明：
- 在 src/components 中新增三个展示组件：AICompanion（左侧 AI Companion area）、PersonaRoom（中间 Persona Room）、SoulPanel（右侧 Soul Panel）。
- App.tsx 从仅渲染 Header 改为包含 Header + 三栏主区域（左22%、中自适应、右18%），使用 Tailwind 响应式样式。
- Navigation.tsx 导航项替换为 UI-Design 推荐：Room、Collection、Persona、Memories、Community。

实现细节与注意：
1. WalletButton 保持 mock 行为，方便前端调试；后续由 Web3 Engineer 用 wagmi 替换，保留 onConnect/onDisconnect 接口。
2. 新增组件暂放在 src/components（因为运行环境限制）。后续可移动到 src/components/layout 并更新导入路径。
3. 样式建议抽离到 Tailwind theme（colors/shadows/radius）以保证一致性。
4. 推荐在 index.html 全局引入 Orbitron / Plus Jakarta Sans / Space Grotesk 字体。

提交者：Copilot CLI (Frontend assistant)
