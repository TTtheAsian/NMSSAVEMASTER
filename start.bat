@echo off
chcp 65001 >nul 2>&1
title NMS Save Master - No Man's Sky 存檔管理大師

echo ============================================
echo   NMS Save Master - 存檔管理大師
echo ============================================
echo.

:: Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [錯誤] 未偵測到 Node.js，請先安裝 Node.js
    echo 下載位址: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Show Node.js version
for /f "tokens=*" %%i in ('node -v') do set NODE_VER=%%i
echo [✓] Node.js %NODE_VER%

:: Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo.
    echo [*] 首次啟動，正在安裝依賴套件...
    call npm install
    if %errorlevel% neq 0 (
        echo [錯誤] 依賴安裝失敗
        pause
        exit /b 1
    )
    echo [✓] 依賴安裝完成
) else (
    echo [✓] 依賴套件已就緒
)

echo.
echo [*] 正在啟動 NMS Save Master...
echo [*] 啟動後將自動開啟瀏覽器
echo [*] 按 Ctrl+C 即可關閉伺服器
echo.

:: Start dev server and open browser
call npx vite --open
