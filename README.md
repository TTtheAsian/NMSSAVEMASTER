# NMS Save Master - No Man's Sky 存檔管理大師

基於 Web 的 No Man's Sky 存檔編輯器，支援讀取、反混淆、編輯及匯出 NMS 存檔。

## 需求

- [Node.js](https://nodejs.org/) v18 以上

## 快速啟動

下載（或 clone）本倉庫後，依照你的作業系統執行對應的啟動檔：

### Windows

雙擊 `start.bat`

### macOS / Linux

```bash
./start.sh
```

啟動後會自動安裝依賴並開啟瀏覽器。

## 其他指令

```bash
npm run dev       # 啟動開發伺服器
npm run build     # 建構正式版本
npm run preview   # 預覽建構結果
```

## 專案結構

```
nomanssave/db/     NMS 存檔欄位對照表（jsonmap.txt / jsonmapac.txt）
src/
  components/      UI 元件
  data/            資料解析與欄位映射
  pages/           頁面
  store/           狀態管理
  types/           TypeScript 型別定義
```
