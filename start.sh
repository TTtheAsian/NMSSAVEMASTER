#!/usr/bin/env bash
set -e

echo "============================================"
echo "  NMS Save Master - 存檔管理大師"
echo "============================================"
echo ""

# Navigate to script directory
cd "$(dirname "$0")"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[錯誤] 未偵測到 Node.js，請先安裝 Node.js"
    echo "下載位址: https://nodejs.org/"
    echo ""
    exit 1
fi

NODE_VER=$(node -v)
echo "[✓] Node.js $NODE_VER"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo ""
    echo "[*] 首次啟動，正在安裝依賴套件..."
    npm install
    echo "[✓] 依賴安裝完成"
else
    echo "[✓] 依賴套件已就緒"
fi

echo ""
echo "[*] 正在啟動 NMS Save Master..."
echo "[*] 啟動後將自動開啟瀏覽器"
echo "[*] 按 Ctrl+C 即可關閉伺服器"
echo ""

# Start dev server and open browser
npx vite --open
