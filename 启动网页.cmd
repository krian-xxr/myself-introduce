@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 个人作品集 - 本地预览（关闭本窗口即停止）

echo.
echo   个人作品集 · 本地预览
echo   地址：http://localhost:5180/
echo   关闭这个窗口就会停止服务；下次双击本文件即可重新打开。
echo.

rem 等服务器起来再自动开浏览器
start "" /min cmd /c "timeout /t 6 /nobreak >nul & start "" http://localhost:5180/"

where npm >nul 2>nul
if not errorlevel 1 (
  call npm run dev
  goto :end
)

where node >nul 2>nul
if not errorlevel 1 (
  node "node_modules\vite\bin\vite.js"
  goto :end
)

set "DSH_NODE=%USERPROFILE%\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe"
if exist "%DSH_NODE%" (
  "%DSH_NODE%" "node_modules\vite\bin\vite.js"
  goto :end
)

echo   找不到 node / npm，请先安装 Node.js（https://nodejs.org）。
pause

:end
