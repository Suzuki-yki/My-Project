# Persona Space - Web3 技术架构

**文档日期**：2026-05-26  
**版本**：1.0  

---

## 🏗️ 系统架构图

```
┌─────────────────────────────────────────────────────────────┐
│                    用户浏览器                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              React + TypeScript App                    │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │                                                        │ │
│  │  ┌─ WagmiProvider (Web3 核心)                         │ │
│  │  │  ├─ QueryClientProvider (数据缓存)               │ │
│  │  │  │  ├─ RainbowKitProvider (UI 层)                │ │
│  │  │  │  │  └─ AppContent                            │ │
│  │  │  │  │     ├─ Header                            │ │
│  │  │  │  │     │  └─ WalletButton                   │ │
│  │  │  │  │     ├─ AICompanion                       │ │
│  │  │  │  │     ├─ PersonaRoom                       │ │
│  │  │  │  │     └─ SoulPanel                         │ │
│  │  │  │  │        ├─ useUserInfo()                  │ │
│  │  │  │  │        └─ useNFTs()                      │ │
│  │  │  │  │                                          │ │
│  │  │  │  └─ [缓存和状态共享]                        │ │
│  │  │  │                                             │ │
│  │  │  └─ [钱包连接和签名]                           │ │
│  │  │                                               │ │
│  │  └─ [Web3 hooks 和状态管理]                       │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│         │                           │                 │
│         ▼                           ▼                 │
│   ┌──────────────┐         ┌──────────────┐         │
│   │ 钱包扩展     │         │ 浏览器存储   │         │
│   │ (MetaMask)   │         │ (localStorage)         │
│   └──────────────┘         └──────────────┘         │
└─────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
┌──────────────────┐        ┌──────────────────────┐
│  Ethereum RPC    │        │  WalletConnect v2    │
│  (Mainnet/       │        │  (手机钱包/多链)     │
│   Sepolia)       │        └──────────────────────┘
└──────────────────┘
         │
         ▼
   ┌────────────────────┐
   │  区块链数据        │
   ├────────────────────┤
   │ • 账户余额         │
   │ • 交易历史         │
   │ • NFT 权限         │
   └────────────────────┘
```

---

## 🔄 数据流向

### 用户连接钱包流程

```
1. 用户点击 "Enter Space"
   ↓
2. WalletButton 显示可用连接器列表
   ├─ MetaMask（浏览器扩展）
   ├─ WalletConnect（QR 码）
   └─ Generic 钱包
   ↓
3. 用户选择钱包
   ↓
4. connect() 触发钱包交互
   ├─ 请求用户账户权限
   └─ 获取签名（可选）
   ↓
5. wagmi 更新状态
   ├─ address 设置
   ├─ isConnected = true
   └─ chainId 确定
   ↓
6. Hooks 自动触发查询
   ├─ useAccount() → address 变化
   ├─ useBalance() → 开始获取余额
   ├─ useChainId() → 网络信息
   └─ useQuery() → Persona & NFT 数据
   ↓
7. UI 自动更新
   ├─ WalletButton 显示地址
   ├─ SoulPanel 显示钱包信息
   └─ PersonaRoom 显示 NFT（如可用）
```

### 实时数据同步

```
useUserInfo() Hook
├─ useAccount()
│  └─ wagmi 监听 account 变化
│     └─ [每次网络请求时更新]
├─ useBalance()
│  └─ 订阅余额变化
│     └─ [Block 生成时更新，当前每 30s]
├─ useChainId()
│  └─ 监听链切换
│     └─ [用户手动切换网络时更新]
└─ useQuery()
   └─ React Query 缓存和重新验证
      └─ [可配置 staleTime 和 gcTime]
```

---

## 📦 依赖关系图

```
外部服务
├─ MetaMask（浏览器扩展）
├─ WalletConnect（移动钱包）
├─ Ethereum RPC（infura/alchemy）
└─ NFT API（待集成）

wagmi v3
├─ 连接器管理
├─ 账户状态
├─ 链状态
└─ 合约交互

viem v2
├─ 低级 RPC 调用
└─ 类型安全

React Query v5
├─ 数据缓存
├─ 自动重新验证
└─ 后台同步

RainbowKit
├─ 连接器 UI
└─ 钱包样式
```

---

## 🎯 核心模块说明

### Module 1: Wallet Connection (`WalletButton.tsx`)

**职责**：
- 显示钱包连接状态
- 管理连接器选择
- 处理 connect/disconnect

**关键 Hooks**：
```typescript
useAccount()      // 获取当前账户
useConnect()      // 连接方法和可用连接器
useDisconnect()   // 断开连接
```

**UI 流程**：
```
未连接：点击 "Enter Space" → 显示连接器 → 选择 → 连接
已连接：显示地址 → 点击 → 显示菜单 → Disconnect
```

---

### Module 2: User Info Hook (`useUserInfo.ts`)

**职责**：
- 聚合用户钱包信息
- 查询链信息
- 管理 Persona 数据

**返回值**：
```typescript
{
  address: `0x${string}` | undefined    // 钱包地址
  isConnected: boolean                  // 连接状态
  balance: string                       // ETH 数量
  balanceSymbol: string                 // "ETH"
  chainInfo: ChainInfo                  // 网络信息
  personaData: PersonaData | undefined  // Persona 数据
}
```

**缓存策略**：
- Balance：实时更新（30s）
- Persona：5 分钟过期
- Chain Info：实时

---

### Module 3: NFT Reader (`useNFTs.ts`)

**当前状态**：占位实现，返回空数组

**未来集成方案**：

```typescript
// 方案 A: Alchemy SDK（推荐）
const alchemy = new Alchemy({
  apiKey: process.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
})
const nfts = await alchemy.nft.getNftsForOwner(address)

// 方案 B: Alchemy API（HTTP）
const response = await fetch(
  `/api/nfts?owner=${address}`,
  { headers: { 'X-Alchemy-Token': API_KEY } }
)

// 方案 C: Opensea API
const response = await fetch(
  `https://api.opensea.io/api/v2/collection/assets?wallet_address=${address}`,
)
```

---

### Module 4: SoulPanel (`SoulPanel.tsx`)

**职责**：
- 实时显示钱包数据
- Persona 信息展示
- NFT 集合统计

**数据源**：
```
useUserInfo() → 余额、网络、Persona
useNFTs()    → NFT 计数
```

**UI 组件**：
```
┌─────────────────────────┐
│   Soul Panel            │
├─────────────────────────┤
│ 📍 Wallet               │
│    0x1234...5678        │
├─────────────────────────┤
│ 💰 Balance              │
│    2.5 ETH              │
├─────────────────────────┤
│ 🌐 Network              │
│    Sepolia Testnet      │
├─────────────────────────┤
│ 🖼️ Collection           │
│    15 NFTs              │
├─────────────────────────┤
│ 🎭 Persona Level        │
│    5                    │
├─────────────────────────┤
│ 🏷️ Vibes                │
│    [Collector] [Artist] │
└─────────────────────────┘
```

---

## 🔐 安全模型

```
┌──────────────────────────────────────┐
│     Persona Space Frontend           │
│     (只读取公开信息)                 │
└────────────────┬─────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼                         ▼
┌──────────────┐      ┌──────────────────┐
│  钱包        │      │   Blockchain     │
│ (签名/确认)  │      │   (只读)         │
│              │      │                  │
│ MetaMask     │      │ • 余额           │
│ WalletConnect│      │ • NFT 权限       │
│ Trust...     │      │ • 交易历史       │
└──────────────┘      └──────────────────┘

关键原则：
✅ 私钥永远不进入前端
✅ 签名由钱包 APP 处理
✅ 前端仅显示公开信息
✅ 所有交易需用户确认
```

---

## 🧩 组件通信

```
WalletButton (顶栏)
    │
    ├─ emit: connect / disconnect
    │
    └─ 触发 useAccount 更新

SoulPanel (右侧)
    │
    ├─ subscribe: account change
    ├─ read: useUserInfo()
    └─ display: wallet data

PersonaRoom (中间) → 未来
    │
    ├─ read: useNFTs()
    └─ display: NFT collection

AICompanion (左侧) → 未来
    │
    ├─ observe: user actions
    └─ analyze: persona data
```

---

## 📊 链条支持

| 链 | 主网 | 测试网 | RPC | Status |
|----|------|--------|-----|--------|
| Ethereum | ✅ 1 | ✅ 11155111 (Sepolia) | Infura | ✅ 已配置 |
| Polygon | ⏳ | ⏳ | - | 后续 |
| Arbitrum | ⏳ | ⏳ | - | 后续 |
| Optimism | ⏳ | ⏳ | - | 后续 |
| Base | ⏳ | ⏳ | - | 后续 |

**如何添加新链**：
```typescript
// wagmi.ts
import { polygon, arbitrum } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
})
```

---

## 🚀 性能优化

### 已实现
- ✅ React Query 缓存：避免重复请求
- ✅ Lazy 加载：按需查询数据
- ✅ 事件订阅：实时更新无轮询

### 建议优化
- ⏳ WebSocket 订阅：Block 实时同步
- ⏳ 离线模式：缓存数据离线显示
- ⏳ 图片懒加载：NFT 列表优化
- ⏳ 虚拟滚动：大量 NFT 显示

---

## 🧪 测试矩阵

```
Feature               | Unit | Integration | E2E | Status
─────────────────────────────────────────────────────────
钱包连接              |  ✅  |      ✅     | 🔄  | 部分
余额查询              |  ✅  |      ✅     | 🔄  | 部分
链信息                |  ✅  |      ✅     | ✅  | 完成
NFT 读取              |  ⏳  |      ⏳     | ⏳  | 待实现
Persona 算法          |  ⏳  |      ⏳     | ⏳  | 待实现
UI 响应式             |  ✅  |      ✅     | ✅  | 完成
```

---

## 🔄 开发工作流

```
开发 → 测试 → Demo → 生产部署

测试环境：Sepolia
  ├─ 获取测试 ETH
  ├─ 本地 MetaMask 配置
  └─ 完整功能测试

生产环境：Ethereum Mainnet
  ├─ 真实 ETH 交互
  └─ NFT 数据聚合
```

---

## 🎓 学习路径

```
Level 1: 基础 (完成 ✅)
├─ 钱包连接
├─ 地址显示
└─ 链信息

Level 2: 中级 (进行中 🔄)
├─ NFT 读取
├─ Persona 生成
└─ 多链支持

Level 3: 高级 (计划中 ⏳)
├─ Smart Contract 交互
├─ Token 交易
├─ 智能合约部署
└─ DeFi 集成
```

---

**总结**：本架构为 Persona Space 的 Web3 层提供了坚实的基础，支持直观的钱包连接体验和实时的用户数据显示。下一阶段将重点集成 NFT 读取和 Persona 分析算法。
