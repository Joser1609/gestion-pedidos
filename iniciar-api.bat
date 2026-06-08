@echo off
title API Gestion de Pedidos
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
echo.
echo API en http://localhost:3000
echo Cerrar esta ventana para detener el servidor
echo.
npm start
pause
