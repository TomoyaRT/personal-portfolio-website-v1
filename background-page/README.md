# BackgroundPage - 流動黑色背景效果

這是一個從 giats-portfolio 項目精確遷移的「流動黑色背景」動態效果的獨立 Next.js 項目。

## 📋 項目說明

本項目專注於展示使用 WebGL 和 Shader 技術實現的流動黑色背景動態效果。該效果利用 Perlin 噪聲算法和自定義著色器創建了平滑、持續流動的視覺體驗。

### 核心功能

- **首頁展示區域**：純白色背景，中央方形區域（500x500px）展示流動黑色背景效果
- **Footer 組件**：將流動黑色背景效果作為 Footer 的背景層，並包含基本文字內容
- **響應式設計**：支援桌面和移動設備的自適應顯示

## 🛠 技術棧

- **框架**：Next.js 16+（使用 App Router + Turbopack）
- **核心庫**：React 19
- **3D 渲染**：Three.js + @react-three/fiber 9
- **套件管理器**：pnpm
- **樣式**：SCSS Modules
- **語言**：JavaScript / TypeScript

## 📦 核心依賴

```json
{
  "@react-three/fiber": "^9.0.0",
  "next": "^16.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "three": "^0.171.0"
}
```

### 版本說明

本項目使用最新穩定版本的核心依賴：
- **React 19**：最新的 React 版本，支援更好的性能和新特性
- **@react-three/fiber 9**：完全支援 React 19 的 Three.js React 渲染器
- **Next.js 16**：使用 Turbopack 作為默認打包工具，提供更快的構建速度

## 🚀 安裝與運行

### 前置要求

- Node.js 18.17 或更高版本
- pnpm 8.0 或更高版本

### 安裝步驟

1. 安裝依賴：

```bash
pnpm install
```

2. 啟動開發伺服器：

```bash
pnpm dev
```

3. 在瀏覽器中開啟 [http://localhost:3000](http://localhost:3000) 查看結果

### 其他指令

```bash
# 構建生產版本
pnpm build

# 啟動生產伺服器
pnpm start

# 執行 ESLint 檢查
pnpm lint
```

## 📁 項目結構

```
background-page/
├── src/
│   ├── app/                    # Next.js App Router 頁面
│   │   ├── page.jsx           # 首頁
│   │   ├── page.module.scss   # 首頁樣式
│   │   ├── layout.jsx         # 根佈局
│   │   └── globals.css        # 全域樣式
│   ├── canvas/                # Canvas 相關組件（獨立資料夾）
│   │   └── background/
│   │       ├── Background.jsx # 背景效果主組件
│   │       └── Index.jsx      # Canvas 容器
│   ├── shaders/               # Shader 檔案（獨立資料夾）
│   │   └── background/
│   │       ├── fragmentShader.js  # 片段著色器
│   │       └── vertexShader.js    # 頂點著色器
│   ├── components/            # React 組件
│   │   ├── Footer.jsx         # Footer 組件
│   │   └── Footer.module.scss # Footer 樣式
│   └── styles/                # 其他樣式檔案
├── package.json               # 專案配置
├── next.config.mjs            # Next.js 配置
├── tsconfig.json              # TypeScript 配置
└── README.md                  # 專案文檔（本檔案）
```

## 🎨 技術實現

### Shader 技術

- **Perlin 噪聲算法**：使用 Stefan Gustavson 的 Classic Perlin 2D Noise 實現流動效果
- **片段著色器**：處理顏色漸變、線條效果和動態流動
- **頂點著色器**：處理基礎的頂點變換

### 動畫系統

- 使用 `useFrame` hook 實現每幀更新
- 自動調整 `uOffsetX` 和 `uOffsetY` 參數創造流動效果
- 響應式窗口尺寸調整

### 顏色配置

預設使用三種深色調色：
- uColor1: RGB(63, 63, 63)
- uColor2: RGB(38, 38, 38)
- uColor3: RGB(9, 5, 12)

## ⚙️ Next.js 配置

### Turbopack 支援

本項目使用 Next.js 16 的預設打包工具 Turbopack，提供更快的開發體驗：

```javascript
const nextConfig = {
  reactStrictMode: false,
  turbopack: {}, // Turbopack 配置
};
```

### 其他配置

- **路徑別名**：`@/*` 指向 `./src/*`
- **Shader 檔案**：Shader 代碼以 JavaScript 字符串形式導出，無需額外的 loader
- **動態導入**：Three.js Canvas 組件使用 `dynamic import` 配合 `ssr: false` 避免 SSR 錯誤

## 📝 授權

本項目僅用於技術展示和學習目的。原始效果來自 giats-portfolio 項目。

## 🔗 相關資源

- [Next.js 文檔](https://nextjs.org/docs)
- [React Three Fiber 文檔](https://docs.pmnd.rs/react-three-fiber)
- [Three.js 文檔](https://threejs.org/docs)
- [GLSL 語法參考](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)

---

**建立日期**：2025-01-07
**最後更新**：2025-01-07
**Next.js 版本**：16.1.1
**React 版本**：19.2.3
**@react-three/fiber 版本**：9.5.0
