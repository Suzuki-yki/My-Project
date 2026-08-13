# Web3 功能实现细节与测试指南

**文档日期**：2026-05-26  
**AI 3 执行**：Web3 Frontend Engineer  
**项目**：Persona Space MVP Phase 1  

---

## 📋 实现清单

### ✅ 已完成的功能

#### 1. 钱包连接系统
- [x] MetaMask 连接支持
- [x] WalletConnect v2 集成
- [x] Generic 钱包（注入式）支持
- [x] 连接器选择 UI
- [x] 断开连接功能
- [x] 地址显示和格式化

#### 2. 账户信息查询
- [x] 实时地址获取
- [x] 连接状态检测
- [x] ETH 余额查询
- [x] 链 ID 识别
- [x] 网络名称映射

#### 3. UI 组件
- [x] WalletButton 重构
- [x] SoulPanel 数据显示
- [x] 错误状态处理
- [x] 加载状态提示
- [x] 响应式设计

#### 4. 开发基础
- [x] wagmi 配置
- [x] React Query 设置
- [x] RainbowKit 集成
- [x] TypeScript 类型
- [x] Tailwind 样式

---

## 🧪 测试指南

### 环境设置

#### 前置条件
```bash
# 1. 安装 Node.js (v18+)
node --version

# 2. 安装项目依赖
npm install

# 3. 验证依赖
npm list wagmi viem @tanstack/react-query

# 4. 安装 MetaMask 浏览器扩展
# https://metamask.io/download/
```

#### Sepolia 测试网配置

**步骤 1：在 MetaMask 中添加 Sepolia**

```
打开 MetaMask → 网络选择 → 添加网络
  名称：Sepolia Testnet
  RPC URL：https://sepolia.infura.io/v3/YOUR_PROJECT_ID
  链 ID：11155111
  符号：ETH
  区块链浏览器：https://sepolia.etherscan.io
```

或者使用 Chainlist：https://chainlist.org?search=sepolia

**步骤 2：获取测试 ETH**

访问 Sepolia Faucet：
- [Sepolia Faucet](https://sepoliafaucet.com) - 官方
- [Alchemy Faucet](https://www.alchemy.com/faucets/ethereum-sepolia) - Alchemy 提供
- [Infura Faucet](https://www.infura.io/faucet/sepolia) - Infura 提供

粘贴您的钱包地址，获取 0.5-1 ETH

**步骤 3：验证余额**

```
MetaMask → 选择 Sepolia 网络 → 查看余额
应该显示：X.XX ETH (Sepolia)
```

---

### 测试场景

#### 测试场景 1：钱包连接

```
测试标题：用户首次连接 MetaMask 钱包
前提条件：
  - MetaMask 已安装
  - Sepolia 网络已添加
  - 账户有测试 ETH (>= 0.1)

测试步骤：
  1. 打开应用 → localhost:5173
  2. 点击 "Enter Space" 按钮
  3. 在下拉菜单中选择 "MetaMask"
  4. 在 MetaMask 弹窗中点击 "连接"
  5. 返回应用查看结果

预期结果：
  ✅ MetaMask 连接窗口弹出
  ✅ "Enter Space" 按钮变为显示地址 (0x1234...5678)
  ✅ SoulPanel 显示：
     - Wallet: 完整地址
     - Balance: X.XX ETH
     - Network: Sepolia Testnet
     - Collection: NFT 数量
  ✅ 浏览器控制台无错误信息

测试用例 ID：TC-001-CONNECT
优先级：🔴 Critical
状态：Ready
```

#### 测试场景 2：钱包断开连接

```
测试标题：用户断开连接
前提条件：
  - 已连接 MetaMask 钱包
  - "Enter Space" 按钮显示地址

测试步骤：
  1. 点击 "Enter Space" 按钮（显示地址的版本）
  2. 在下拉菜单中点击 "Disconnect"
  3. 查看按钮状态

预期结果：
  ✅ 按钮恢复为 "Enter Space"
  ✅ SoulPanel 显示提示：
     "Connect wallet to see your Persona data"
  ✅ 浏览器控制台无错误

测试用例 ID：TC-002-DISCONNECT
优先级：🔴 Critical
状态：Ready
```

#### 测试场景 3：多钱包切换

```
测试标题：用户在不同钱包之间切换
前提条件：
  - 已安装 MetaMask + 一个移动钱包（如 Trust Wallet）
  - 两个钱包都添加了 Sepolia 网络

测试步骤：
  1. 连接 MetaMask
  2. 查看 SoulPanel 显示的地址和余额
  3. 断开连接
  4. 点击 "Enter Space" → 选择 WalletConnect
  5. 用手机扫描二维码或选择移动钱包
  6. 查看新钱包的地址和余额

预期结果：
  ✅ 地址和余额正确更新
  ✅ 无重复连接或状态混乱
  ✅ 切换流畅无卡顿

测试用例 ID：TC-003-MULTI-WALLET
优先级：🟡 High
状态：Ready
```

#### 测试场景 4：余额更新

```
测试标题：实时余额显示和更新
前提条件：
  - 已连接钱包
  - 钱包有余额
  - 已记录初始余额

测试步骤：
  1. 记录 SoulPanel 中显示的余额
  2. 从其他钱包向测试钱包发送 0.1 ETH
  3. 等待交易确认（Sepolia 通常 12-30 秒）
  4. 观察应用中的余额是否更新

预期结果：
  ✅ 新余额在 1 分钟内显示
  ✅ 如果未实时更新，页面刷新后显示正确余额
  ✅ 浏览器控制台无错误

测试用例 ID：TC-004-BALANCE-UPDATE
优先级：🟡 High
状态：Ready
```

#### 测试场景 5：网络切换

```
测试标题：用户切换到不同网络
前提条件：
  - 已连接钱包
  - MetaMask 中已添加多个网络（Sepolia + Mainnet）

测试步骤：
  1. 在 MetaMask 中切换到 Ethereum Mainnet
  2. 观察应用中的 Network 字段
  3. 再切换回 Sepolia
  4. 确认网络名称更新

预期结果：
  ✅ Network 字段显示 "Ethereum Mainnet" 或 "Sepolia Testnet"
  ✅ 网络切换后立即更新（通常 < 1s）
  ✅ 余额重新加载

测试用例 ID：TC-005-NETWORK-SWITCH
优先级：🟡 High
状态：Ready
```

#### 测试场景 6：响应式设计

```
测试标题：验证移动端响应式设计
前提条件：
  - 应用已连接钱包

测试步骤：
  1. 在桌面浏览器中打开应用
  2. 打开开发者工具 (F12)
  3. 切换到移动设备模式 (Ctrl+Shift+M 或 Cmd+Shift+M)
  4. 测试不同屏幕尺寸：
     - iPhone 12 (390x844)
     - iPad (768x1024)
     - Android (360x800)
  5. 测试交互：
     - 点击 hamburger menu
     - 连接/断开钱包
     - 查看 SoulPanel

预期结果：
  ✅ 所有元素可见，无水平滚动
  ✅ 菜单正确展开/折叠
  ✅ 文本可读，字体大小合适
  ✅ 按钮可点击，尺寸合理（最小 44x44px）
  ✅ 无重叠或错位

测试用例 ID：TC-006-RESPONSIVE
优先级：🟡 High
状态：Ready
```

#### 测试场景 7：错误处理

```
测试标题：处理网络错误和异常情况
前提条件：
  - 应用已运行

测试步骤：
  1. 断开网络连接（或限制网络）
  2. 尝试连接钱包 → 观察错误处理
  3. 恢复网络连接
  4. 检查应用是否恢复正常

预期结果：
  ✅ 显示合理的错误提示或加载状态
  ✅ 不会导致应用崩溃
  ✅ 网络恢复后可重试

测试用例 ID：TC-007-ERROR-HANDLING
优先级：🟡 High
状态：Ready
```

---

### 自动化测试建议

#### 单元测试示例
```typescript
// tests/hooks/useUserInfo.test.ts
import { renderHook } from '@testing-library/react'
import { useUserInfo } from '../../../src/hooks/useUserInfo'
import { useAccount, useBalance, useChainId } from 'wagmi'

jest.mock('wagmi')

describe('useUserInfo', () => {
  it('should return connected user info', () => {
    ;(useAccount as jest.Mock).mockReturnValue({
      address: '0x1234567890123456789012345678901234567890',
      isConnected: true,
    })
    ;(useBalance as jest.Mock).mockReturnValue({
      data: { formatted: '2.5', symbol: 'ETH' },
    })
    ;(useChainId as jest.Mock).mockReturnValue(11155111)

    const { result } = renderHook(() => useUserInfo())

    expect(result.current.address).toBe('0x1234567890123456789012345678901234567890')
    expect(result.current.balance).toBe('2.5')
    expect(result.current.isConnected).toBe(true)
  })
})
```

#### 集成测试示例
```typescript
// tests/integration/wallet-connection.test.ts
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../../src/App'

describe('Wallet Connection Integration', () => {
  it('should connect wallet and display user info', async () => {
    render(<App />)
    
    const enterButton = screen.getByText('Enter Space')
    await userEvent.click(enterButton)
    
    const metaMaskButton = screen.getByText('MetaMask')
    await userEvent.click(metaMaskButton)
    
    await waitFor(() => {
      expect(screen.getByText(/0x\w{4}\.\.\.\w{4}/).toBeInTheDocument()
    })
  })
})
```

---

## 🐛 故障排查

### 问题 1：连接失败

**症状**：
- 点击 "Enter Space" 后没有显示连接器
- MetaMask 弹窗不出现

**可能原因**：
- [ ] MetaMask 未安装或未启用
- [ ] wagmi 配置不正确
- [ ] 浏览器不支持（使用 Chrome/Firefox/Safari）

**解决步骤**：
1. 检查 MetaMask 是否安装和启用
   ```javascript
   // 浏览器控制台运行
   console.log(window.ethereum)
   ```
2. 检查浏览器控制台是否有错误
   ```javascript
   // 查找 "Error" 或 "Warning" 信息
   ```
3. 查看 wagmi 配置
   ```typescript
   // src/wagmi.ts - 确保 connectors 数组非空
   ```
4. 尝试页面刷新（硬刷新：Ctrl+Shift+R）

---

### 问题 2：余额显示为 0

**症状**：
- 钱包连接成功，但 Balance 显示 "0 ETH"

**可能原因**：
- [ ] 选择的是 Mainnet，但通过 Sepolia Faucet 获取的是测试 ETH
- [ ] 余额查询还在加载中
- [ ] RPC 节点响应缓慢

**解决步骤**：
1. 确认 MetaMask 中选择的是 Sepolia 网络
   ```
   MetaMask 右上角应该显示 "Sepolia Testnet"
   ```
2. 确认钱包中有测试 ETH
   ```
   MetaMask → 点击钱包地址 → 复制
   在 Etherscan (Sepolia) 中查询该地址：
   https://sepolia.etherscan.io/address/0x...
   ```
3. 等待数据加载（通常 2-5 秒）
4. 尝试刷新页面

---

### 问题 3：WalletConnect 无法扫描

**症状**：
- 点击 WalletConnect 后没有 QR 码
- 或 QR 码无效

**可能原因**：
- [ ] WalletConnect Project ID 未设置
- [ ] 二维码生成失败

**解决步骤**：
1. 在 `src/wagmi.ts` 中设置 WalletConnect Project ID
   ```typescript
   const projectId = process.env.VITE_WALLETCONNECT_PROJECT_ID!
   ```
2. 创建 `.env` 文件
   ```
   VITE_WALLETCONNECT_PROJECT_ID=your_actual_project_id_here
   ```
3. 从 https://cloud.walletconnect.com 获取 Project ID
4. 重启开发服务器

---

### 问题 4：样式混乱或不显示

**症状**：
- 页面显示为纯白或纯黑
- 按钮看不清或位置错乱

**可能原因**：
- [ ] Tailwind CSS 未正确编译
- [ ] 字体未加载

**解决步骤**：
1. 检查 `tailwind.config.js` 是否存在
2. 检查 `index.html` 中是否有 Tailwind 指令
3. 清除缓存并重建
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```
4. 检查浏览器控制台的 CSS 警告

---

### 问题 5：TypeScript 类型错误

**症状**：
- 编译时出现类型错误
- "Property 'VITE_WALLETCONNECT_PROJECT_ID' does not exist"

**可能原因**：
- [ ] 环境变量类型定义缺失
- [ ] TypeScript 配置不完整

**解决步骤**：
1. 创建 `src/vite-env.d.ts`（应该已存在）
   ```typescript
   /// <reference types="vite/client" />
   interface ImportMetaEnv {
     readonly VITE_WALLETCONNECT_PROJECT_ID: string
   }
   ```
2. 确保 `.env` 文件存在且包含正确的变量
3. 重启 TypeScript 服务器（VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"）

---

## 📊 性能基准

运行以下命令检查性能：

```bash
# 1. 构建大小
npm run build
# 检查 dist/ 文件大小

# 2. 启动时间
npm run dev
# 测量从启动到第一次交互的时间

# 3. 运行时性能
# 在浏览器开发者工具中：
# Performance → Start recording → Connect wallet → Stop
# 观察 FCP、LCP、TTI 指标
```

**目标基准**：
- Bundle size: < 500KB (gzipped)
- FCP (First Contentful Paint): < 2s
- 钱包连接: < 3s
- 数据查询: < 1s

---

## 📝 日志输出示例

### 成功场景
```
[wagmi] Account connected: 0x1234567890123456789012345678901234567890
[useUserInfo] Fetching balance for: 0x1234...5678
[useUserInfo] Balance: 2.5 ETH on Sepolia Testnet
[SoulPanel] Rendering with personaData: { level: 1, tags: [...] }
```

### 错误场景
```
[wagmi] Connection failed: User rejected the request
[useUserInfo] Balance fetch error: Network request failed
[WalletButton] Invalid connector: undefined
```

---

## ✅ 交付检查清单

- [ ] 钱包连接正常（MetaMask + WalletConnect）
- [ ] 地址正确显示和更新
- [ ] 余额查询无错误
- [ ] 链信息准确
- [ ] SoulPanel 实时更新
- [ ] 响应式设计生效
- [ ] 无浏览器控制台错误
- [ ] TypeScript 类型检查通过
- [ ] 文档完整且清晰

---

**测试环境**：
- 浏览器：Chrome 120+, Firefox 121+, Safari 17+
- 网络：Sepolia Testnet (https://sepolia.infura.io)
- 钱包：MetaMask 10+, WalletConnect v2

**最后更新**：2026-05-26
