📊 网站使用流程
1. 钱包连接
   ├─ 连接以太坊钱包（MetaMask / 注入式钱包）
   └─ 支持 Mainnet 和 Sepolia 测试网

2. 进入主界面（Room - 默认首页）
   ├─ 顶部固定导航栏
   ├─ LUMI AI 伙伴交互区域
   └─ 底部按钮布局

3. 导航到其他页面
   └─ Collection / Persona / Memories / Community / Room

🎯 已实现的功能
1. Header 导航系统
钱包连接按钮 - 支持 MetaMask 和 RainbowKit 连接
网络切换器 - 支持以太坊主网和 Sepolia 测试网
导航菜单 - 5 个主要页面：
Room（你的房间）
Collection（NFT 收藏）
Persona（身份档案）
Memories（记忆）
Community（社区）
响应式设计 - 移动设备下转为折叠菜单

2. AI 陪伴核心 - LUMI
智能对话系统

集成 DeepSeek API（deepseek-chat 模型）
支持多轮对话记忆
消息保存到 Supabase 数据库
情感系统

6 种情绪状态：neutral、happy、sad、angry、shy、thinking
情绪会在对话中动态变化
情绪表现为不同的 Avatar 图片
关系追踪

记忆用户互动历史
支持多种关系状态：affectionate、friendly、playful、guarded、annoyed、cold、aggressive、distant
情感连续性 - 不会瞬间重置情绪
视觉特效

鼠标追踪发光效果
点击星星散射动画
漂浮消息框（5 秒自动消失，Hover 暂停）

3. Collection 页面（NFT 收藏）
展示钱包中的 NFT
网格布局（响应式 2-4 列）
显示 NFT 名称和 Token ID
无 NFT 时提示引导
4. Persona 页面（身份档案）
等级系统 - Persona Level（1-10 级）
Vibes 标签 - 用户的气质标签
个性评分 - 多维度的性格特征
成长提示 - 鼓励用户收集 NFT 和互动
5. Memories 页面（记忆）
记录用户的重要时刻
时间线展示格式
目前为示例数据（实际应关联 AI 对话历史
6. Community 页面（社区）
显示社区成员列表
成员等级展示
社区统计（成员数、NFT 总数、集合数）
7. Room 页面（个人房间）
数字空间定制（开发中）
房间主题设置：Dreamcore、Cyberpunk、Minimalist、Neon
音乐和动画开关
🔧 技术架构
层级	技术栈
前端框架	React + TypeScript + Vite
样式	Tailwind CSS + Tailwind Scrollbar
Web3	Wagmi 3.x + Viem
钱包连接	RainbowKit 2.x + MetaMask
后端数据库	Supabase (PostgreSQL)
AI 模型	DeepSeek Chat API + Google Generative AI
状态管理	React Query (TanStack)

💾 数据流
用户输入 → LUMI AI 处理 → DeepSeek API 调用
                    ↓
              返回结构化 JSON
              {emotion, relationship, reply}
                    ↓
              保存到 Supabase.messages 表
                    ↓
              本地状态更新 + 浮动消息展示

⚠️ 目前的不完整功能
Room 页面 - 主要是 UI 占位符，房间定制功能未实现
Memories 页面 - 数据硬编码，应自动从聊天历史生成
Collection - 需要实现 NFT 获取逻辑（调用区块链 API）
Community - 成员列表为示例数据，需实现真实数据加载
🚀 核心创新点
这个项目的独特之处是 LUMI 的情感连续性设计 - 不像传统 AI，LUMI 会：

记住用户的历史互动
根据用户态度改变自己的感受
可能拒绝或冷遇不尊重的用户
建立真实的"关系"而非每次重置