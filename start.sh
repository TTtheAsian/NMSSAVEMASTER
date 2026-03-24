#!/usr/bin/env bash
set -e

# Navigate to script directory
cd "$(dirname "$0")"

echo ""
echo "  ╔══════════════════════════════════════════╗"
echo "  ║     NMS Save Master v1.0                 ║"
echo "  ║     No Man's Sky 存檔管理大師            ║"
echo "  ╚══════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "  [!] 未偵測到 Node.js"
    echo ""
    echo "  NMS Save Master 需要 Node.js 才能運行。"
    echo ""

    # Try to auto-install based on OS
    if command -v brew &> /dev/null; then
        echo "  [*] 透過 Homebrew 安裝 Node.js..."
        brew install node
    elif command -v apt-get &> /dev/null; then
        echo "  [*] 透過 apt 安裝 Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif command -v dnf &> /dev/null; then
        echo "  [*] 透過 dnf 安裝 Node.js..."
        sudo dnf install -y nodejs
    else
        echo "  請手動安裝 Node.js: https://nodejs.org/"
        echo "  安裝完成後重新執行 ./start.sh"
        exit 1
    fi

    # Verify installation
    if ! command -v node &> /dev/null; then
        echo "  [!] 安裝失敗，請手動安裝 Node.js"
        echo "  下載: https://nodejs.org/"
        exit 1
    fi

    echo "  [OK] Node.js 安裝完成！"
fi

NODE_VER=$(node -v)
echo "  [OK] Node.js $NODE_VER"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "  [..] 首次啟動，正在安裝依賴套件..."
    npm install --loglevel=error
    echo "  [OK] 依賴安裝完成"
else
    echo "  [OK] 依賴套件已就緒"
fi

echo ""
echo "  [>>] 正在啟動 NMS Save Master..."
echo "  [>>] 瀏覽器將自動開啟"
echo "  [>>] 按 Ctrl+C 即可停止伺服器"
echo ""
echo "  ────────────────────────────────────────────"
echo ""

# Start dev server and open browser
npx vite --open
