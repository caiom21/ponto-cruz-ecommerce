@echo off
echo ===== VERIFICAÇÃO DE ARQUIVOS =====
echo.

echo Verificando estrutura de pastas...
if exist "frontend\public\index.html" (
    echo ✅ frontend\public\index.html - OK
) else (
    echo ❌ frontend\public\index.html - FALTANDO
)

if exist "frontend\src\App.tsx" (
    echo ✅ frontend\src\App.tsx - OK
) else (
    echo ❌ frontend\src\App.tsx - FALTANDO
)

if exist "backend\server.js" (
    echo ✅ backend\server.js - OK
) else (
    echo ❌ backend\server.js - FALTANDO
)

echo.
echo Verificando dependências...
if exist "frontend\node_modules" (
    echo ✅ frontend\node_modules - OK
) else (
    echo ❌ frontend\node_modules - FALTANDO (execute: cd frontend && npm install)
)

if exist "backend\node_modules" (
    echo ✅ backend\node_modules - OK
) else (
    echo ❌ backend\node_modules - FALTANDO (execute: cd backend && npm install)
)

echo.
echo Verificando portas...
netstat -an | findstr ":3000" >nul && echo ✅ Porta 3000 (React) - EM USO || echo ❌ Porta 3000 - LIVRE
netstat -an | findstr ":5000" >nul && echo ✅ Porta 5000 (Node) - EM USO || echo ❌ Porta 5000 - LIVRE

echo.
echo Seu IP local:
ipconfig | findstr "IPv4"
echo.
pause