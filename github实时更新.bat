@echo off
:: 编码设置为UTF-8，防止中文提示变成乱码
chcp 65001 >nul
cls

echo ===================================================
echo        🚀 欢迎使用 GitHub 极速手动上传脚本 🚀
echo ===================================================
echo.

:: 1. 自动把当前目录所有改动加到暂存区
echo [1/3] 正在扫描并暂存本地修改 (git add)...
git add .
if %errorlevel% neq 0 goto ERROR
echo ✅ 暂存成功！
echo.

:: 2. 自动生成一个带有当前时间的提交日志，免去手动输入的麻烦
set "commit_msg=🔥 自动更新于 %date% %time%"
echo [2/3] 正在本地打包并生成日志 (git commit)...
git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo ℹ️ 提示：本地没有检测到任何新的修改，无需打包。
) else (
    echo ✅ 本地打包成功！
)
echo.

:: 3. 临门一脚，推送到 GitHub
echo [3/3] 正在全力以赴推送到 GitHub (git push)...
echo ---------------------------------------------------
git push origin main
if %errorlevel% neq 0 goto ERROR
echo ---------------------------------------------------
echo.
echo 🎉🎉🎉【大功告成】代码已成功同步到 GitHub 仓库！🎉🎉🎉
goto END

:ERROR
echo.
echo ❌【哎呀，出错啦！】
echo 提示：请检查您的网络（是否需要开梯子）或 GitHub 登录状态。
echo ---------------------------------------------------

:END
echo.
echo 请按任意键关闭此窗口...
pause >nul