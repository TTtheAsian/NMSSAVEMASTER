@echo off
chcp 65001 >nul 2>&1
title NMS Save Master - No Man's Sky 存檔管理大師

:: Navigate to script directory
cd /d "%~dp0"

echo.
echo   ╔══════════════════════════════════════════╗
echo   ║     NMS Save Master v1.0                 ║
echo   ║     No Man's Sky 存檔管理大師            ║
echo   ╚══════════════════════════════════════════╝
echo.

:: Check if portable exe exists in release folder
if exist "release\NMS-Save-Master-Portable.exe" (
    echo   [OK] 偵測到已打包的執行檔
    echo   [>>] 正在啟動 NMS Save Master...
    start "" "release\NMS-Save-Master-Portable.exe"
    exit /b 0
)

:: Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo   [!] 未偵測到 Node.js
    echo.
    echo   NMS Save Master 需要 Node.js 才能運行。
    echo   正在嘗試自動下載安裝...
    echo.

    :: Try winget first
    where winget >nul 2>&1
    if %errorlevel% equ 0 (
        echo   [*] 透過 winget 安裝 Node.js...
        winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
        if %errorlevel% equ 0 (
            echo   [OK] Node.js 安裝完成！請關閉此視窗後重新雙擊 start.bat
            pause
            exit /b 0
        )
    )

    echo.
    echo   [!] 無法自動安裝 Node.js
    echo   請手動下載安裝: https://nodejs.org/
    echo   安裝完成後重新雙擊 start.bat 即可
    echo.
    pause
    exit /b 1
)

:: Show Node.js version
for /f "tokens=*" %%i in ('node -v') do set NODE_VER=%%i
echo   [OK] Node.js %NODE_VER%

:: Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo   [..] 首次啟動，正在安裝依賴套件...
    call npm install --loglevel=error
    if %errorlevel% neq 0 (
        echo   [!] 依賴安裝失敗，請檢查網路連線
        pause
        exit /b 1
    )
    echo   [OK] 依賴安裝完成
) else (
    echo   [OK] 依賴套件已就緒
)

echo.
echo   請選擇啟動方式:
echo   [1] 桌面應用程式 (Electron) - 推薦
echo   [2] 瀏覽器模式 (localhost)
echo   [3] 打包成執行檔 (.exe)
echo.
set /p choice="  請輸入選項 (1/2/3): "

if "%choice%"=="2" (
    echo.
    echo   [>>] 正在啟動瀏覽器模式...
    echo   [>>] 瀏覽器將自動開啟
    echo   [>>] 關閉此視窗即可停止伺服器
    echo.
    call npx vite --open
) else if "%choice%"=="3" (
    echo.
    echo   [>>] 正在打包成執行檔...
    echo   [>>] 這可能需要幾分鐘...
    echo.
    call npm run build:win
    if %errorlevel% equ 0 (
        echo.
        echo   [OK] 打包完成！執行檔在 release\ 資料夾中
        explorer release
    ) else (
        echo   [!] 打包失敗
    )
    pause
) else (
    echo.
    echo   [>>] 正在啟動桌面應用程式...
    echo.
    set ELECTRON=true
    call npx vite
)
