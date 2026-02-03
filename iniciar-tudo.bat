@echo off
chcp 65001 >nul
echo ============================================
echo  🚀 INICIANDO E-COMMERCE DE BORDADOS
echo ============================================
echo.

REM Obter IP da máquina
echo Obtendo seu IP local...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"Endereço IPv4"') do (
    set IP=%%a
    goto :ipfound
)
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set IP=%%a
    goto :ipfound
)

:ipfound
set IP=%IP:~1%
echo ✅ Seu IP Local: %IP%
echo.

REM Configurar arquivos com o IP correto
echo Atualizando arquivos de configuração...
powershell -Command "(Get-Content 'backend\server.js') -replace 'SEU_IP_AQUI', '%IP%' | Set-Content 'backend\server.js'"
powershell -Command "(Get-Content 'frontend\.env') -replace 'SEU_IP_AQUI', '%IP%' | Set-Content 'frontend\.env'"

echo 📦 Instalando dependências do Backend...
cd backend
call npm install
cd ..

echo 🖥️ Instalando dependências do Frontend...
cd frontend
call npm install
cd ..

echo.
echo ============================================
echo  ⚡ INICIANDO OS SERVIÇOS
echo ============================================
echo.

REM Iniciar Backend
echo 📦 Iniciando Backend (Node.js)...
start "Backend - Node.js" cmd /k "cd backend && echo Iniciando backend na porta 5000... && node server.js"
timeout /t 5 /nobreak >nul

REM Iniciar Frontend
echo 🖥️ Iniciando Frontend (React)...
start "Frontend - React" cmd /k "cd frontend && echo Iniciando frontend na porta 3000... && npm start"
timeout /t 8 /nobreak >nul

echo.
echo ============================================
echo  ✅ SISTEMA INICIADO COM SUCESSO!
echo ============================================
echo.
echo 📍 URLs PARA ACESSO:
echo.
echo 💻 NESTE COMPUTADOR:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.
echo 📱 EM OUTROS DISPOSITIVOS (na mesma rede):
echo    Frontend: http://%IP%:3000
echo    Backend:  http://%IP%:5000
echo.
echo 🔧 Para verificar conexão:
echo    Backend API: http://%IP%:5000
echo.
echo ⚠️  IMPORTANTE:
echo    1. Certifique-se que o Firewall permite as portas 3000 e 5000
echo    2. Todos dispositivos devem estar na MESMA rede Wi-Fi
echo.
echo ============================================
pause